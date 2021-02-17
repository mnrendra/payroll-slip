// import { useState } from 'react'

import { Input } from '../commons'

const Name = () => {
  // const [localValue, setLocalValue] = useState('')

  return (
    <div className='Name'>
      <Input
        label='Employee Name'
        placeHolder='Full Name'
      />
    </div>
  )
}

export default Name
