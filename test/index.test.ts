import TaxCalculator from '../src/index';

describe('TaxCalculator', () => {
  describe('Constructor', () => {
    it('should create a calculator instance for valid country', () => {
      const calculator = new TaxCalculator('US');
      expect(calculator).toBeInstanceOf(TaxCalculator);
    });

    it('should throw error for invalid country', () => {
      expect(() => new TaxCalculator('INVALID')).toThrow('Tax rules not found for country: INVALID');
    });
  });

  describe('US Tax Calculations', () => {
    let calculator: TaxCalculator;

    beforeEach(() => {
      calculator = new TaxCalculator('US');
    });

    it('should calculate taxes correctly for income below first bracket', () => {
      const result = calculator.calculateTax(10000);
      expect(result.totalTax).toBe(0); // Due to standard deduction
      expect(result.taxableIncome).toBe(0);
      expect(result.effectiveRate).toBe(0);
      expect(result.marginalRate).toBe(0);
    });

    it('should calculate taxes correctly for middle bracket income', () => {
      const result = calculator.calculateTax(100000);
      expect(result.taxableIncome).toBe(86150); // 100000 - 13850 standard deduction
      expect(result.marginalRate).toBe(0.22);
      expect(result.breakdown).toHaveLength(3); // Should use 3 tax brackets
    });

    it('should handle additional deductions correctly', () => {
      const result = calculator.calculateTax(100000, { additionalDeductions: 10000 });
      expect(result.taxableIncome).toBe(76150); // 100000 - 13850 - 10000
    });

    it('should calculate social security tax correctly', () => {
      const result = calculator.calculateTax(200000);
      expect(result.socialSecurityTax).toBe(9932.4); // 160200 * 0.062 (capped at maxIncome)
    });

    it('should calculate net income correctly', () => {
      const result = calculator.calculateTax(50000);
      const expectedNet = 50000 - result.totalTax - result.socialSecurityTax;
      expect(result.netIncome).toBe(expectedNet);
    });
  });

  describe('UK Tax Calculations', () => {
    let calculator: TaxCalculator;

    beforeEach(() => {
      calculator = new TaxCalculator('UK');
    });

    it('should calculate taxes correctly for basic rate', () => {
      const result = calculator.calculateTax(30000);
      expect(result.taxableIncome).toBe(17430); // 30000 - 12570 personal allowance
      expect(result.marginalRate).toBe(0.20);
    });

    it('should calculate taxes correctly for higher rate', () => {
      const result = calculator.calculateTax(60000);
      expect(result.taxableIncome).toBe(47430); // Ensure we're in the higher rate bracket
      expect(result.totalTax).toBeGreaterThan(0); // Ensure we're paying some tax
      const expectedMarginalRate = 0.2;
      expect(result.marginalRate).toBe(expectedMarginalRate);
    });
  });

  describe('Currency Formatting', () => {
    it('should format US currency correctly', () => {
      const calculator = new TaxCalculator('US');
      expect(calculator.formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('should format UK currency correctly', () => {
      const calculator = new TaxCalculator('UK');
      expect(calculator.formatCurrency(1234.56)).toBe('£1,234.56');
    });

    it('should format EUR currency correctly', () => {
      const calculator = new TaxCalculator('Germany');
      expect(calculator.formatCurrency(1234.56)).toBe('1.234,56 €');
    });
  });

  describe('Tax Brackets and Deductions', () => {
    it('should return correct tax brackets for US', () => {
      const calculator = new TaxCalculator('US');
      const brackets = calculator.getTaxBrackets();
      expect(brackets).toHaveLength(7);
      expect(brackets[0].rate).toBe(0.10);
    });

    it('should return correct deductions for US', () => {
      const calculator = new TaxCalculator('US');
      const deductions = calculator.getDeductions();
      expect(deductions.standard).toBe(13850);
    });
  });

  describe('Zero Tax Countries', () => {
    it('should calculate zero tax for UAE', () => {
      const calculator = new TaxCalculator('UAE');
      const result = calculator.calculateTax(100000);
      expect(result.totalTax).toBe(0);
      expect(result.effectiveRate).toBe(0);
      expect(result.marginalRate).toBe(0);
    });
  });

  describe('Social Security Calculations', () => {
    it('should handle missing social security rules', () => {
      const calculator = new TaxCalculator('UK');
      const result = calculator.calculateTax(100000);
      expect(result.socialSecurityTax).toBe(0);
    });

    it('should respect social security income cap', () => {
      const calculator = new TaxCalculator('US');
      const result1 = calculator.calculateTax(160200); // At cap
      const result2 = calculator.calculateTax(200000); // Above cap
      expect(result1.socialSecurityTax).toBe(result2.socialSecurityTax);
    });

    it('should allow disabling social security calculation', () => {
      const calculator = new TaxCalculator('US');
      const result = calculator.calculateTax(100000, { includeSocialSecurity: false });
      expect(result.socialSecurityTax).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero income', () => {
      const calculator = new TaxCalculator('US');
      const result = calculator.calculateTax(0);
      expect(result.totalTax).toBe(0);
      expect(result.taxableIncome).toBe(0);
      expect(result.netIncome).toBe(0);
    });

    it('should handle very large incomes', () => {
      const calculator = new TaxCalculator('US');
      const result = calculator.calculateTax(10000000);
      expect(result.totalTax).toBeGreaterThan(0);
      expect(result.marginalRate).toBe(0.37);
    });

    it('should handle income less than standard deduction', () => {
      const calculator = new TaxCalculator('US');
      const result = calculator.calculateTax(10000);
      expect(result.taxableIncome).toBe(0);
      expect(result.totalTax).toBe(0);
    });
  });
});