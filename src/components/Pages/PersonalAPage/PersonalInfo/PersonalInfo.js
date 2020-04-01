import React from "react"

const PersonalInfo = props => (
    <div className="personal-info">
        <h3>Welcome to the personal area.</h3>
        <h2>Login: {props.username}</h2>
        <h2>E-mail: {props.email}</h2>
    </div>
)

export default PersonalInfo