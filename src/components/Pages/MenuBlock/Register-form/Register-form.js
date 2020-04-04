import React from "react"
import Warning from "../Warning/Warning"
import Input from "../Input/Input"

const RegisterForm = props => (
    <div className="register-back">
        <h3>Register</h3>
          {props.currStatus.includes("Successfully") ? 
           <Warning status="Successfully" word="Successfully"/>
           :props.currStatus.includes("Invalid-data") ? 
           <Warning status="Invalid-data" word="Incorrect data"/>
           :props.currStatus.includes("User-short") ?
           <Warning status="Invalid-data" word="Incorrect login (3-15)"/>
           :props.currStatus.includes("Diff-pass") ?
           <Warning status="Invalid-data" word="Different passwords"/>
           :props.currStatus.includes("Email-err") ?
           <Warning status="Invalid-data" word="E-mail incorrect"/>
           :props.currStatus.includes("User-exists") ?
           <Warning status="Invalid-data" word="User already exists"/> 
           :props.currStatus.includes("Email-exists") ?
           <Warning status="Invalid-data" word="Email already exists"/> 
           :props.currStatus.includes("Short-pass") ?
           <Warning status="Invalid-data" word="Pass is too short (5 min)"/> : null}
          <form >
          <div className="form-group">
            <Input    
              name="Username: "
              nameCl={props.nameClU}
              defaultValue={props.currUsername}
              onChangeHandler={props.onChangeHandlerUs}
              onFocusHandler={props.onFocusFieldHandler}
            />
            <Input    
              name="E-mail: "
              nameCl={props.nameClE}
              defaultValue={props.currEmail}
              onChangeHandler={props.onChangeHandlerEmail}
              onFocusHandler={props.onFocusFieldHandler}
            />
            <Input    
              name="Password: "
              nameCl={props.nameClP}
              defaultValue={props.currPass}
              onChangeHandler={props.onChangeHandlerPass}
              onFocusHandler={props.onFocusFieldHandler}
            />
            <Input    
              name="Confirm password: "
              nameCl={props.nameClCP}
              defaultValue={props.currConfPass}
              onChangeHandler={props.onChangeHandlerCPass}
              onFocusHandler={props.onFocusFieldHandler}
            />
          </div>
        </form>
        <div className="buttons">
            <button type="submit" className="button change" onClick={props.onChangeMenuHandler}>Login</button>
            <button type="change" className="button main" onClick={props.onSubmitRegister}>Register </button>
          </div>
    </div>
)

export default RegisterForm