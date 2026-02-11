import { Product, Item, CodeRefactorFrontEnd } from '@/code-refactor-frontend';

describe('CodeRefactorFrontEnd', () => {

  // ============================================
  // ÖRNEK TEST - Bu testi düzeltmeniz gerekiyor
  // ============================================
  it('should decrease quality by 1 for normal items', () => {
    const codeRefactor = new CodeRefactorFrontEnd([new Item(Product.NORMAL_ITEMS, 10, 20)]);
    const items = codeRefactor.updateQuality();
    expect(items[0].quality).toBe(19); // Bu değeri düzeltin
  });

  // ============================================
  // NORMAL ÜRÜN TESTLERİ
  // ============================================
  describe(Product.NORMAL_ITEMS, () => {
    it('should decrease sellIn by 1 each day', () => {
      const codeRefactor = new CodeRefactorFrontEnd([new Item(Product.NORMAL_ITEMS, 10, 20)]);
      const items = codeRefactor.updateQuality();
      expect(items[0].sellIn).toBe(9);
    });
    it('should decrease quality by 1 each day', () => {
      const codeRefactor = new CodeRefactorFrontEnd([new Item(Product.NORMAL_ITEMS, 10, 20)]);
      const items = codeRefactor.updateQuality();
      expect(items[0].quality).toBe(19);
    });
    it('should decrease quality twice as fast after sellIn date passes', () => {
      const codeRefactor = new CodeRefactorFrontEnd([new Item(Product.NORMAL_ITEMS, -1, 20)]);
      const items = codeRefactor.updateQuality();
      expect(items[0].quality).toBe(18);
    });
    it('should never have negative quality', () => {
      const codeRefactor = new CodeRefactorFrontEnd([new Item(Product.NORMAL_ITEMS, 10, 0)]);
      const items = codeRefactor.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  // ============================================
  // VINTAGE FRAMEWORK TESTLERİ
  // ============================================
  describe(Product.VINTAGE_FRAMEWORK, () => {
    it('should increase quality as it gets older', () => {
      const codeRefactor = new CodeRefactorFrontEnd([new Item(Product.VINTAGE_FRAMEWORK, 10, 20)]);
      const items = codeRefactor.updateQuality();
      expect(items[0].quality).toBe(21);
    });
    it('should never have quality more than 50', () => {
      const codeRefactor = new CodeRefactorFrontEnd([new Item(Product.VINTAGE_FRAMEWORK, 10, 50)]);
      const items = codeRefactor.updateQuality();
      expect(items[0].quality).toBe(50);
    });
    it('should increase quality twice as fast after sellIn date', () => {
      const codeRefactor = new CodeRefactorFrontEnd([new Item(Product.VINTAGE_FRAMEWORK, -1, 20)]);
      const items = codeRefactor.updateQuality();
      expect(items[0].quality).toBe(22);
    });
  });

  // ============================================
  // ETERNAL CODE LICENSE TESTLERİ
  // ============================================
  describe(Product.ETERNAL_CODE_LICENSE, () => {
    it.todo('should never decrease in quality');
    it.todo('should never change sellIn value');
    it.todo('should always have quality of 80');
  });

  // ============================================
  // CONFERENCE PASS TESTLERİ
  // ============================================
  describe(Product.CONFERENCE_PASS_2025, () => {
    it.todo('should increase quality by 1 when more than 10 days left');
    it.todo('should increase quality by 2 when 10 days or less left');
    it.todo('should increase quality by 3 when 5 days or less left');
    it.todo('should drop quality to 0 after the conference');
    it.todo('should never have quality more than 50');
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
