// import { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

import { toThousand } from '../../utils'

// import Incomes from './Incomes'
// import Deductions from './Deductions'

const BPJSDetails = () => {
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
    <div className='BPJSDetails'>
      <Card>
        <Card.Header as='h5' style={{ fontWeight: 'bold' }}>BPJS Details</Card.Header>
        <Card.Body style={cardBody}>
          <Row style={row}>
            <Col md={6} style={col}>
              <h5 style={h5}>Items</h5>
              <div style={divider}>{}</div>
              <p style={left}>BPJS Kesehatan 5%</p>
              <p style={left}>BPJS Ketenagakerjaan 9.24%</p>
              <div style={divider}>{}</div>
              <p style={left}>BPJS Ketenagakerjaan - JKK 0.24%</p>
              <p style={left}>BPJS Ketenagakerjaan - JK 0.3%</p>
              <p style={left}>BPJS Ketenagakerjaan - JHT 5.7%</p>
              <p style={left}>BPJS Ketenagakerjaan - JP 3%</p>
              <div style={divider}>{}</div>
              <p style={leftBold}>Total BPJS</p>
            </Col>
            <Col md={2} style={col}>
              <h5 style={h5Right}>By Company</h5>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(600000)}</p>
              <p style={right}>{toThousand(1026794)}</p>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(48000)}</p>
              <p style={right}>{toThousand(60000)}</p>
              <p style={right}>{toThousand(740000)}</p>
              <p style={right}>{toThousand(178794)}</p>
              <div style={divider}>{}</div>
              <p style={rightBold}>{toThousand(600000 + 1026794)}</p>
            </Col>
            <Col md={2} style={col}>
              <h5 style={h5Right}>By Employee</h5>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(0)}</p>
              <p style={right}>{toThousand(489397)}</p>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(0)}</p>
              <p style={right}>{toThousand(0)}</p>
              <p style={right}>{toThousand(400000)}</p>
              <p style={right}>{toThousand(89397)}</p>
              <div style={divider}>{}</div>
              <p style={rightBold}>{toThousand(0 + 489397)}</p>
            </Col>
            <Col md={2} style={col}>
              <h5 style={h5Right}>Total</h5>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(600000)}</p>
              <p style={right}>{toThousand(1026794 + 489397)}</p>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(48000 + 0)}</p>
              <p style={right}>{toThousand(60000 + 0)}</p>
              <p style={right}>{toThousand(740000 + 400000)}</p>
              <p style={right}>{toThousand(178794 + 89397)}</p>
              <div style={divider}>{}</div>
              <p style={rightBold}>{toThousand(600000 + (1026794 + 489397))}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BPJSDetails
