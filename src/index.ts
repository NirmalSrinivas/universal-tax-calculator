// universal-tax-calculator/index.ts
import taxRules from './taxRules';
import { CountryTaxRules, TaxBracket, TaxResult } from './types';

class TaxCalculator {
  private readonly countryRules: CountryTaxRules;

  constructor(country: string) {
    const rules = taxRules[country.toUpperCase()];
    if (!rules) {
      throw new Error(`Tax rules not found for country: ${country}`);
    }
    this.countryRules = rules;
  }

  calculateTax(
    grossIncome: number,
    options: {
      additionalDeductions?: number;
      includeSocialSecurity?: boolean;
    } = {},
  ): TaxResult {
    const { additionalDeductions = 0, includeSocialSecurity = true } = options;

    // Calculate taxable income
    const standardDeduction = this.countryRules.deductions?.standard ?? 0;
    const taxableIncome = Math.max(
      0,
      grossIncome - standardDeduction - additionalDeductions,
    );

    // Calculate tax by brackets
    let totalTax = 0;
    const breakdown: Array<{ bracket: TaxBracket; taxAmount: number }> = [];
    let lastBracketRate = 0;

    for (const bracket of this.countryRules.brackets) {
      if (taxableIncome > bracket.min) {
        const bracketMax = bracket.max ?? Infinity;
        const incomeInBracket = Math.min(
          taxableIncome - bracket.min,
          bracketMax - bracket.min,
        );
        const taxInBracket = incomeInBracket * bracket.rate;

        totalTax += taxInBracket;
        lastBracketRate = bracket.rate;

        breakdown.push({
          bracket,
          taxAmount: taxInBracket,
        });
      }
    }

    // Calculate social security if applicable
    let socialSecurityTax = 0;
    if (includeSocialSecurity && this.countryRules.socialSecurity) {
      const { employeeRate, maxIncome } = this.countryRules.socialSecurity;
      const socialSecurityIncome = maxIncome
        ? Math.min(grossIncome, maxIncome)
        : grossIncome;
      socialSecurityTax = socialSecurityIncome * employeeRate;
    }

    // Calculate effective tax rate
    const effectiveRate = totalTax / (taxableIncome || 1);
    const netIncome = grossIncome - totalTax - socialSecurityTax;

    return {
      grossIncome,
      taxableIncome,
      totalTax,
      effectiveRate,
      marginalRate: lastBracketRate,
      socialSecurityTax,
      netIncome,
      breakdown,
    };
  }

  // Get available deductions for the country
  getDeductions(): Partial<Record<string, number>> {
    return this.countryRules.deductions || {};
  }

  // Get tax brackets for the country
  getTaxBrackets(): TaxBracket[] {
    return this.countryRules.brackets;
  }

  // Get currency for the country
  getCurrency(): string {
    return this.countryRules.currency;
  }

  // Format currency amount according to country
  formatCurrency(amount: number): string {
    const formatted = new Intl.NumberFormat(this.getLocale(), {
      style: 'currency',
      currency: this.countryRules.currency,
    }).format(amount);
    return formatted.trim(); // Add this line to remove any trailing spaces
  }

  // Get locale for the country
  private getLocale(): string {
    const localeMap: Record<string, string> = {
      USD: 'en-US',
      GBP: 'en-GB',
      EUR: 'de-DE',
      CAD: 'en-CA',
      MXN: 'es-MX',
      JPY: 'ja-JP',
      CNY: 'zh-CN',
      INR: 'en-IN',
      SGD: 'en-SG',
      AUD: 'en-AU',
      NZD: 'en-NZ',
      BRL: 'pt-BR',
      ARS: 'es-AR',
      ZAR: 'en-ZA',
      NGN: 'en-NG',
      AED: 'ar-AE',
      SAR: 'ar-SA',
      ILS: 'he-IL',
    };
    return localeMap[this.countryRules.currency] || 'en-US';
  }
}

export default TaxCalculator;
