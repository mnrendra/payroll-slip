import { useState, useEffect } from 'react'

import { Modal, Form, Button } from 'react-bootstrap'

const Dialog = props => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const { data = {} } = props
    setName(data.name || '')
    setValue(data.value || '')
    setDescription(data.description || '')
    setStatus(data.status === 'enabled')
  }, [props])

  const actions = props.actions || {}

  return (
    <Modal
      {...props}
      size='md'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Additional Allowance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Allowance Name</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={props.data.permanent}
              type='text'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Allowance Value</Form.Label>
            <Form.Control
              value={value}
              onChange={e => setValue(e.target.value)}
              disabled={props.data.permanent}
              type='text'
              style={{ textAlign: 'right' }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Allowance Description</Form.Label>
            <Form.Control
              value={description}
              onChange={e => setDescription(e.target.value)}
              type='text'
            />
          </Form.Group>
        </Form>
        <p>{status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-danger'
          onClick={() => actions.onSaved({ ...props.data, name, value, description }, props.data.permanent === 'true', true)}
          disabled={props.data.permanent || props.isnew === 'true'}
        >
          Delete
        </Button>
        <Button
          onClick={() => actions.onSaved({ ...props.data, name, value, description }, props.isnew === 'true')}
          disabled={!name || !value}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Dialog
