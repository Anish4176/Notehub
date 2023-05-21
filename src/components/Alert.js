import React from 'react'

function Alert(props) {
  return (
    <div style={{ marginTop: "3.6rem", height: '1rem' }}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.alert.msg} </strong>
      </div>}
    </div>
  )
}

export default Alert