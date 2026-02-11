export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class CodeRefactorFrontEnd {
  items: Array<Item>;

  private static readonly itemValidator: ProxyHandler<Item> = {
    set(target, prop, newValue) {
      if (newValue === target[prop]) return true;

      if (prop === "quality") {
        target.quality = MathUtils.clamp(newValue, 0, 50);
      } else {
        target[prop] = newValue;
      }

      return true;
    }
  }

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      const itemProxy = new Proxy(item, CodeRefactorFrontEnd.itemValidator);

      itemProxy.quality += CodeRefactorFrontEnd.getQualityDelta(item);
      itemProxy.sellIn += CodeRefactorFrontEnd.getSellInDelta(item);
    }

    return this.items;
  }

  private static getQualityDelta(item: Item) {
    if (item.name in qualityDeltaMap) {
      return qualityDeltaMap[item.name](item);
    } else {
      return qualityDeltaMap[Product.NORMAL_ITEMS](item);
    }
  }

  private static getSellInDelta(item: Item) {
    if (item.name in sellInDeltaMap) {
      return sellInDeltaMap[item.name](item);
    } else {
      return sellInDeltaMap[Product.NORMAL_ITEMS](item);
    }
  }
}

export const Product = {
  NORMAL_ITEMS: "Normal Items",
  VINTAGE_FRAMEWORK: "Vintage Framework",
  ETERNAL_CODE_LICENSE: "Eternal Code License",
  CONFERENCE_PASS_2025: "Conference Pass for DevDays 2025",
  DEPRECATED_LIBRARY: "Deprecated Library",
} as const;

export type ProductType = typeof Product[keyof typeof Product];

type DeltaMap = {
  [Product.NORMAL_ITEMS]: (item: Item) => number;
} & {
  [K in ProductType]?: (item: Item) => number;
};

const qualityDeltaMap: DeltaMap = {
  [Product.NORMAL_ITEMS]: (item) => {
    return item.sellIn >= 0 ? -1 : -2;
  },
  [Product.VINTAGE_FRAMEWORK]: (item) => {
    return item.sellIn >= 0 ? 1 : 2;
  },
};

const sellInDeltaMap: DeltaMap = {
  [Product.NORMAL_ITEMS]: (item) => -1,
};

class MathUtils {
  static clamp(value: number, min: number, max: number) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }
}
