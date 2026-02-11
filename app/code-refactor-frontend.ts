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

const Product = {
  NORMAL_ITEMS: "Normal Items",
} as const;

type ProductType = typeof Product[keyof typeof Product];
type DeltaMap = { [K in ProductType]: (item: Item) => number; };

const qualityDeltaMap: DeltaMap = {
  [Product.NORMAL_ITEMS]: (item) => {
    return item.sellIn >= 0 ? -1 : -2;
  },
};

const sellInDeltaMap: DeltaMap = {
  [Product.NORMAL_ITEMS]: (item) => -1,
};

export class CodeRefactorFrontEnd {
  items: Array<Item>;

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

  private static itemValidator: ProxyHandler<Item> = {
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

class MathUtils {
  static clamp(value: number, min: number, max: number) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }
}
