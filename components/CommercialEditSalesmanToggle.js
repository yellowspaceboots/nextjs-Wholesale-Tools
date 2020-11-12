import React, { useState } from 'react'
import Switch from '@material-ui/core/Switch'

const CommercialEditSalesmanToggle = ({ currentState }) => {
  const [toggle, setToggle] = useState(currentState)
  return (
    <Switch
      checked={toggle}
      onChange={() => {
        setToggle(!toggle)
        console.log('triggered')
      }}
      color='primary'
      name='checkedB'
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  )
}

export default CommercialEditSalesmanToggle
