# Universal Tax Calculator

A comprehensive tax calculator supporting multiple countries' tax systems. Built with TypeScript and designed for accuracy and ease of use.

## Features

- Support for 20+ countries' tax systems
- Accurate tax bracket calculations
- Social security tax calculations
- Currency formatting by locale
- Standard deduction support
- Comprehensive error handling

## Installation

```bash
npm install universal-tax-calculator
```

## Usage

```typescript
import TaxCalculator from 'universal-tax-calculator';

// Create a calculator instance for a specific country
const calculator = new TaxCalculator('US');

// Calculate taxes for a given income
const result = calculator.calculateTax(100000);

console.log(result);
// Output:
// {
//   grossIncome: 100000,
//   taxableIncome: 86150,
//   totalTax: 15213.50,
//   effectiveRate: 0.1766,
//   marginalRate: 0.24,
//   socialSecurityTax: 6200,
//   netIncome: 78586.50,
//   breakdown: [...]
// }

// Format currency
const formatted = calculator.formatCurrency(result.netIncome);
console.log(formatted); // "$78,586.50"
```

## Supported Countries

- North America: US, Canada, Mexico
- Europe: UK, Germany, France, Italy, Spain
- Asia: Japan, China, India, Singapore
- Oceania: Australia, New Zealand
- South America: Brazil, Argentina
- Africa: South Africa, Nigeria
- Middle East: UAE, Saudi Arabia, Israel

## API Reference

### `TaxCalculator`

#### Constructor
```typescript
constructor(country: string)
```

#### Methods

##### `calculateTax`
```typescript
calculateTax(grossIncome: number, options?: {
  additionalDeductions?: number;
  includeSocialSecurity?: boolean;
}): TaxResult
```

##### `formatCurrency`
```typescript
formatCurrency(amount: number): string
```

##### `getDeductions`
```typescript
getDeductions(): { [key: string]: number }
```

##### `getTaxBrackets`
```typescript
getTaxBrackets(): TaxBracket[]
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Lint
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.