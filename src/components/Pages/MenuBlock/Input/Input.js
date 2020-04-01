import React from "react"
import "./Input.css"

const Input = props => (
    <>
    <label>{props.name}</label>
        <input  type="text"
            required
            className={props.nameCl}
            value={props.defaultValue}
            onChange={props.onChangeHandler}
            onFocus={props.onFocusHandler}
        />
    </>
)

export default Input