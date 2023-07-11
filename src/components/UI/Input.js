import React from 'react'
import classes from "./Input.module.css"

// export default function Input(props) {
export default function Input({ label, input: { id, ...input} }) {
  return (
    <div className={classes.input}>
      <label htmlFor={id}>{label}</label>
      <input id={id} { ...input} />
    </div>
  )
}
