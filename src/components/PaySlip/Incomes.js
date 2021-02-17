import { Row, Col } from 'react-bootstrap'

import { toThousand } from '../../utils'

const Incomes = ({ incomes = {} }) => {
  const taxable = incomes.taxable || {}
  const allowances = taxable.allowance || {}
  const mandatoryAllowances = allowances.mandatory || {}
  const additionalAllowances = allowances.additional || {}
  const nonTaxable = incomes.nonTaxable || {}

  const divider = { width: '100%', height: '1px', background: 'rgba(0, 0, 0, .12)', margin: '12px 0' }
  // const bold = { fontWeight: 'bold', marginBottom: '8px' }
  const tab1 = { paddingLeft: '24px' }
  const tab2 = { paddingLeft: '48px', color: 'rgba(0, 0, 0, .32)' }

  return (
    <div className='Incomes'>
      <Row className='bold'>
        <Col md={9} style={{ padding: '0' }}><h5 style={{ fontWeight: 'bold', margin: '0' }}>Earnings</h5></Col>
        <Col md={3} style={{ padding: '0', textAlign: 'right' }}><h5 style={{ fontWeight: 'bold', margin: '0' }}>{toThousand(incomes.total || 0)}</h5></Col>
      </Row>
      <div style={divider}>{}</div>
      <Row className='bold'>
        <Col md={9}>Taxable Incomes</Col>
        <Col md={3}>{toThousand(taxable.total || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9}>Basic Salary</Col>
        <Col md={3}>{toThousand(taxable.basicSalary || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9}>Mandatory Allowances</Col>
        <Col md={3}>{toThousand(mandatoryAllowances.total || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Kesehatan 4%</Col>
        <Col md={3}>{toThousand(mandatoryAllowances.BPJSKesehatan || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Ketenagakerjaan JKK 0.24%</Col>
        <Col md={3}>{toThousand(mandatoryAllowances.BPJSKetenagakerjaanJKK || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Ketenagakerjaan JK 0.3%</Col>
        <Col md={3}>{toThousand(mandatoryAllowances.BPJSKetenagakerjaanJK || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>THR (installment)</Col>
        <Col md={3}>{toThousand(mandatoryAllowances.THR || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9}>Additional Allowances</Col>
        <Col md={3}>{toThousand(additionalAllowances.total || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>PPh 21</Col>
        <Col md={3}>{toThousand(additionalAllowances.PPh21 || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Kesehatan 1%</Col>
        <Col md={3}>{toThousand(additionalAllowances.BPJSKesehatan || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Ketenagakerjaan JHT 2%</Col>
        <Col md={3}>{toThousand(additionalAllowances.BPJSKetenagakerjaanJHT || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Ketenagakerjaan JP 1%</Col>
        <Col md={3}>{toThousand(additionalAllowances.BPJSKetenagakerjaanJP || 0)}</Col>
      </Row>
      <div style={{ width: '100%', height: '24px' }}>{}</div>
      <Row className='bold'>
        <Col md={9}>Non-Taxable Incomes</Col>
        <Col md={3}>{toThousand(nonTaxable.total || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9} style={{ color: 'rgba(0, 0, 0, .32)' }}>BPJS Ketenagakerjaan JHT 3.7% (mandatory)</Col>
        <Col md={3} style={{ color: 'rgba(0, 0, 0, .32)' }}>{toThousand(nonTaxable.BPJSKetenagakerjaanJHT || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9} style={{ color: 'rgba(0, 0, 0, .32)' }}>BPJS Ketenagakerjaan JP 2% (mandatory)</Col>
        <Col md={3} style={{ color: 'rgba(0, 0, 0, .32)' }}>{toThousand(nonTaxable.BPJSKetenagakerjaanJP || 0)}</Col>
      </Row>
      <div style={{ width: '100%', height: '24px' }}>{}</div>
    </div>
  )
}

export default Incomes
