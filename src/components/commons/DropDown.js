import { useState, useEffect } from 'react'
import { Form, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap'

const DropDown = ({
  label = 'Label',
  withoutLabel = false,
  value = 'Value',
  items = [],
  onChange,
  disabled = false
}) => {
  if (!Array.isArray(items)) throw new Error('items must be an array!')

  const [selected, setSelected] = useState('Value')

  useEffect(() => {
    setSelected(value)
  }, [value])

  useEffect(() => {
    typeof onChange === 'function' && onChange(selected)
  }, [selected])

  return (
    <div className='DropDown'>
      <Form.Group>
        {/* Label */}
        {!withoutLabel && <Form.Label>{label}</Form.Label>}
        <InputGroup>
          <DropdownButton
            variant='outline-secondary'
            title={selected}
            style={{ width: '100%' }}
            disabled={disabled}
          >
            {items.map(item => (
              <Dropdown.Item
                // className={[0, 6].includes(new Date(`${year}-${month + 1}-${item}`).getDay()) ? 'weekend' : 'weekdays'}
                key={item}
                onClick={() => setSelected(item)}
                disabled={selected === item}
              >
                <span>{item}</span>
                {/* <span style={{ float: 'right', textAlign: 'right' }}>{DAYS[new Date(`${year}-${month + 1}-${item}`).getDay()]}</span> */}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </InputGroup>
      </Form.Group>
    </div>
  )
}

export default DropDown
