// import { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

import { toThousand } from '../../utils'

// import Incomes from './Incomes'
// import Deductions from './Deductions'

const CompanyOutlay = () => {
  const divider = { width: '100%', height: '1px', background: 'rgba(0, 0, 0, .12)', margin: '12px 0' }
  const cardBody = { padding: '20px 10px' }
  const row = { padding: '0' }
  const col = { padding: '0 10px' }
  const h5 = { fontWeight: 'bold', margin: '0' }
  const h5Right = { fontWeight: 'bold', margin: '0', textAlign: 'right' }
  const left = { textAlign: 'left', margin: '0', height: '24px' }
  const leftBold = { textAlign: 'left', margin: '0', height: '24px', fontWeight: 'bold' }
  const right = { textAlign: 'right', margin: '0', height: '24px' }
  const rightBold = { textAlign: 'right', margin: '0', height: '24px', fontWeight: 'bold' }

  return (
    <div className='CompanyOutlay'>
      <Card>
        <Card.Header as='h5' style={{ fontWeight: 'bold' }}>Company Outlay</Card.Header>
        <Card.Body style={cardBody}>
          <Row style={row}>
            <Col md={8} style={col}>
              <h5 style={h5}>Items</h5>
              <div style={divider}>{}</div>
              <p style={left}>Basic Salary</p>
              <p style={left}>PPh21 (Income Tax)</p>
              <p style={left}>BPJS Kesehatan</p>
              <p style={left}>BPJS Ketenagakerjaan</p>
              <p style={left}>THR (13th Bonus) installment</p>
              <div style={divider}>{}</div>
              <p style={leftBold}>Total Company Outlay</p>
            </Col>
            <Col md={2} style={col}>
              <h5 style={h5Right}>IDR</h5>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(20000000)}</p>
              <p style={right}>{toThousand(2232695)}</p>
              <p style={right}>{toThousand(600000)}</p>
              <p style={right}>{toThousand(1026794)}</p>
              <p style={right}>{toThousand(20000000 / 12)}</p>
              <div style={divider}>{}</div>
              <p style={rightBold}>{toThousand(20000000 + 2232695 + 600000 + 1026794 + (20000000 / 12))}</p>
            </Col>
            <Col md={2} style={col}>
              <h5 style={h5Right}>SGD</h5>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(2000)}</p>
              <p style={right}>{toThousand(2233)}</p>
              <p style={right}>{toThousand(60)}</p>
              <p style={right}>{toThousand(1027)}</p>
              <p style={right}>{toThousand((20000000 / 12) / 1000)}</p>
              <div style={divider}>{}</div>
              <p style={rightBold}>{toThousand((20000000 + 2232695 + 600000 + 1026794 + (20000000 / 12)) / 1000)}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CompanyOutlay
