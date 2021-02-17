import { useState } from 'react'
import { Form } from 'react-bootstrap'

const Input = ({
  label = 'Label',
  withoutLabel = false,
  placeHolder = 'Placeholder',
  type = 'text',
  textMuted = '',
  align = 'left',
  value,
  onChange
}) => {
  const [localValue, setLocalValue] = useState('')

  return (
    <div className='Input'>
      <Form.Group>
        {!withoutLabel && <Form.Label>{label}</Form.Label>}
        <Form.Control
          type={type}
          placeholder={placeHolder}
          value={typeof value === 'string' ? value : localValue}
          onChange={({ target }) => typeof onChange === 'function' ? onChange(target.value) : setLocalValue(target.value)}
          style={{ textAlign: align }}
        />
        <Form.Text className='text-muted'>{textMuted}</Form.Text>
      </Form.Group>
    </div>
  )
}

export default Input
