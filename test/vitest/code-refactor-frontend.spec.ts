import { type ProductType, Product, Item, CodeRefactorFrontEnd } from '@/code-refactor-frontend';

describe('CodeRefactorFrontEnd', () => {
  function createCrfAndUpdate(
    productType: ProductType,
    sellInStart: number,
    qualityStart: number
  ) {
    const codeRefactor = new CodeRefactorFrontEnd(
      [new Item(productType, sellInStart, qualityStart)]
    );
    return codeRefactor.updateQuality();
  }

  // ============================================
  // ÖRNEK TEST - Bu testi düzeltmeniz gerekiyor
  // ============================================
  it('should decrease quality by 1 for normal items', () => {
    const items = createCrfAndUpdate(Product.NORMAL_ITEMS, 10, 20);
    expect(items[0].quality).toBe(19); // Bu değeri düzeltin
  });

  // ============================================
  // NORMAL ÜRÜN TESTLERİ
  // ============================================
  describe(Product.NORMAL_ITEMS, () => {
    it('should decrease sellIn by 1 each day', () => {
      const items = createCrfAndUpdate(Product.NORMAL_ITEMS, 10, 20);
      expect(items[0].sellIn).toBe(9);
    });
    it('should decrease quality by 1 each day', () => {
      const items = createCrfAndUpdate(Product.NORMAL_ITEMS, 10, 20);
      expect(items[0].quality).toBe(19);
    });
    it('should decrease quality twice as fast after sellIn date passes', () => {
      const items = createCrfAndUpdate(Product.NORMAL_ITEMS, -1, 20);
      expect(items[0].quality).toBe(18);
    });
    it('should never have negative quality', () => {
      const items = createCrfAndUpdate(Product.NORMAL_ITEMS, 10, 0);
      expect(items[0].quality).toBe(0);
    });
  });

  // ============================================
  // VINTAGE FRAMEWORK TESTLERİ
  // ============================================
  describe(Product.VINTAGE_FRAMEWORK, () => {
    it('should increase quality as it gets older', () => {
      const items = createCrfAndUpdate(Product.VINTAGE_FRAMEWORK, 10, 20);
      expect(items[0].quality).toBe(21);
    });
    it('should never have quality more than 50', () => {
      const items = createCrfAndUpdate(Product.VINTAGE_FRAMEWORK, 10, 50);
      expect(items[0].quality).toBe(50);
    });
    it('should increase quality twice as fast after sellIn date', () => {
      const items = createCrfAndUpdate(Product.VINTAGE_FRAMEWORK, -1, 20);
      expect(items[0].quality).toBe(22);
    });
  });

  // ============================================
  // ETERNAL CODE LICENSE TESTLERİ
  // ============================================
  describe(Product.ETERNAL_CODE_LICENSE, () => {
    it('should never decrease in quality', () => {
      const items = createCrfAndUpdate(Product.ETERNAL_CODE_LICENSE, 10, 80);
      expect(items[0].quality).toBe(80);
    });
    it('should never change sellIn value', () => {
      const items = createCrfAndUpdate(Product.ETERNAL_CODE_LICENSE, 10, 80);
      expect(items[0].sellIn).toBe(10);
    });
    it('should always have quality of 80', () => {
      const items = createCrfAndUpdate(Product.ETERNAL_CODE_LICENSE, 10, 20);
      expect(items[0].quality).toBe(80);
    });
  });

  // ============================================
  // CONFERENCE PASS TESTLERİ
  // ============================================
  describe(Product.CONFERENCE_PASS_2025, () => {
    it('should increase quality by 1 when more than 10 days left', () => {
      const items = createCrfAndUpdate(Product.CONFERENCE_PASS_2025, 11, 20);
      expect(items[0].quality).toBe(21);
    });
    it('should increase quality by 2 when 10 days or less left', () => {
      const items = createCrfAndUpdate(Product.CONFERENCE_PASS_2025, 10, 20);
      expect(items[0].quality).toBe(22);
    });
    it('should increase quality by 3 when 5 days or less left', () => {
      const items = createCrfAndUpdate(Product.CONFERENCE_PASS_2025, 5, 20);
      expect(items[0].quality).toBe(23);
    });
    it('should drop quality to 0 after the conference', () => {
      const items = createCrfAndUpdate(Product.CONFERENCE_PASS_2025, -1, 20);
      expect(items[0].quality).toBe(0);
    });
    it('should never have quality more than 50', () => {
      const items = createCrfAndUpdate(Product.CONFERENCE_PASS_2025, 5, 50);
      expect(items[0].quality).toBe(50);
    });
  });

  // ============================================
  // DEPRECATED LIBRARY TESTLERİ (YENİ ÖZELLİK)
  // ============================================
  describe(Product.DEPRECATED_LIBRARY, () => {
    it.todo('should decrease quality twice as fast as normal items');
    it.todo('should decrease quality 4x as fast after sellIn date');
    it.todo('should never have negative quality');
  });

});
