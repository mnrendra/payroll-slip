import { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

import { calculatePayroll, toThousand } from '../../utils'

import Incomes from './Incomes'
import Deductions from './Deductions'

const PaySlip = () => {
  const [payroll, setPayroll] = useState({})

  useEffect(() => {
    calculatePayroll(
      18000000,
      {
        THR: 1500000,
        additionalAllowance: {
          PPh21: { isBorneByCompany: true, isFixed: false, fixed: 0, percentage: 100, taxableMonths: 10, ptkpType: 'TK0' },
          BPJSKes1: { isBorneByCompany: true, isFixed: false, fixed: 0, percentage: 100 },
          BPJSKetJHT2: { isBorneByCompany: false, isFixed: false, fixed: 0, percentage: 100 },
          BPJSKetJP1: { isBorneByCompany: false, isFixed: false, fixed: 0, percentage: 100 }
        }
      }
    )
      .then(payroll => setPayroll(payroll))
      .catch(e => console.log('error', e))
  }, [])

  console.log('payroll', payroll)

  const divider = { width: '100%', height: '1px', background: 'rgba(0, 0, 0, .12)', margin: '12px 0' }
  // const alignRight = { textAlign: 'right' }

  return (
    <div className='PaySlip'>
      <Card>
        <Card.Header as='h5' style={{ fontWeight: 'bold' }}>PaySlip</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Incomes incomes={payroll.incomes} />
            </Col>
            <Col>
              <Deductions deductions={payroll.deductions} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={divider}>{}</div>
              <Row className='bold'>
                <Col md={9} style={{ padding: '0' }}><h5 style={{ fontWeight: 'bold' }}>Take Home Pay</h5></Col>
                <Col md={3} style={{ padding: '0', textAlign: 'right' }}><h5 style={{ fontWeight: 'bold' }}>{toThousand(payroll.takeHomePay)}</h5></Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default PaySlip
