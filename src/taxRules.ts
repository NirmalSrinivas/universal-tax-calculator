import { CountryTaxRules } from './types';

// Country-specific tax rules
const taxRules: { [key: string]: CountryTaxRules } = {
  // North America
  US: {
    currency: 'USD',
    brackets: [
      { min: 0, max: 11000, rate: 0.1 },
      { min: 11001, max: 44725, rate: 0.12 },
      { min: 44726, max: 95375, rate: 0.22 },
      { min: 95376, max: 182100, rate: 0.24 },
      { min: 182101, max: 231250, rate: 0.32 },
      { min: 231251, max: 578125, rate: 0.35 },
      { min: 578126, max: null, rate: 0.37 },
    ],
    deductions: {
      standard: 13850,
    },
    socialSecurity: {
      employeeRate: 0.062,
      employerRate: 0.062,
      maxIncome: 160200,
    },
  },
  UK: {
    currency: 'GBP',
    brackets: [
      { min: 0, max: 12570, rate: 0 },
      { min: 12571, max: 50270, rate: 0.2 },
      { min: 50271, max: 125140, rate: 0.4 },
      { min: 125141, max: null, rate: 0.45 },
    ],
    deductions: {
      standard: 12570,
    },
  },
  GERMANY: {
    currency: 'EUR',
    brackets: [
      { min: 0, max: 10908, rate: 0 },
      { min: 10909, max: 62809, rate: 0.14 },
      { min: 62810, max: 277825, rate: 0.42 },
      { min: 277826, max: null, rate: 0.45 },
    ],
    socialSecurity: {
      employeeRate: 0.195,
      employerRate: 0.195,
      maxIncome: 87600,
    },
  },
  CANADA: {
    currency: 'CAD',
    brackets: [
      { min: 0, max: 53359, rate: 0.15 },
      { min: 53360, max: 106717, rate: 0.205 },
      { min: 106718, max: 165430, rate: 0.26 },
      { min: 165431, max: 235675, rate: 0.29 },
      { min: 235676, max: null, rate: 0.33 },
    ],
    deductions: {
      standard: 15000,
    },
  },
  MEXICO: {
    currency: 'MXN',
    brackets: [
      { min: 0, max: 7735, rate: 0.0192 },
      { min: 7736, max: 65651, rate: 0.064 },
      { min: 65652, max: 115375, rate: 0.1088 },
      { min: 115376, max: 134119, rate: 0.16 },
      { min: 134120, max: 160577, rate: 0.1792 },
      { min: 160578, max: 323862, rate: 0.2136 },
      { min: 323863, max: null, rate: 0.35 },
    ],
  },

  // Europe
  FRANCE: {
    currency: 'EUR',
    brackets: [
      { min: 0, max: 10777, rate: 0 },
      { min: 10778, max: 27478, rate: 0.11 },
      { min: 27479, max: 78570, rate: 0.3 },
      { min: 78571, max: 168994, rate: 0.41 },
      { min: 168995, max: null, rate: 0.45 },
    ],
    socialSecurity: {
      employeeRate: 0.22,
      employerRate: 0.45,
    },
  },
  ITALY: {
    currency: 'EUR',
    brackets: [
      { min: 0, max: 15000, rate: 0.23 },
      { min: 15001, max: 28000, rate: 0.25 },
      { min: 28001, max: 50000, rate: 0.35 },
      { min: 50001, max: null, rate: 0.43 },
    ],
    socialSecurity: {
      employeeRate: 0.1,
      employerRate: 0.3,
    },
  },
  SPAIN: {
    currency: 'EUR',
    brackets: [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12451, max: 20200, rate: 0.24 },
      { min: 20201, max: 35200, rate: 0.3 },
      { min: 35201, max: 60000, rate: 0.37 },
      { min: 60001, max: null, rate: 0.45 },
    ],
  },

  // Asia
  JAPAN: {
    currency: 'JPY',
    brackets: [
      { min: 0, max: 1950000, rate: 0.05 },
      { min: 1950001, max: 3300000, rate: 0.1 },
      { min: 3300001, max: 6950000, rate: 0.2 },
      { min: 6950001, max: 9000000, rate: 0.23 },
      { min: 9000001, max: 18000000, rate: 0.33 },
      { min: 18000001, max: 40000000, rate: 0.4 },
      { min: 40000001, max: null, rate: 0.45 },
    ],
    socialSecurity: {
      employeeRate: 0.143,
      employerRate: 0.143,
    },
  },
  CHINA: {
    currency: 'CNY',
    brackets: [
      { min: 0, max: 36000, rate: 0.03 },
      { min: 36001, max: 144000, rate: 0.1 },
      { min: 144001, max: 300000, rate: 0.2 },
      { min: 300001, max: 420000, rate: 0.25 },
      { min: 420001, max: 660000, rate: 0.3 },
      { min: 660001, max: 960000, rate: 0.35 },
      { min: 960001, max: null, rate: 0.45 },
    ],
    socialSecurity: {
      employeeRate: 0.11,
      employerRate: 0.29,
    },
  },
  INDIA: {
    currency: 'INR',
    brackets: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300001, max: 600000, rate: 0.05 },
      { min: 600001, max: 900000, rate: 0.1 },
      { min: 900001, max: 1200000, rate: 0.15 },
      { min: 1200001, max: 1500000, rate: 0.2 },
      { min: 1500001, max: null, rate: 0.3 },
    ],
    deductions: {
      standard: 50000, // Standard deduction
    },
    socialSecurity: {
      employeeRate: 0.12, // PF contribution
      employerRate: 0.12,
    },
  },
  SINGAPORE: {
    currency: 'SGD',
    brackets: [
      { min: 0, max: 20000, rate: 0 },
      { min: 20001, max: 30000, rate: 0.02 },
      { min: 30001, max: 40000, rate: 0.035 },
      { min: 40001, max: 80000, rate: 0.07 },
      { min: 80001, max: 120000, rate: 0.115 },
      { min: 120001, max: 160000, rate: 0.15 },
      { min: 160001, max: 200000, rate: 0.18 },
      { min: 200001, max: 240000, rate: 0.19 },
      { min: 240001, max: 280000, rate: 0.195 },
      { min: 280001, max: 320000, rate: 0.2 },
      { min: 320001, max: null, rate: 0.22 },
    ],
  },

  // Oceania
  AUSTRALIA: {
    currency: 'AUD',
    brackets: [
      { min: 0, max: 18200, rate: 0 },
      { min: 18201, max: 45000, rate: 0.19 },
      { min: 45001, max: 120000, rate: 0.325 },
      { min: 120001, max: 180000, rate: 0.37 },
      { min: 180001, max: null, rate: 0.45 },
    ],
  },
  NEWZEALAND: {
    currency: 'NZD',
    brackets: [
      { min: 0, max: 14000, rate: 0.105 },
      { min: 14001, max: 48000, rate: 0.175 },
      { min: 48001, max: 70000, rate: 0.3 },
      { min: 70001, max: 180000, rate: 0.33 },
      { min: 180001, max: null, rate: 0.39 },
    ],
  },

  // South America
  BRAZIL: {
    currency: 'BRL',
    brackets: [
      { min: 0, max: 22847.76, rate: 0 },
      { min: 22847.77, max: 33919.8, rate: 0.075 },
      { min: 33919.81, max: 45012.6, rate: 0.15 },
      { min: 45012.61, max: 55976.16, rate: 0.225 },
      { min: 55976.17, max: null, rate: 0.275 },
    ],
  },
  ARGENTINA: {
    currency: 'ARS',
    brackets: [
      { min: 0, max: 64532, rate: 0.05 },
      { min: 64533, max: 129064, rate: 0.09 },
      { min: 129065, max: 193596, rate: 0.12 },
      { min: 193597, max: 258128, rate: 0.15 },
      { min: 258129, max: 322660, rate: 0.19 },
      { min: 322661, max: 387192, rate: 0.23 },
      { min: 387193, max: 451724, rate: 0.27 },
      { min: 451725, max: 516256, rate: 0.31 },
      { min: 516257, max: null, rate: 0.35 },
    ],
  },

  // Africa
  SOUTHAFRICA: {
    currency: 'ZAR',
    brackets: [
      { min: 0, max: 237100, rate: 0.18 },
      { min: 237101, max: 370500, rate: 0.26 },
      { min: 370501, max: 512800, rate: 0.31 },
      { min: 512801, max: 673000, rate: 0.36 },
      { min: 673001, max: 857900, rate: 0.39 },
      { min: 857901, max: 1817000, rate: 0.41 },
      { min: 1817001, max: null, rate: 0.45 },
    ],
  },
  NIGERIA: {
    currency: 'NGN',
    brackets: [
      { min: 0, max: 300000, rate: 0.07 },
      { min: 300001, max: 600000, rate: 0.11 },
      { min: 600001, max: 1100000, rate: 0.15 },
      { min: 1100001, max: 1600000, rate: 0.19 },
      { min: 1600001, max: 3200000, rate: 0.21 },
      { min: 3200001, max: null, rate: 0.24 },
    ],
  },

  // Middle East
  UAE: {
    currency: 'AED',
    brackets: [{ min: 0, max: null, rate: 0 }],
  },
  SAUDIARABIA: {
    currency: 'SAR',
    brackets: [{ min: 0, max: null, rate: 0 }],
  },
  ISRAEL: {
    currency: 'ILS',
    brackets: [
      { min: 0, max: 77400, rate: 0.1 },
      { min: 77401, max: 110880, rate: 0.14 },
      { min: 110881, max: 178080, rate: 0.2 },
      { min: 178081, max: 247440, rate: 0.31 },
      { min: 247441, max: 514920, rate: 0.35 },
      { min: 514921, max: 663240, rate: 0.47 },
      { min: 663241, max: null, rate: 0.5 },
    ],
  },
};

export default taxRules;
