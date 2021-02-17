import { Row, Col } from 'react-bootstrap'

import { toThousand } from '../../utils'

const Deductions = ({ deductions = {} }) => {
  const affectingTaxes = deductions.affectingTaxes || {}
  const affectingTaxesBorneByCompany = affectingTaxes.borneByCompany || {}
  const affectingTaxesBorneByEmployee = affectingTaxes.borneByEmployee || {}

  const nonAffectingTaxes = deductions.nonAffectingTaxes || {}
  const nonAffectingTaxesBorneByCompany = nonAffectingTaxes.borneByCompany || {}
  const nonAffectingTaxesBorneByCompanyAllowances = nonAffectingTaxesBorneByCompany.allowance || {}
  const nonAffectingTaxesBorneByCompanyAllowancesMandatory = nonAffectingTaxesBorneByCompanyAllowances.mandatory || {}
  const nonAffectingTaxesBorneByCompanyAllowancesAdditional = nonAffectingTaxesBorneByCompanyAllowances.additional || {}
  const nonAffectingTaxesBorneByEmployee = nonAffectingTaxes.borneByEmployee || {}

  const divider = { width: '100%', height: '1px', background: 'rgba(0, 0, 0, .12)', margin: '12px 0' }
  // const bold = { fontWeight: 'bold', marginBottom: '8px' }
  const tab1 = { paddingLeft: '24px' }
  const tab2 = { paddingLeft: '48px', color: 'rgba(0, 0, 0, .32)' }

  return (
    <div className='Deductions'>
      <Row className='bold'>
        <Col md={9} style={{ padding: '0' }}><h5 style={{ fontWeight: 'bold', margin: '0' }}>Deductions</h5></Col>
        <Col md={3} style={{ padding: '0', textAlign: 'right' }}><h5 style={{ fontWeight: 'bold', margin: '0' }}>{toThousand(deductions.total || 0)}</h5></Col>
      </Row>
      <div style={divider}>{}</div>
      <Row className='bold'>
        <Col md={9}>Deductions Affecting Taxes</Col>
        <Col md={3}>{toThousand(affectingTaxes.total || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9} style={{ color: 'rgba(0, 0, 0, .32)' }}>BPJS Ketenagakerjaan JHT 2% (by {affectingTaxesBorneByCompany.BPJSKetenagakerjaanJHT ? 'Company' : affectingTaxesBorneByEmployee.BPJSKetenagakerjaanJHT ? 'Employee' : ''})</Col>
        <Col md={3} style={{ color: 'rgba(0, 0, 0, .32)' }}>{toThousand(affectingTaxesBorneByCompany.BPJSKetenagakerjaanJHT || affectingTaxesBorneByEmployee.BPJSKetenagakerjaanJHT || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9} style={{ color: 'rgba(0, 0, 0, .32)' }}>BPJS Ketenagakerjaan JP 1% (by {affectingTaxesBorneByCompany.BPJSKetenagakerjaanJHT ? 'Company' : affectingTaxesBorneByEmployee.BPJSKetenagakerjaanJHT ? 'Employee' : ''})</Col>
        <Col md={3} style={{ color: 'rgba(0, 0, 0, .32)' }}>{toThousand(affectingTaxesBorneByCompany.BPJSKetenagakerjaanJP || affectingTaxesBorneByEmployee.BPJSKetenagakerjaanJP || 0)}</Col>
      </Row>
      <div style={{ width: '100%', height: '24px' }}>{}</div>
      <Row className='bold'>
        <Col md={9}>Deductions Don't Affecting Taxes</Col>
        <Col md={3}>{toThousand(nonAffectingTaxes.total || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9}>Borne by Company</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByCompany.total || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Kesehatan 4%</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByCompanyAllowancesMandatory.BPJSKesehatan || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Ketenagakerjaan JKK 0.24%</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByCompanyAllowancesMandatory.BPJSKetenagakerjaanJKK || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Ketenagakerjaan JK 0.3%</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByCompanyAllowancesMandatory.BPJSKetenagakerjaanJK || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>THR (saved)</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByCompanyAllowancesMandatory.THR || 0)}</Col>
      </Row>
      <Row style={tab1}>
        <Col md={9}>Borne By Employee</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByEmployee.total || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>BPJS Kesehatan 1%</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByCompanyAllowancesAdditional.BPJSKesehatan || nonAffectingTaxesBorneByEmployee.BPJSKesehatan || 0)}</Col>
      </Row>
      <div style={{ width: '100%', height: '24px' }}>{}</div>
      <Row style={tab1}>
        <Col md={9}>Income Tax</Col>
        <Col md={3}>{toThousand((Number(nonAffectingTaxesBorneByCompanyAllowancesAdditional.PPh21) || 0) + (Number(nonAffectingTaxesBorneByEmployee.PPh21) || 0))}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>PPh21 borne by Company</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByCompanyAllowancesAdditional.PPh21 || 0)}</Col>
      </Row>
      <Row style={tab2}>
        <Col md={9}>PPh 21 borne by Employee</Col>
        <Col md={3}>{toThousand(nonAffectingTaxesBorneByEmployee.PPh21 || 0)}</Col>
      </Row>
      <Row>{}</Row>
    </div>
  )
}

export default Deductions
