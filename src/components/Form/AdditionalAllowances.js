import { useEffect, useState } from 'react'

import { Button, Row, Col } from 'react-bootstrap'

import { Dialog } from '../commons'

const AdditionalAllowances = ({ listAllowances = [], onUpdate }) => {
  const [allowances, setAllowances] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedAllowance, setSelectedAllowance] = useState({})
  const [isNewAllowance, setIsNewAllowance] = useState(false)

  useEffect(() => {
    setAllowances(listAllowances)
  }, [listAllowances, setAllowances])

  useEffect(() => {
    onUpdate(allowances)
  }, [allowances, onUpdate])

  const onSelectedAllowance = (allowance = {}, isNewAllowance = false) => {
    setIsNewAllowance(isNewAllowance)
    setSelectedAllowance(allowance)
    setShowDialog(true)
  }

  const actions = {
    onSaved: (data = {}, isNew, isDeleted) => {
      let updatedAllowances = []
      console.log('allowances', allowances)
      if (isDeleted) {
        updatedAllowances = allowances.filter(allowance => allowance.id !== data.id && allowance)
        console.log('isDeleted', updatedAllowances)
      } else {
        updatedAllowances = isNew
          ? [...allowances, data]
          : allowances.map(allowance => allowance.id === data.id ? data : allowance)
      }
      console.log('updatedAllowances', updatedAllowances)
      setAllowances(updatedAllowances)
      setShowDialog(false)
    }
  }

  const colHeader = { padding: '0', paddingBottom: '10px', fontWeight: 'bold' }
  const col = { padding: '9px 0', color: 'inderit' }
  const colAction = { padding: '0', cursor: 'pointer' }

  return (
    <div className='AdditionalAllowances'>
      <Row>
        <Col style={colHeader} md={4}>Item</Col>
        <Col style={colHeader} md={3}>Value</Col>
        <Col style={colHeader} md={3}>Description</Col>
        <Col style={colHeader} md={1}>Status</Col>
        <Col style={colHeader} md={1}>Action</Col>
      </Row>
      {allowances.map((allowance = {}, index) => {
        return (
          <Row key={allowance.id} style={{ color: allowance.status === 'disabled' ? '#ced4da' : 'inherit' }}>
            <Col style={col} md={4}>{index + 1}. {allowance.name || ''}</Col>
            <Col style={col} md={3}>{allowance.value || ''}</Col>
            <Col style={col} md={3}>{allowance.description || ''}</Col>
            <Col style={col} md={1}>{allowance.status || ''}</Col>
            <Col style={colAction} md={1}>
              <Button
                variant='light'
                style={{ padding: '0 16px', margin: '8px 0' }}
                onClick={() => onSelectedAllowance(allowance)}
              >
                Edit
              </Button>
            </Col>
          </Row>
        )
      })}
      <Row>
        <Col style={col} md={4}>{}</Col>
        <Col style={col} md={3}>{}</Col>
        <Col style={col} md={3}>{}</Col>
        <Col style={col} md={1}>{}</Col>
        <Col style={colAction} md={1}>
          <Button
            variant='primary'
            style={{ padding: '0 16px', margin: '8px 0' }}
            onClick={() => onSelectedAllowance({ id: allowances.length, status: 'enabled' }, true)}
          >
            Add
          </Button>
        </Col>
      </Row>
      {true && (
        <Dialog
          show={showDialog}
          data={selectedAllowance}
          isnew={'' + isNewAllowance}
          actions={actions || {}}
          onHide={() => setShowDialog(false)}
        />
      )}
    </div>
  )
}

export default AdditionalAllowances
