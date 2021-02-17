// import { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

import { toThousand } from '../../utils'

// import Incomes from './Incomes'
// import Deductions from './Deductions'

const TaxDetails = () => {
  const divider = { width: '100%', height: '1px', background: 'rgba(0, 0, 0, .12)', margin: '12px 0' }
  const dividerHidden = { width: '100%', height: '1px', background: 'rgba(0, 0, 0, 0)', margin: '12px 0' }
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
    <div className='TaxDetails'>
      <Card>
        <Card.Header as='h5' style={{ fontWeight: 'bold' }}>Tax Details</Card.Header>
        <Card.Body style={cardBody}>
          <Row style={row}>
            <Col md={6} style={col}>
              <h5 style={h5}>Items</h5>
              <div style={divider}>{}</div>
              <p style={left}>Taxable Earnings</p>
              <p style={left}>Deductions Affecting Taxes</p>
              <p style={left}>Position Fee (Tax Discount)</p>
              <div style={divider}>{}</div>
              <p style={left}>Nett Taxable Earnings</p>
              <p style={left}>PTKP (TK0)</p>
              <div style={divider}>{}</div>
              <p style={left}>Nett Taxable Earnings after PTKP</p>
              <p style={left}>1st Rate Progressive Tax 5% (max 50,000,000)</p>
              <div style={dividerHidden}>{}</div>
              <p style={left}>2nd Rate Progressive Tax 15% (max 250,000,000)</p>
              <p style={left}>3rd Rate Progressive Tax 25% (max 500,000,000)</p>
              <p style={left}>4th Rate Progressive Tax 30% (above 500,000,000)</p>
              <div style={divider}>{}</div>
              <p style={left}>Total Taxes (Annualized)</p>
              <p style={leftBold}>Total Taxes (This Month)</p>
            </Col>
            <Col md={2} style={col}>
              <h5 style={h5Right}>This Month</h5>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(24607361)}</p>
              <p style={right}>{toThousand(489397)}</p>
              <p style={right}>{toThousand(500000)}</p>
              <div style={divider}>{}</div>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
              <div style={divider}>{}</div>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
              <div style={dividerHidden}>{}</div>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
              <div style={divider}>{}</div>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
            </Col>
            <Col md={2} style={col}>
              <h5 style={h5Right}>Annualized</h5>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(24607361 * 10)}</p>
              <p style={right}>{toThousand(489397 * 10)}</p>
              <p style={right}>{toThousand(500000 * 10)}</p>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand((24607361 * 10) - (489397 * 10) - (500000 * 10))}</p>
              <p style={right}>{toThousand(54000000)}</p>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand(((24607361 * 10) - (489397 * 10) - (500000 * 10)) - 54000000)}</p>
              <p style={right}>{toThousand(50000000)}</p>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand((((24607361 * 10) - (489397 * 10) - (500000 * 10)) - 54000000 - 50000000))}</p>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
              <div style={divider}>{}</div>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
            </Col>
            <Col md={2} style={col}>
              <h5 style={h5Right}>Taxes</h5>
              <div style={divider}>{}</div>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
              <div style={dividerHidden}>{}</div>
              <p style={right}>{}</p>
              <p style={right}>{}</p>
              <div style={dividerHidden}>{}</div>
              <p style={right}>{}</p>
              <p style={right}>{toThousand(50000000 * 0.05)}</p>
              <div style={dividerHidden}>{}</div>
              <p style={right}>{toThousand((((24607361 * 10) - (489397 * 10) - (500000 * 10)) - 54000000 - 50000000) * 0.15)}</p>
              <p style={right}>{toThousand(0)}</p>
              <p style={right}>{toThousand(0)}</p>
              <div style={divider}>{}</div>
              <p style={right}>{toThousand((50000000 * 0.05) + ((((24607361 * 10) - (489397 * 10) - (500000 * 10)) - 54000000 - 50000000) * 0.15))}</p>
              <p style={rightBold}>{toThousand(((50000000 * 0.05) + ((((24607361 * 10) - (489397 * 10) - (500000 * 10)) - 54000000 - 50000000) * 0.15)) / 10)}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default TaxDetails
