import { useState } from 'react'

import { Table, Button, Row, Col, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'

import { DropDown, Input } from '../commons'

const ROWS = [
  {
    name: 'PPh21',
    valueType: 'Fixed',
    valueTypes: ['Fixed', 'Percentage'],
    valueTypesDisabled: false,
    value: '100% of PPh21',
    formula: 'x PPh21',
    note: 'Offered by Glints',
    action: 'Enable',
    disabled: false
  },
  {
    name: 'BPJS Kesehatan 1%',
    valueType: 'Percentage',
    valueTypes: ['Fixed', 'Percentage'],
    valueTypesDisabled: true,
    value: '1% x Basic Salary',
    formula: '1% x Basic Salary',
    note: 'Offered by Glints',
    action: 'Enable',
    disabled: false
  },
  {
    name: 'BPJS Ketenagakerjaan JHT 2%',
    valueType: 'Percentage',
    valueTypes: ['Fixed', 'Percentage'],
    valueTypesDisabled: true,
    value: '2% x Basic Salary',
    formula: 'x 2% x Basic Salary',
    note: '',
    action: 'Disable',
    disabled: true
  },
  {
    name: 'BPJS Ketenagakerjaan JP 1%',
    valueType: 'Percentage',
    valueTypes: ['Fixed', 'Percentage'],
    valueTypesDisabled: true,
    value: '1% x Basic Salary',
    formula: 'x 1% x Basic Salary',
    note: '',
    action: 'Disable',
    disabled: true
  }
]

const AdditionalAllowances = () => {
  const [rows, setRows] = useState(ROWS)

  const alignRight = { textAlign: 'right' }
  const alignCenter = { textAlign: 'center' }

  const renderTBody = (rows = [], onChange = () => {}) => {
    const onValueTypesChange = (index = null) => {
      console.log('inde', index)
      const newRows = rows.map((row, i) => {
        return i === index
          ? {
              ...row,
              valueType: row.valueType === 'Fixed' ? 'Percentage' : 'Fixed'
            }
          : row
      })
      onChange(newRows)
    }

    const onActionClicked = (index = -1) => {
      const newRows = rows.map((row, i) => {
        return i === index
          ? {
              ...row,
              action: row.action === 'Enable' ? 'Disable' : 'Enable'
            }
          : row
      })
      onChange(newRows)
    }

    return (
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.value}</td>
              <td>{row.noted}</td>
              <td>enabled</td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  const colHeader = { padding: '0', paddingBottom: '10px', fontWeight: 'bold' }
  const col = { padding: '9px 0' }
  const colAction = { padding: '0', cursor: 'pointer' }
  const colDisabled = { padding: '0', color: '#ced4da' }

  return (
    <>
      <Row>
        <Col style={colHeader} md={4}>Item</Col>
        <Col style={colHeader} md={3}>Value</Col>
        <Col style={colHeader} md={3}>Description</Col>
        <Col style={colHeader} md={1}>Status</Col>
        <Col style={colHeader} md={1}>Action</Col>
      </Row>
      <Row>
        <Col style={col} md={4}>1. PPh21</Col>
        <Col style={col} md={3}>100% of PPh21</Col>
        <Col style={col} md={3}>Offered by Glints</Col>
        <Col style={col} md={1}>included</Col>
        <Col style={colAction} md={1}>
          <Button variant='light' style={{ padding: '0 16px', margin: '8px 0' }}>Edit</Button>
        </Col>
      </Row>
      <Row>
        <Col style={col} md={4}>2. BPJS Kesehatan 1%</Col>
        <Col style={col} md={3}>1% x Basic Salary or Max Limit</Col>
        <Col style={col} md={3}>Offered by Glints</Col>
        <Col style={col} md={1}>included</Col>
        <Col style={colAction} md={1}>
          <Button variant='light' style={{ padding: '0 16px', margin: '8px 0' }}>Edit</Button>
        </Col>
      </Row>
      <Row>
        <Col style={colDisabled} md={4}>3. BPJS Ketenagakerjaan JHT 2%</Col>
        <Col style={colDisabled} md={3}>2% x Basic Salary</Col>
        <Col style={colDisabled} md={3}>{}</Col>
        <Col style={colDisabled} md={1}>excluded</Col>
        <Col style={colAction} md={1}>
          <Button variant='light' style={{ padding: '0 16px', margin: '8px 0' }}>Edit</Button>
        </Col>
      </Row>
      <Row>
        <Col style={colDisabled} md={4}>4. BPJS Ketenagakerjaan JP 2%</Col>
        <Col style={colDisabled} md={3}>1% x Basic Salary or Max Limit</Col>
        <Col style={colDisabled} md={3}>{}</Col>
        <Col style={colDisabled} md={1}>excluded</Col>
        <Col style={colAction} md={1}>
          <Button variant='light' style={{ padding: '0 16px', margin: '8px 0' }}>Edit</Button>
        </Col>
      </Row>
    </>
  )
}

export default AdditionalAllowances
