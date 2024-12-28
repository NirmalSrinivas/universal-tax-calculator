// Tax bracket interface
interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

// Country tax rules interface
interface CountryTaxRules {
  currency: string;
  brackets: TaxBracket[];
  deductions?: {
    standard?: number;
    [key: string]: number | undefined;
  };
  socialSecurity?: {
    employeeRate: number;
    employerRate: number;
    maxIncome?: number;
  };
}

// Tax calculation result interface
interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  socialSecurityTax: number;
  netIncome: number;
  breakdown: Array<{
    bracket: TaxBracket;
    taxAmount: number;
  }>;
}

export { TaxBracket, CountryTaxRules, TaxResult };
