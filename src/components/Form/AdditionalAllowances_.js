import { useState } from 'react'

import { Table, Button, Row, Col, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'

import { DropDown, Input } from '../commons'

const ROWS = [
  {
    name: 'PPh21',
    valueType: 'Fixed',
    valueTypes: ['Fixed', 'Percentage'],
    valueTypesDisabled: false,
    value: 0,
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
    value: '100.00',
    formula: 'x 1% x Basic Salary',
    note: 'Offered by Glints',
    action: 'Enable',
    disabled: false
  },
  {
    name: 'BPJS Ketenagakerjaan JHT 2%',
    valueType: 'Percentage',
    valueTypes: ['Fixed', 'Percentage'],
    valueTypesDisabled: true,
    value: '100.00',
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
    value: '100.00',
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
              <td style={{ padding: '19px 12px', color: row.disabled ? '#ced4da' : '#212529' }}>
                {index + 1}
              </td>
              <td style={{ width: '280px' }}>
                <Row>
                  <Col md={12} style={{ padding: '0' }}>
                    <InputGroup>
                      <FormControl
                        value={row.name}
                        style={{ textAlign: 'left', color: row.disabled ? '#ced4da' : '#212529' }}
                        disabled={row.disabled}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </td>
              <td>
                <InputGroup>
                  <DropdownButton
                    variant='outline-secondary'
                    title={row.valueType}
                    style={{ width: '100%', color: row.disabled ? '#ced4da' : '#212529' }}
                    disabled={row.disabled || row.valueTypesDisabled}
                  >
                    {row.valueTypes.map(item => (
                      <Dropdown.Item
                        // className={[0, 6].includes(new Date(`${year}-${month + 1}-${item}`).getDay()) ? 'weekend' : 'weekdays'}
                        key={item}
                        onClick={() => onValueTypesChange(index)}
                        disabled={row.valueType === item}
                      >
                        <span>{item}</span>
                        {/* <span style={{ float: 'right', textAlign: 'right' }}>{DAYS[new Date(`${year}-${month + 1}-${item}`).getDay()]}</span> */}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </InputGroup>
              </td>
              <td style={alignRight}>
                {
                  row.valueType === 'Fixed'
                    ? (
                      <Row>
                        <Col md={12} style={{ padding: '0' }}>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text style={{ color: row.disabled ? '#ced4da' : '#212529' }}>IDR</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              style={{ textAlign: 'right', color: row.disabled ? '#ced4da' : '#212529' }}
                              disabled={row.disabled}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      )
                    : (
                      <Row>
                        <Col md={5} style={{ padding: '0' }}>
                          <InputGroup>
                            <FormControl
                              value={row.value}
                              disabled={row.disabled}
                              style={{ textAlign: 'right', color: row.disabled ? '#ced4da' : '#212529' }}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text style={{ color: row.disabled ? '#ced4da' : '#212529' }}>%</InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Col>
                        <Col md={7} style={{ paddingLeft: '4px', textAlign: 'left', color: row.disabled ? '#ced4da' : '#212529' }}>
                          {row.formula}
                        </Col>
                      </Row>
                      )
                }
              </td>
              <td>
                <Row>
                  <Col md={12} style={{ padding: '0' }}>
                    <InputGroup>
                      <FormControl
                        value={row.note}
                        style={{ textAlign: 'left' }}
                        disabled={row.disabled}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </td>
              <td style={alignCenter}>
                <Button
                  variant='light'
                  onClick={() => onActionClicked(index)}
                >
                  {row.action}
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Items</th>
          <th>Value Type</th>
          <th style={{ width: '300px' }}>Value</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      {renderTBody(rows, setRows)}
    </Table>
  )
}

export default AdditionalAllowances
