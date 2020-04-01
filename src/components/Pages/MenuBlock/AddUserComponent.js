import React, { Component } from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
import "../../Navigation/Drawer/Drawer.css"
import "./AddUserComponent.css"
import Cookies from "js-cookies"
import RegisterForm from "./Register-form/Register-form"
import LoginForm from "./Login-form/LoginForm"
import is from 'is_js'




export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.ChangeMenu = this.ChangeMenu.bind(this);
    this.onFocusField = this.onFocusField.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.LogOutHandler = this.LogOutHandler.bind(this);

    this.state = {
      username: '',
      password: '',
      confirmpassword: '',
      email: '',
      login_form: true,
      nameClU: ["form-control"],
      nameClE: ["form-control"],
      nameClP: ["form-control"],
      nameClCP: ["form-control"],
      status: []
    }
  }

  CheckCookies () {
    if (this.props.authorized.length>=3){
      const user = {
        username: this.props.authorized
      }
      axios.post('https://tapeghadkpserver.herokuapp.com/users/confirmCookie', user)
      .then(res => {
        if (res.data==="Exists") {}
        if (res.data==="Not Exists") {
         
            this.props.authorizedChange('s', 's');
          
        Cookies.removeItem("authorized")
        Cookies.removeItem("email")
        }
      });
  }}


  LogOutHandler () {
    if (this.props.authorized.length>=3){
      const user = {
        username: this.props.authorized
      }
      axios.post('https://tapeghadkpserver.herokuapp.com/users/logout', user)
      .then(res => {
        
        this.props.authorizedChange('s');
        Cookies.removeItem("authorized")
        Cookies.removeItem("email")
      });
  }}

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmpassword: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onSubmitRegister(e) {
    e.preventDefault();

    if (this.state.password===this.state.confirmpassword) {
      if (this.state.password.length >= 5) {
        if (is.email(this.state.email)) {
          if (this.state.username.length >=3) {
        const user = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }

        axios.post('https://tapeghadkpserver.herokuapp.com/users/add', user)
          .then(res => {
            console.log(res.data)
            if (res.data==="User already exists") {
              this.setState({
                status: ["User-exists"],
                nameClU: ["form-control", "error"]
              })
            }
            if (res.data==="Email already exists") {
              this.setState({
                status: ["Email-exists"],
                nameClE: ["form-control", "error"]
              })
            }
            if (res.data==="User added succesfully.") {
              this.setState({
                username: '',
                password: '',
                confirmpassword: '',
                email: '',
                status: ["Successfully"],
                nameClU: ["form-control"],
                nameClE: ["form-control"],
                nameClP: ["form-control"],
                nameClCP: ["form-control"]
              })
            } 
            
          });
        } else {
          this.setState({
            status: ["User-short"],
            nameClU: ["form-control", "error"]
          })
        }
      } else {
        this.setState({
          status: ["Email-err"],
          nameClE: ["form-control", "error"]
        })
      }
    } else {
        this.setState({
          status: ["Short-pass"],
          nameClP: ["form-control", "error"],
          nameClCP: ["form-control", "error"]
        })
      }
    }
  else {
    this.setState({
      status: ["Diff-pass"],
      nameClP: ["form-control", "error"],
      nameClCP: ["form-control", "error"]
    })

  }
}

  onSubmitLogin(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    }

    axios.post('https://tapeghadkpserver.herokuapp.com/users/checkUserData', user)
      .then(res => {
        if (res.data!=="Incorrect data.") {
          Cookies.setItem("authorized", user.username, {expires: 1})
          Cookies.setItem("email", res.data, {expires: 1})
          this.props.authorizedChange(user.username, res.data);
          this.setState({
            username: '',
            password: '',
            confirmpassword: '',
            status: [],
            nameClU: ["form-control"],
            nameClE: ["form-control"],
            nameClP: ["form-control"],
            nameClCP: ["form-control"]
          })
        }
        else {
          this.setState({
            status: ["Invalid-data"],
            nameClU: ["form-control", "error"],
            nameClP: ["form-control", "error"]
          })
        }
    
    });
  }

  ChangeMenu(e) {
    e.preventDefault();

    this.setState({
      login_form: !this.state.login_form,
      username: '',
      password: '',
      confirmpassword: '',
      status: [],
      nameClU: ["form-control"],
      nameClE: ["form-control"],
      nameClP: ["form-control"],
      nameClCP: ["form-control"]
    })
  }

  onFocusField() {
    this.setState({
      status: [],
      nameClU: ["form-control"],
      nameClE: ["form-control"],
      nameClP: ["form-control"],
      nameClCP: ["form-control"]
    })
  }

  render() {
    return (
      <div className={this.props.className}>
          {this.CheckCookies()}
          {this.props.authorized.length<=3 ?
          !this.state.login_form ?
          <RegisterForm 
            nameClU = {this.state.nameClU.join(" ")}
            nameClE = {this.state.nameClE.join(" ")}
            nameClP = {this.state.nameClP.join(" ")}
            nameClCP = {this.state.nameClCP.join(" ")}
            currStatus={this.state.status}
            onSubmitRegister={this.onSubmitRegister}
            currUsername={this.state.username}
            currEmail={this.state.email}
            currPass={this.state.password}
            currConfPass={this.state.confirmpassword}
            onChangeHandlerUs={this.onChangeUsername}
            onChangeHandlerEmail={this.onChangeEmail}
            onChangeHandlerPass={this.onChangePassword}
            onChangeHandlerCPass={this.onChangeConfirmPassword}
            onFocusFieldHandler={this.onFocusField}
            onChangeMenuHandler={this.ChangeMenu}
          />
        : 
        <LoginForm
            nameClU = {this.state.nameClU.join(" ")}
            nameClP = {this.state.nameClP.join(" ")}  
            currStatus={this.state.status}
            onSubmitLogin={this.onSubmitLogin}
            currUsername={this.state.username}
            currPass={this.state.password}
            currConfPass={this.state.confirmpassword}
            onChangeHandlerUs={this.onChangeUsername}
            onChangeHandlerPass={this.onChangePassword}
            onFocusFieldHandler={this.onFocusField}
            onChangeMenuHandler={this.ChangeMenu}
          />
          :
          <div className="register-back" style={{padding: "10px"}}> 
            <div className="logout-form">
              <h3>Hello, {this.props.authorized}!</h3>
              <div className="buttons logout">
                <button  className="button logout" onClick={this.LogOutHandler} >Log out</button>  
                <Link to="/personal-area">
                  <button  className="button pa" onClick={this.props.onCloseDrawer}>Personal Area</button>
                </Link>
                
              </div>
            </div>
          </div>
          }
      </div>
    )
  }
}