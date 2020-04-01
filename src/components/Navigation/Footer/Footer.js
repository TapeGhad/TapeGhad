import React, { Component } from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"
import { Link, Redirect } from 'react-router-dom';



class Footer extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchMain= this.onChangeSearchMain.bind(this);
        this.onSearchOn= this.onSearchOn.bind(this);
        this.searchResult= this.searchResult.bind(this);
        this.ClearSearch= this.ClearSearch.bind(this);


        this.state = {
         currSearchMain: '', 
         searchOn: false,
         found: false,
         foundInfo:[],
         goto:[]
        }
      }

      onChangeSearchMain(e) {
        this.setState({
            currSearchMain: e.target.value,
            searchOn: false,
            goto: []
        })
      }

      ClearSearch(nameColl, nameItem) {
        this.setState({
            currSearchMain: '',
            searchOn: false,
            found: false,
            foundInfo:[]
        })

        if (nameItem.length===0) {
            this.setState({goto: [nameColl]})
        }
        else { this.setState({goto: [nameColl, nameItem]})}
    }

      onSearchOn (e) {
          e.preventDefault();
          this.setState({
              searchOn: true,
              found: true
          })
          
          const search = {
              search: this.state.currSearchMain
          }
          axios.post('https://tapeghadkpserver.herokuapp.com/search', search).then(res => {
            if (res.data==="no") {
                console.log("Nulll!!")
                this.setState({
                   found: false
                })
            }
            else {
                console.log(res.data)
                this.setState({
                   foundInfo: res.data
                })
            }
          })
      }

      searchResult() {
        return (this.state.foundInfo.map((item, index) =>{
           
            return (
              
                <div className="found-all" key={index} >
                    {console.log("111")}
                  {item.description 
                  ? 
                  <>
                    <h4 onClick={this.ClearSearch.bind(this, item.name, "")} style={{margin: "2px 0 5px 3px",color: "rgb(109, 250, 255)",fontSize: "20px",cursor:"pointer", marginRight: "auto"}}>Collection: {item.name}</h4>
                    <h5 >Description: {item.description}</h5>
                    <h5 >Topic: {item.topic}</h5>
                    <h5 style={{margin: "0 auto 5px 3px"}}>Items: {item.items}</h5>
                   </>
                  : <>
                    <h4 onClick={this.ClearSearch.bind(this, item.collectionName, item.name)} style={{margin: "2px 0 5px 3px",color: "rgb(255, 204, 109)",fontSize: "20px",cursor:"pointer", marginRight: "auto"}}>Item: {item.name}</h4>
                    <h5 >Collection: {item.collectionName}</h5>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <h5 style={{margin: "0 0 5px 3px"}}>Tags:</h5>
                        <h5 style={{color:"rgb(191, 255, 132)", fontWeight: "600"}}>{item.tags.join(" ")}</h5>
                    </div>
                  </>}
                  
                  
                  {/* <div style={{display: "flex", flexDirection:"row",justifyContent: "space-between"}}>
                  <Link to={`/collection/${coll.name}`} style={{textDecoration: "none", color: "#fff"}}>
                    <h2>{coll.name}</h2>
                  </Link>
                    <button type="button" className="delete-coll" onClick={this.deleteCollection.bind(this, coll.name)}>×</button>
                  </div>
                  <h4>Topic: {coll.topic}</h4>
                  <h4>{coll.description}</h4> */}
                </div>
             
            )
        }))
      }

    render() {
        return (
            <div className="Footer">
                {this.state.goto.length!==0 
                ? <>
                    {this.props.onChangeGoOn(this.state.goto)}
                    {this.setState({goto: []})}
                    <Redirect to={`/`}/> 
                    </>
                : null}
               <nav className="navbar navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand logo" to="/"></Link>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/" style={{marginRight: "10px"}}>Home</Link>
                        </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" value={this.state.currSearchMain} placeholder="Search" aria-label="Search" onChange={this.onChangeSearchMain} style={{marginBottom:"5px"}}/>
                            <button className="btn btn-outline-success" type="submit" onClick={this.onSearchOn}>Search</button>
                            {this.state.searchOn 
                            ? <div className="search-result">
                                {this.state.foundInfo.length===0 
                                ? <div> <h5 style={{color: "#fff", marginTop: '5px'}}>No results</h5></div>
                                :this.searchResult()}
                            </div>
                            :null}
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Footer