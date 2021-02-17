import calculateTax from './calculateTax'

const MAX_SALARY_BPJS_KES = 12000000
const MAX_SALARY_BPJS_JP = 8939722

const COMPANY_RATE_BPJS_KES = 0.04
const COMPANY_RATE_BPJS_JKK = 0.0024
const COMPANY_RATE_BPJS_JK = 0.003
const COMPANY_RATE_BPJS_JHT = 0.037
const COMPANY_RATE_BPJS_JP = 0.02

const EMPLOYEE_RATE_BPJS_KES = 0.01
const EMPLOYEE_RATE_BPJS_JHT = 0.02
const EMPLOYEE_RATE_BPJS_JP = 0.01

/**
 * To calculate Indonesian payrollf format.
 * @param {Number} basicSalary should be a number
 * @param {Object} options should be an objects
 */
const calculatePayroll = async (basicSalary = 0, options = {}) => {
  if (isNaN(Number(basicSalary)) || basicSalary < 0) throw new Error('basicSalary should be a positif Number')
  if (typeof options !== 'object' || options === null || Array.isArray(options)) throw new Error('options should be an Object')

  const { THR = 0, additionalAllowance = {} } = options

  if (isNaN(Number(THR)) || THR < 0) throw new Error('options.THR should be a positif Number')
  // if (isNaN(Number(temporayPPh21)) || temporayPPh21 < 0) throw new Error('options.temporayPPh21 should be a positif Number')
  if (typeof additionalAllowance !== 'object' || additionalAllowance === null || Array.isArray(additionalAllowance)) throw new Error('options.additionalAllowance should be an Object')

  const def = { isBorneByCompany: false, isFixed: false, fixed: 0, percentage: 0 }
  const PPh21 = additionalAllowance.PPh21 || { ...def, taxableMonths: 12, ptkpType: 'TK0' }
  const BPJSKes1 = additionalAllowance.BPJSKes1 || def
  const BPJSKetJHT2 = additionalAllowance.BPJSKetJHT2 || def
  const BPJSKetJP1 = additionalAllowance.BPJSKetJP1 || def

  /* INCOME */

  // Taxable

  const bpjsKes4 = COMPANY_RATE_BPJS_KES * (basicSalary > MAX_SALARY_BPJS_KES ? MAX_SALARY_BPJS_KES : basicSalary)
  const bpjsKetJKK = COMPANY_RATE_BPJS_JKK * basicSalary
  const bpjsKetJK = COMPANY_RATE_BPJS_JK * basicSalary
  const thr = THR

  let bpjsKes1 = 0
  const bpjsKes1Premi = EMPLOYEE_RATE_BPJS_KES * (basicSalary > MAX_SALARY_BPJS_KES ? MAX_SALARY_BPJS_KES : basicSalary)
  if (BPJSKes1.isBorneByCompany === true) {
    if (isNaN(Number(BPJSKes1.percentage)) || (BPJSKes1.percentage < 0 || BPJSKes1.percentage > 100)) throw new Error('options.BPJSKes1.percentage should be a positif Number (mininum is 0 and maximum is 100)')
    if (isNaN(Number(BPJSKes1.fixed)) || (BPJSKes1.fixed < 0 || BPJSKes1.fixed > bpjsKes1Premi)) throw new Error('options.BPJSKes1.fixed should be a positif Number (mininum is 0 and maximum is worth bpjsKes1Premi)')

    bpjsKes1 = BPJSKes1.isFixed
      ? BPJSKes1.fixed
      : (BPJSKes1.percentage / 100) * bpjsKes1Premi
  }

  let bpjsKetJHT2 = 0
  const bpjsKetJHT2Premi = EMPLOYEE_RATE_BPJS_JHT * basicSalary
  if (BPJSKetJHT2.isBorneByCompany === true) {
    if (isNaN(Number(BPJSKetJHT2.percentage)) || (BPJSKetJHT2.percentage < 0 || BPJSKetJHT2.percentage > 100)) throw new Error('options.BPJSKetJHT2.percentage should be a positif Number (mininum is 0 and maximum is 100)')
    if (isNaN(Number(BPJSKetJHT2.fixed)) || (BPJSKetJHT2.fixed < 0 || BPJSKetJHT2.fixed > bpjsKetJHT2Premi)) throw new Error('options.BPJSKetJHT2.fixed should be a positif Number (mininum is 0 and maximum is worth bpjsKetJHT2Premi)')

    bpjsKetJHT2 = BPJSKetJHT2.isFixed
      ? BPJSKetJHT2.fixed
      : (BPJSKetJHT2.percentage / 100) * bpjsKetJHT2Premi
  }

  let bpjsKetJP1 = 0
  const bpjsKetJP1Premi = EMPLOYEE_RATE_BPJS_JP * (basicSalary > MAX_SALARY_BPJS_JP ? MAX_SALARY_BPJS_JP : basicSalary)
  if (BPJSKetJP1.isBorneByCompany === true) {
    if (isNaN(Number(BPJSKetJP1.percentage)) || (BPJSKetJP1.percentage < 0 || BPJSKetJP1.percentage > 100)) throw new Error('options.BPJSKetJP1.percentage should be a positif Number (mininum is 0 and maximum is 100)')
    if (isNaN(Number(BPJSKetJP1.fixed)) || (BPJSKetJP1.fixed < 0 || BPJSKetJP1.fixed > bpjsKetJP1Premi)) throw new Error('options.BPJSKetJP1.fixed should be a positif Number (mininum is 0 and maximum is worth bpjsKetJP1Premi)')

    bpjsKetJP1 = BPJSKetJP1.isFixed
      ? BPJSKetJP1.fixed
      : (BPJSKetJP1.percentage / 100) * bpjsKetJP1Premi
  }

  // Non-Taxable

  const bpjsKetJHT37 = COMPANY_RATE_BPJS_JHT * basicSalary
  const bpjsKetJP2 = COMPANY_RATE_BPJS_JP * (basicSalary > MAX_SALARY_BPJS_JP ? MAX_SALARY_BPJS_JP : basicSalary)

  /* DEDUCTIONS */

  const bpjsKetJHT2ByEmployee = bpjsKetJHT2Premi - bpjsKetJHT2
  const bpjsKetJP1ByEmployee = bpjsKetJP1Premi - bpjsKetJP1

  /* SUMMARY */
  const mandatoryAllowances = bpjsKes4 + bpjsKetJKK + bpjsKetJK + thr
  const additionalAllowancesBeforeTax = bpjsKes1 + bpjsKetJHT2 + bpjsKetJP1
  const taxableIncomeBeforeTax = basicSalary + mandatoryAllowances + additionalAllowancesBeforeTax
  const taxEffectDeductions = bpjsKetJHT2Premi + bpjsKetJP1Premi

  /* TAX */

  let pph21 = 0
  let finalPPh21 = 0
  if (PPh21.isBorneByCompany === true) {
    if (isNaN(Number(PPh21.percentage)) || (PPh21.percentage < 0 || PPh21.percentage > 100)) throw new Error('options.PPh21.percentage should be a positif Number (mininum is 0 and maximum is 100)')
    if (isNaN(Number(PPh21.fixed)) || (PPh21.fixed < 0 || PPh21.fixed > basicSalary)) throw new Error('options.PPh21.fixed should be a positif Number (mininum is 0 and maximum is worth basicSalary)')

    if (PPh21.isFixed) {
      const [tax, taxAllowance] = await calculateTax(
        taxableIncomeBeforeTax,
        taxEffectDeductions,
        {
          isFixedTaxAllowance: true,
          taxAllowance: PPh21.fixed,
          // taxAllowancePercentage: PPh21.percentage,
          taxableMonths: PPh21.taxableMonths,
          ptkpType: PPh21.ptkpType
        }
      )

      finalPPh21 = tax
      pph21 = taxAllowance
    } else {
      const [tax, taxAllowance] = await calculateTax(
        taxableIncomeBeforeTax,
        taxEffectDeductions,
        {
          isFixedTaxAllowance: false,
          // taxAllowance: PPh21.fixed,
          taxAllowancePercentage: PPh21.percentage,
          taxableMonths: PPh21.taxableMonths,
          ptkpType: PPh21.ptkpType
        }
      )

      finalPPh21 = tax
      pph21 = taxAllowance
    }

    // pph21 = PPh21.percentage
    //   ? (PPh21.percentage / 100) * temporayPPh21
    //   : PPh21.fixed
  }

  /* SUMMARY */

  const additionalAllowances = additionalAllowancesBeforeTax + pph21
  const taxableAllowances = mandatoryAllowances + additionalAllowances
  const taxableIncome = basicSalary + taxableAllowances
  const nonTaxableIncome = bpjsKetJHT37 + bpjsKetJP2
  const totalIncomes = taxableIncome + nonTaxableIncome

  const bpjsKes1ByEmployee = bpjsKes1Premi - bpjsKes1
  const pph21ByEmployee = finalPPh21 - pph21

  /* SET DATA */

  const incomes = {
    total: totalIncomes,
    taxable: {
      total: taxableIncome,
      basicSalary,
      allowance: {
        total: taxableAllowances,
        mandatory: {
          total: mandatoryAllowances,
          BPJSKesehatan: bpjsKes4,
          BPJSKetenagakerjaanJKK: bpjsKetJKK,
          BPJSKetenagakerjaanJK: bpjsKetJK,
          THR: thr
        },
        additional: {
          total: additionalAllowances,
          PPh21: pph21,
          BPJSKesehatan: bpjsKes1,
          BPJSKetenagakerjaanJHT: bpjsKetJHT2,
          BPJSKetenagakerjaanJP: bpjsKetJP1
        }
      }
    },
    nonTaxable: {
      total: nonTaxableIncome,
      BPJSKetenagakerjaanJHT: bpjsKetJHT37,
      BPJSKetenagakerjaanJP: bpjsKetJP2
    }
  }

  const deductions = {
    total: ((bpjsKetJHT2 + bpjsKetJP1) + (bpjsKetJHT2ByEmployee + bpjsKetJP1ByEmployee)) + (((bpjsKes4 + bpjsKetJKK + bpjsKetJK + bpjsKetJHT37 + bpjsKetJP2 + thr) + (pph21 + bpjsKes1 + bpjsKetJHT2 + bpjsKetJP1)) + (bpjsKes1ByEmployee + pph21ByEmployee)),
    affectingTaxes: {
      total: (bpjsKetJHT2 + bpjsKetJP1) + (bpjsKetJHT2ByEmployee + bpjsKetJP1ByEmployee),
      borneByCompany: {
        total: bpjsKetJHT2 + bpjsKetJP1,
        BPJSKetenagakerjaanJHT: bpjsKetJHT2,
        BPJSKetenagakerjaanJP: bpjsKetJP1
      },
      borneByEmployee: {
        total: bpjsKetJHT2ByEmployee + bpjsKetJP1ByEmployee,
        BPJSKetenagakerjaanJHT: bpjsKetJHT2ByEmployee,
        BPJSKetenagakerjaanJP: bpjsKetJP1ByEmployee
      }
    },
    nonAffectingTaxes: {
      total: ((bpjsKes4 + bpjsKetJKK + bpjsKetJK + bpjsKetJHT37 + bpjsKetJP2 + thr) + (pph21 + bpjsKes1 + bpjsKetJHT2 + bpjsKetJP1)) + (bpjsKes1ByEmployee + pph21ByEmployee),
      borneByCompany: {
        total: (bpjsKes4 + bpjsKetJKK + bpjsKetJK + bpjsKetJHT37 + bpjsKetJP2 + thr) + (pph21 + bpjsKes1 + bpjsKetJHT2 + bpjsKetJP1),
        allowance: {
          total: (bpjsKes4 + bpjsKetJKK + bpjsKetJK + bpjsKetJHT37 + bpjsKetJP2 + thr) + (pph21 + bpjsKes1 + bpjsKetJHT2 + bpjsKetJP1),
          mandatory: {
            total: bpjsKes4 + bpjsKetJKK + bpjsKetJK + bpjsKetJHT37 + bpjsKetJP2 + thr,
            BPJSKesehatan: bpjsKes4,
            BPJSKetenagakerjaanJKK: bpjsKetJKK,
            BPJSKetenagakerjaanJK: bpjsKetJK,
            BPJSKetenagakerjaanJHT: bpjsKetJHT37,
            BPJSKetenagakerjaanJP: bpjsKetJP2,
            THR: thr
          },
          additional: {
            total: pph21 + bpjsKes1 + bpjsKetJHT2 + bpjsKetJP1,
            PPh21: pph21,
            BPJSKesehatan: bpjsKes1,
            BPJSKetenagakerjaanJHT: bpjsKetJHT2,
            BPJSKetenagakerjaanJP: bpjsKetJP1
          }
        }
      },
      borneByEmployee: {
        total: bpjsKes1ByEmployee + pph21ByEmployee,
        BPJSKesehatan: bpjsKes1ByEmployee,
        PPH21: pph21ByEmployee
      }
    }
  }

  /* RETURN */

  return {
    incomes: incomes,
    deductions: deductions,
    takeHomePay: incomes.total - deductions.total
  }
}

export default calculatePayroll
