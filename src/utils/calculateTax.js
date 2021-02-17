const POSITION_FEE = 500000

const TAX_LEVEL_1_MAX = 50000000
const TAX_LEVEL_1_RATE = 0.05

const TAX_LEVEL_2_MAX = 250000000
const TAX_LEVEL_2_RATE = 0.15

const TAX_LEVEL_3_MAX = 500000000
const TAX_LEVEL_3_RATE = 0.25

const TAX_LEVEL_4_RATE = 0.3

const PTKPs = {
  TK0: 54000000,
  TK1: 58500000,
  TK2: 63000000,
  TK3: 67500000,
  K0: 58500000,
  K1: 63000000,
  K2: 67500000,
  K3: 72000000,
  KI0: 112500000,
  KI1: 117000000,
  KI2: 121500000,
  KI3: 121500000
}

const calculateTaxCallback = (
  taxableEBITDA = 0,
  taxEffectDeductions = 0,
  {
    isFixedTaxAllowance,
    taxAllowance,
    taxAllowancePercentage,
    taxableMonths,
    ptkpType
  },
  callback = () => {}
) => {
  if (typeof callback !== 'function') throw new Error('callback should be a function')

  const ptkp = PTKPs[ptkpType]

  const taxableIncome = taxableEBITDA + taxAllowance
  const grossTaxableIncome = taxableIncome - taxEffectDeductions - POSITION_FEE

  const annualizedGrossTaxableIncome = grossTaxableIncome * taxableMonths

  const annualizedNettTaxableIncome = annualizedGrossTaxableIncome - ptkp

  let annualizedIncomeTax = 0
  if (annualizedNettTaxableIncome <= TAX_LEVEL_1_MAX) {
    annualizedIncomeTax = TAX_LEVEL_1_RATE * annualizedNettTaxableIncome
  } else if (annualizedNettTaxableIncome <= TAX_LEVEL_2_MAX) {
    annualizedIncomeTax = (TAX_LEVEL_2_RATE * (annualizedNettTaxableIncome - TAX_LEVEL_1_MAX)) + (TAX_LEVEL_1_RATE * TAX_LEVEL_1_MAX)
  } else if (annualizedNettTaxableIncome <= TAX_LEVEL_3_MAX) {
    annualizedIncomeTax = (TAX_LEVEL_3_RATE * (annualizedNettTaxableIncome - TAX_LEVEL_2_MAX)) + (TAX_LEVEL_1_RATE * TAX_LEVEL_1_MAX) + (TAX_LEVEL_2_RATE * (TAX_LEVEL_2_MAX - TAX_LEVEL_1_MAX))
  } else {
    annualizedIncomeTax = (TAX_LEVEL_4_RATE * (annualizedNettTaxableIncome - TAX_LEVEL_3_MAX)) + (TAX_LEVEL_1_RATE * TAX_LEVEL_1_MAX) + (TAX_LEVEL_2_RATE * (TAX_LEVEL_2_MAX - TAX_LEVEL_1_MAX)) + (TAX_LEVEL_3_RATE * (TAX_LEVEL_3_MAX - TAX_LEVEL_2_MAX))
  }

  const thisMonthTax = Number('' + Math.floor(annualizedIncomeTax / taxableMonths))

  if (!isFixedTaxAllowance) {
    if (taxAllowance < ((taxAllowancePercentage / 100) * thisMonthTax)) {
      calculateTaxCallback(
        taxableEBITDA,
        taxEffectDeductions,
        {
          isFixedTaxAllowance,
          taxAllowance: (taxAllowancePercentage / 100) * thisMonthTax,
          taxAllowancePercentage,
          taxableMonths,
          ptkpType
        },
        callback
      )
    } else {
      callback(thisMonthTax, taxAllowance)
    }
  } else {
    callback(thisMonthTax, taxAllowance)
  }
}

const calculateTax = (taxableEBITDA = 0, taxEffectDeductions = 0, options = {}) => {
  return new Promise((resolve, reject) => {
    try {
      if (isNaN(Number(taxableEBITDA)) || taxableEBITDA < 0) throw new Error('taxableEBITDA should be a positif Number')
      if (isNaN(Number(taxEffectDeductions)) || taxEffectDeductions < 0 || taxEffectDeductions > taxableEBITDA) throw new Error('taxEffectDeductions should be a positif Number (minimum is 0 and maximum is worth taxableEBITDA)')
      if (typeof options !== 'object' || options === null || Array.isArray(options)) throw new Error('options should be an Object')

      const { isFixedTaxAllowance = false, taxAllowance = 0, taxAllowancePercentage = 0, taxableMonths = 12, ptkpType = 'TK0' } = options

      if (typeof isFixedTaxAllowance !== 'boolean') throw new Error('options.isFixedTaxAllowance should be a Boolean')
      if (isNaN(Number(taxAllowance)) || taxAllowance < 0 || taxAllowance > taxableEBITDA) throw new Error('options.taxAllowance should be a positif Number (minimum is 0 and maximum is worth taxableEBITDA)')
      if (isNaN(Number(taxAllowancePercentage)) || taxAllowancePercentage < 0 || taxAllowancePercentage > 100) throw new Error('options.taxAllowancePercentage should be a positif Number (minimum is 0 and maximum is 100)')
      if (isNaN(Number(taxableMonths)) || taxableMonths < 0 || taxableMonths > 12) throw new Error('options.taxableMonths should be a positif Number (minimum is 0 and maximum is 12)')
      if (typeof ptkpType !== 'string' || PTKPs[ptkpType] === undefined) throw new Error('options.ptkp should be a String and the value shoul be one of ["TKO", "TK1", "TK2", "TK3", "KO", "K1", "K2", "K3", "KIO", "KI1", "KI2", "KI3"]')

      calculateTaxCallback(
        taxableEBITDA,
        taxEffectDeductions,
        {
          isFixedTaxAllowance,
          taxAllowance,
          taxAllowancePercentage,
          taxableMonths,
          ptkpType
        },
        (tax = 0, taxAllowance = 0) => {
          resolve([tax, taxAllowance])
        }
      )
    } catch (e) {
      reject(e)
    }
  })
}

export default calculateTax
