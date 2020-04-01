import React, { Component } from 'react'
import BackDrop from "./BackDrop/BackDrop"
//import {NavLink} from "react-router-dom"
import CreateUser from "../../Pages/MenuBlock/AddUserComponent"



class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    render() {
        const cls = ['Drawer']
        if (!this.props.isOpen) {
            cls.push("close")
        }
        return (
            <React.Fragment>
                <CreateUser
                    className={cls.join(" ")}
                    authorized={this.props.authorized}
                    authorizedChange={this.props.authorizedChange}
                    onCloseDrawer={this.props.onClose}
                />
               
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/>: null}
            </React.Fragment>
        )
    }
}

export default Drawer