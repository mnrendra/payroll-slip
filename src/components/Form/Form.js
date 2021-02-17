import { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

// import { toThousand } from '../../utils'

import { Input, DatePicker, DropDown } from '../commons'
import AdditionalAllowances from './AdditionalAllowances'

const ALLOWANCES = [
  {
    id: 0,
    name: 'PPh21',
    value: '100% of PPh21',
    description: 'Offered by Glints',
    status: 'enabled',
    permanent: true
  },
  {
    id: 1,
    name: 'BPJS Kesehatan 1%',
    value: '1% x Basic Salary',
    description: 'Offered by Glints',
    status: 'enabled',
    permanent: true
  },
  {
    id: 2,
    name: 'BPJS Ketenagakerjaan JHT 2%',
    value: '2% x Basic Salary',
    description: '',
    status: 'disabled',
    permanent: true
  },
  {
    id: 3,
    name: 'BPJS Ketenagakerjaan JP 1%',
    value: '1% x Basic Salary',
    description: '',
    status: 'disabled',
    permanent: true
  }
]

const Form = () => {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [placement, setPlacement] = useState('')
  const [company, setCompany] = useState('')

  const cardBody = { padding: '20px 10px' }
  const row = { padding: '0' }
  const col = { padding: '0 10px' }
  const divider = { width: '100%', height: '1px', background: 'rgba(0, 0, 0, .12)', margin: '20px 0 20px' }
  const space = { width: '100%', height: '15px' }

  return (
    <div className='Form'>
      <Card>
        <Card.Header as='h5' style={{ fontWeight: 'bold' }}>Form</Card.Header>
        <Card.Body style={cardBody}>
          {/* */}
          <Row style={row}>
            <Col style={col}>
              <Input
                label='Name'
                placeHolder='Full Name'
                value={name}
                onChange={value => setName(value)}
              />
            </Col>
            <Col style={col}>
              <Input
                label='Position'
                placeHolder='Job Position'
                value={position}
                onChange={value => setPosition(value)}
              />
            </Col>
            <Col style={col}>
              <Input
                label='Placement'
                placeHolder='Job Placement'
                value={placement}
                onChange={value => setPlacement(value)}
              />
            </Col>
            <Col style={col}>
              <Input
                label='Company'
                placeHolder='Company Name'
                value={company}
                onChange={value => setCompany(value)}
              />
            </Col>
          </Row>
          {/* */}
          <div style={space}>{}</div>
          {/* */}
          <Row style={row}>
            <Col style={col}>
              <DatePicker
                label='Official First Day'
                value='2021-1-3'
                onChange={date => console.log('date', date)}
                range={{ from: '2015-1-1', to: '2022-11-31' }}
              />
            </Col>
            <Col style={col}>
              <DatePicker
                label='Official Last Day'
                value='2022-1-2'
                onChange={date => console.log('date', date)}
                range={{ from: '2021-1-15', to: '2022-11-31' }}
              />
            </Col>
            <Col style={col}>
              <DatePicker
                label='Payroll Period'
                value='null-null-null'
                onChange={date => console.log('date', date)}
                range={{ from: '2020-1-1', to: '2022-11-31' }}
                format='y-m'
              />
            </Col>
            <Col style={col}>
              <DropDown
                label='THR Date'
                items={['Eid al-Fitr (Muslims)', 'Christmas (Christians)', 'Vesak (Buddhists)', 'Nyepi (Hinduism)', 'Chinese New Year (Chinese)']}
                value='THR'
                onChange={v => console.log('THR', v)}
              />
            </Col>
          </Row>
          {/* */}
          <Row style={row}>
            <Col style={col}>
              <DropDown
                label='PTKP Type'
                items={['TK0', 'TK1', 'TK2', 'TK3', 'K0', 'K1', 'K2', 'K3', 'KI0', 'KI1', 'KI2', 'KI3']}
                value='PTKP Type'
                onChange={v => console.log('PTKP', v)}
              />
            </Col>
            <Col style={col}>
              <DropDown
                label='JKK Type'
                items={['Very Low Risk 0.24%', 'Low Risk 0.54%', 'Mid Risk 0.89%', 'High Risk 1.27%', 'Very High 1.74%']}
                value='JKK Type'
                onChange={v => console.log('PTKP', v)}
              />
            </Col>
            <Col style={col}>
              {}
            </Col>
            <Col style={col}>
              {}
            </Col>
          </Row>
          {/* */}
          <Row><Col style={{ padding: '0 10px' }}><div style={divider}>{}</div></Col></Row>
          {/* */}

          {/* */}
          <Row>
            <Col style={col}>
              <AdditionalAllowances
                listAllowances={ALLOWANCES}
                onUpdate={list => console.log('onUpdate', list)}
              />
            </Col>
          </Row>
          {/* */}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Form
