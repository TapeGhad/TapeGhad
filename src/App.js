import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./hoc/layout/layout.js"
import MainPage from "./components/Pages/MainPage/MainPage"
import PersonalAPage from "./components/Pages/PersonalAPage/PersonalAPage"
import Cookies from "js-cookies"
import CollectionItems from './components/Pages/CollectionItems/CollectionItems';


 
class App extends Component {

  state = {
    authorized: Cookies.getItem("authorized")===null ? "s" : Cookies.getItem("authorized"),
    email: Cookies.getItem("email")===null ? "s" : Cookies.getItem("email"),
    goto: []
}

onChangeGoOn(name) {
  this.setState({
    goto: name
  })
}


auhtorizedChangeHandler =(name, email) => {
  this.setState({
      authorized: name,
      email: email
  })
}


/* <Redirect to={`/collection/${this.state.goto}`}/> */

  render () {
    const authorized = this.state.authorized
    const authorizedChange = this.auhtorizedChangeHandler.bind(this);
    const CollectionItemsProps = function(props) {
      return (<CollectionItems {...props} authorized={authorized} authorizedChange={authorizedChange}/>);
  };

    const goto = this.state.goto;
  return (
    <Router>
      <Layout
      authorized={this.state.authorized}
      auhtorizedChangeHandler={this.auhtorizedChangeHandler.bind(this)}
      email={this.state.email}
      onChangeGoOn={this.onChangeGoOn.bind(this)}
      >
        <div>
          <br/>
          <Switch>
            {goto.length===1
            ? <>
                {this.setState({goto: []})}
                <Redirect to={`/collection/${goto}`}/>
              </>
            :null}
            {goto.length===2
            ? <>
                {this.setState({goto: []})}
                <Redirect to={`/collection/${goto[0]}/${goto[1]}`}/>
              </>
            :null}
            <Route path="/" exact>
                <MainPage
                    authorized={this.state.authorized}
                    authorizedChange={this.auhtorizedChangeHandler.bind(this)}
                  />
              </Route>
                {this.state.authorized.length>=3 ?
                  <Route path="/personal-area" exact>
                    <PersonalAPage
                      authorized={this.state.authorized}
                      authorizedChange={this.auhtorizedChangeHandler.bind(this)}
                      email={this.state.email}
                    />
                  </Route>
                   : null}
            <Route path="/collection/:name" exact component={CollectionItemsProps}/>
            <Route path="/collection/:name/:item" exact component={CollectionItemsProps}/>
            <Redirect exact to="/"/>
          </Switch>
        </div>
      </Layout>
    </Router>
 );
}}
 
export default App;