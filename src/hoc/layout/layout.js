import React, { Component } from "react"
import "./layout.css"
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle"
import Drawer from "../../components/Navigation/Drawer/Drawer"
import Footer from "../../components/Navigation/Footer/Footer"




class layout extends Component {
    state = {
        menu: false,
    }
    
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    




    render() {
        return (
           <div className="layout">
              
               <Footer
               onChangeGoOn={this.props.onChangeGoOn.bind(this)}
               />
               <Drawer
               isOpen = {this.state.menu}
               onClose = {this.menuCloseHandler}
               authorized = {this.props.authorized}
               authorizedChange = {this.props.auhtorizedChangeHandler}
               />
               <MenuToggle
                    onMenuToggle={this.toggleMenuHandler}
                    isOpen = {this.state.menu}
               />
               <main>
                   {this.props.children}
               </main>
           </div> 
        )
    }
}

export default layout