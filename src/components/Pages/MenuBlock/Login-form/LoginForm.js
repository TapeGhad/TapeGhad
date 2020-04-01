import React from "react"
import Warning from "../Warning/Warning"
import Input from "../Input/Input"

const LoginForm = props => (
    <div className="register-back">
        <h3>Log in</h3>
          {props.currStatus.includes("Successfully") ? 
           <Warning status="Successfully" word="Successfully"/>
           :props.currStatus.includes("Invalid-data") ? 
           <Warning status="Invalid-data" word="Incorrect data"/>
           : null}
          <form onSubmit={props.onSubmitRegister}>
          <div className="form-group">
            <Input    
              name="Username: "
              nameCl={props.nameClU}
              defaultValue={props.currUsername}
              onChangeHandler={props.onChangeHandlerUs}
              onFocusHandler={props.onFocusFieldHandler}
            />
            <Input    
              name="Password: "
              nameCl={props.nameClP}
              defaultValue={props.currPass}
              onChangeHandler={props.onChangeHandlerPass}
              onFocusHandler={props.onFocusFieldHandler}
            />
          </div>
        </form>
        <div className="buttons">
            <button type="submit" className="button change" onClick={props.onChangeMenuHandler}>Register</button>
            <button type="change" className="button main" onClick={props.onSubmitLogin}>Login</button>
          </div>
    </div>
)

export default LoginForm