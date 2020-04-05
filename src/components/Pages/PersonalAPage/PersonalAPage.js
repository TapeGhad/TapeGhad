import React, { Component } from 'react';
import axios from 'axios';
import "./PersonalAPage.css"
import "bootstrap/dist/css/bootstrap.min.css";
import PersonalInfo from "./PersonalInfo/PersonalInfo"
import CollHeader from './CollHeader/CollHeader';
import AddColl from './AddCollOffer/AddColl';
import CreateCollBlock from "./CreateCollBlock/CreateCollBlock"
import { Link } from 'react-router-dom';
import Cookies from "js-cookies";

// async function asyncForEach(array, callback) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// }

class PersonalAPage extends Component {
    constructor(props) {
        super(props);
        this.onAddClickHandler = this.onAddClickHandler.bind(this);
        this.onChangeCollName = this.onChangeCollName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onFocusField = this.onFocusField.bind(this);
        this.TopicsList = this.TopicsList.bind(this);
        this.onCreateCollection = this.onCreateCollection.bind(this);
        this.isCollectionsExists = this.isCollectionsExists.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
        this.CollectionList=this.CollectionList.bind(this);
        this.Pagination = this.Pagination.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.AdminUsersList = this.AdminUsersList.bind(this);
        this.BlockUser = this.BlockUser.bind(this);
        this.BanUser = this.BanUser.bind(this);
        this.UnblockUser = this.UnblockUser.bind(this);
        this.GetAdminUsersList = this.GetAdminUsersList.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeAdminTopic = this.onChangeAdminTopic.bind(this);
        this.AddTopic = this.AddTopic.bind(this);
        
        


        this.state = {
          keyUsers: true,
          keyCook: true,
          username: this.props.authorized,
          email: this.props.email,
          addClicked: false,
          nameColl: '',
          nameDescrip: '',
          nameTopic: '',
          collections: [],
          key: true,
          collectionsStatus: ["collectionsStatus"],
          status: [],
          topics: [],
          statusColl: ["form-control coll"],
          statusDescrip: ["form-control coll"],
          statusTopic: ["form-control coll"],
          pagination: ["pagination"],
          currPage: 1,
          CollPerPage: 5,
          pages: 0,
          usersList: [],
          image: '',
          adminTopic: '',
          images: []
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
            this.setState({
              keyCook: false
            })
            }
          });
      }}

    TopicsList() {
        return this.state.topics.map((topic, index) =>{
            return (<option key={index}>{topic.name}</option>)
        })
      }

    CollectionList() {
      return this.state.collections.map((coll, index) =>{
        return (
          
            <div className="collection-block"key={index} >
              {console.log("111")}
              <div className="info-coll-block">
                <div style={{display: "flex", flexDirection:"row",justifyContent: "space-between"}}>
                <Link to={`/collection/${coll.name}`} style={{textDecoration: "none", color: "#fff"}}>
                  <h2>{coll.name}</h2>
                </Link>
                </div>
                <h4 style={{textShadow: "5px 5px 15px black"}}>{coll.description}</h4>
                <h4 style={{textShadow: "5px 5px 15px black"}}>Topic: {coll.topic}</h4>
                <h4 style={{textShadow: "5px 5px 15px black"}}>Items: {coll.items}</h4>
              </div>
              {coll.topic==="Alcohol" 
                ?<div className="topic-alcohol"></div>
                :<div className="topic-alcohol" style={{backgroundImage: `url('http://localhost:5000/download/${coll.topic}')`}}></div>}
                <div style={{display:"flex", flexDirection:"column"}}>
                    <button type="button" className="delete-coll" onClick={this.deleteCollection.bind(this, coll.name)} styele={{marginTop: "auto"}}>×</button>
                </div>
            </div>
        
        )
    })
  }

    onAddClickHandler () {
        axios.get('https://tapeghadkpserver.herokuapp.com/topics').then(res => {
            this.setState({
                topics: res.data
            })
        })

        const coll = this.state.addClicked ? ["collectionsStatus"] : ["collectionsStatus", "move"]
        const pagination = this.state.addClicked ? ["pagination"] : ["pagination", "move-coll"] 
        this.setState({
            keyCook: true,
            addClicked: !this.state.addClicked,
            nameColl: '',
            nameDescrip: '',
            nameTopic: '',
            collectionsStatus: coll,
            status: [],
            topics: [],
            statusColl: ["form-control coll"],
            statusDescrip: ["form-control coll"],
            statusTopic: ["form-control coll"],
            pagination: pagination

        })
    }

    onChangeCollName(e) {
        this.setState({
          nameColl: e.target.value
        })
      }

    onChangeDescription(e) {
        this.setState({
            nameDescrip: e.target.value
        })
      }

    onChangeTopic(e) {
        this.setState({
            nameTopic: e.target.value,
            statusTopic: ["form-control coll"],
            status: []
        })
      }

      onChangeAdminTopic(e) {
        this.setState({
          adminTopic: e.target.value
      })
      }

    onFocusField() {
        const pagination = this.state.addClicked ? ["pagination", "move-coll"] : ["pagination"]
        this.setState({
          keyCook: true,
          status: [],
          statusColl: ["form-control coll"],
          statusDescrip: ["form-control coll"],
          statusTopic: ["form-control coll"],
          collectionsStatus: ["collectionsStatus", "move"],
          pagination: pagination
        })
      }

    onCreateCollection (e) {
        e.preventDefault();

        if (this.state.nameColl.length>=3 && this.state.nameColl.length<=15) {
            if (this.state.nameDescrip.length >= 5 && this.state.nameDescrip.length <= 30) {
             if (this.state.nameTopic.length >= 2) {
              const collection = {
                owner: this.state.username,
                name: this.state.nameColl,
                description: this.state.nameDescrip,
                topic: this.state.nameTopic
              }
              axios.post('https://tapeghadkpserver.herokuapp.com/collections/add', collection)
                .then(res => {
                  if (res.data==="Collection already exists") {
                    this.setState({
                      keyCook: true,
                      status: ["Coll-exists"],
                      statusColl: ["form-control coll", "error"],
                      collectionsStatus: ["collectionsStatus", "move", "err"],
                      pagination: ["pagination", "move-coll", "err-coll"]
                    })
                  }
                  if (res.data==="Collection added succesfully.") {
                    this.isCollectionsExists()
                    this.setState({
                      nameColl: '',
                      nameDescrip: '',
                      status: ["Successfully"],
                      statusColl: ["form-control coll"],
                      statusDescrip: ["form-control coll"],
                      collectionsStatus: ["collectionsStatus", "move", "err"],
                      pagination: ["pagination", "move-coll", "err-coll"]
                    })
                  }
                });
            }else {
                this.setState({
                    status: ["Short-Topic"],
                    statusTopic: ["form-control coll", "error"],
                    collectionsStatus: ["collectionsStatus", "move", "err"],
                    pagination: ["pagination", "move-coll", "err-coll"]
                  })
            } 
          } else {
              this.setState({
                status: ["Incorect-Descrip"],
                statusDescrip: ["form-control coll", "error"],
                collectionsStatus: ["collectionsStatus", "move", "err"],
                pagination: ["pagination", "move-coll", "err-coll"]
              })
            }
          }
        else {
          this.setState({
            status: ["Incorect-CollName"],
            statusColl: ["form-control coll", "error"],
            collectionsStatus: ["collectionsStatus", "move", "err"],
            pagination: ["pagination", "move-coll", "err-coll"]
          })
      
        }
    }

    isCollectionsExists () {
      const user = {
        owner: this.props.authorized
      }
      axios.post('https://tapeghadkpserver.herokuapp.com/collections/owner', user).then(async res => {
          const pages = Math.ceil(res.data.length / this.state.CollPerPage)
            this.setState({
                collections: res.data,
                key: false,
                pages: pages
            })
          // await asyncForEach(res.data, async collection => {
          //   let Coll = {
          //     imageName: collection.topic
          //   }
          //   axios.post(`http://localhost:5000/getImage`, Coll).then(async image =>{
          //     let reader = new FileReader();
          //     reader.onloadend = (e) => {
          //       let currImages = this.state.images;
          //       let obj = {
          //         topic: collection.topic,
          //         image: [reader.result]
          //       }
          //       currImages = currImages.push(obj)
          //       this.setState({
          //         images: currImages
          //       });
          //     }
              
          //   })
          // })
          // console.log("Images:",this.state.images)
        })
    }

    deleteCollection(collname) {
      const collection = {
        collname: collname
      }
      
      axios.post('https://tapeghadkpserver.herokuapp.com/collections/delete', collection).then(res => {
        this.setState({keyCook: true})
          if (res.data==="Ok") this.isCollectionsExists()
          else {
            this.isCollectionsExists()
          } 
        })
    }

    onChangePage (page) {
      this.setState({
          currPage: page,
          keyCook: true
      })
  }

    Pagination() {
     
      const pages = [];
      for(let page=1; page<=this.state.pages; page++) {
          pages.push(page)
      }
           
      return  pages.map((page, index) => {
                  return (
                      
                      <div key={index}>
                          {this.state.currPage===page 
                          ?
                              <div className="page-active" key={index} onClick={this.onChangePage.bind(this, page)}>
                                  <h1>{page}</h1>
                              </div>
                          : 
                              <div className="page" key={index} onClick={this.onChangePage.bind(this, page)}>
                                  <h1>{page}</h1>
                              </div>
                          }
                      </div>
                      
                  )
              })
    }

    GetAdminUsersList() {
      axios.get('https://tapeghadkpserver.herokuapp.com/users/test').then(res => {
          
        this.setState({
           usersList: res.data,
           keyUsers:false
        })
    })
    }

    AdminUsersList() {

        // for (let iter=0; iter<=this.state.usersList.length; iter+=3)
        let iter = -1;
      return this.state.usersList.map((user, index) => {
        iter+=1;
        if (iter%3===0 || iter%3===3){
          if  (user.username!=="admin") {
        return (
          <div className="admin-main-us" key={index}>
                      <div className="admin-main-small-table" style={{ padding: "5px 0 0 15px",width: "30%", borderWidth: "0"}}>
                        <h2>{user.username}</h2>
                      </div>
                      <div className="admin-main-small-table" >
                        <h2>{this.state.usersList[iter+1]}</h2>
                      </div>
                      <div className="admin-main-small-table" >
                        <h2>{this.state.usersList[iter+2]}</h2>
                      </div>
                      <div className="admin-main-small-table" style={{ padding: "5px 10px 0 10px", width:"15%"}}>
                        {user.status===1
                          ? <i className="fa fa-unlock" onClick={this.BlockUser.bind(this, user.username)}></i>
                          : <i className="fa fa-lock" onClick={this.UnblockUser.bind(this, user.username)}></i>}
                      </div>
                      <div className="admin-main-small-table" style={{ padding: "5px 10px 0 10px", width:"15%"}} >
                        <i className="fa fa-user-times" title="Delete User" onClick={this.BanUser.bind(this, user.username)}></i>
                      </div>
          </div>
        )}
        else {
          return (
            <div></div>
          )
        }
        }
        else {
          return (
            <div></div>
          )
        }
        
      })
    }

    BlockUser (username) {
      const user = {
        username: username
      }
      axios.post('https://tapeghadkpserver.herokuapp.com/users/block', user).then(res => {
        this.AdminUsersList()
        this.setState({
          keyUsers: true,
          keyCook: true,
        })
    })
    }

    UnblockUser (username) {
      const user = {
        username: username
      }
      axios.post('https://tapeghadkpserver.herokuapp.com/users/unblock', user).then(res => {
        this.AdminUsersList()
        this.setState({
          keyUsers: true,
          keyCook: true,
        })
    })
    
    }

    BanUser (username) {
      const user = {
        username: username
      }
      axios.post('https://tapeghadkpserver.herokuapp.com/users/delete', user).then(res => {
        this.AdminUsersList()
        this.setState({
          keyUsers: true,
          keyCook: true,
        })
    })
    }

    onChangeImage(e) {
      e.preventDefault();

      let file = e.target.files[0];
      let reader = new FileReader();

      if (e.target.files.length === 0) {
        return;
      }
      reader.onloadend = (e) => {
        this.setState({
          image: [reader.result]
        });
      }

      reader.readAsDataURL(file);
    }

    AddTopic() {
      const Topic = {
        nameTopic: this.state.adminTopic
      }
      axios.post('http://localhost:5000/topics/add', Topic).then(res => {
        this.setState({
          adminTopic: ''
        })
    })
  }
      
    
    render () {
        return (
        <div className="personalA-page">
          {console.log("111")}
          {this.state.keyUsers ? this.GetAdminUsersList() : null}
          {this.state.keyCook ? this.CheckCookies() : null}
          
            {this.props.authorized!=="admin" ?
            <>
              {this.state.key ? this.isCollectionsExists() : null}
            <PersonalInfo 
                username={this.state.username}
                email={this.state.email}
            />
            <div className="personal-coll">
                <CollHeader/>
                {this.state.collections.length === 0 ?
                  this.state.addClicked ?
                  <>
                    <AddColl onClassClose="closed" onAddColl={this.onAddClickHandler}/>
                    <CreateCollBlock
                        CreateContName="create-coll-container"
                        CreateBlockName="create-coll-block"
                        status={this.state.status}
                        statusColl={this.state.statusColl}
                        nameColl={this.state.nameColl}
                        onChangeCollName={this.onChangeCollName}
                        onFocusField={this.onFocusField}
                        statusDescrip={this.state.statusDescrip}
                        nameDescrip={this.state.nameDescrip}
                        onChangeDescription={this.onChangeDescription}
                        statusTopic={this.state.statusTopic}
                        onChangeTopic={this.onChangeTopic}
                        TopicsList={this.TopicsList}
                        onCreateCollection={this.onCreateCollection}
                        onAddClickHandler={this.onAddClickHandler}
                    />
                </>
                :
                <>
                    <AddColl onClassClose=" " onAddColl={this.onAddClickHandler}/>
                    <CreateCollBlock
                        CreateContName="create-coll-container closed"
                        CreateBlockName="create-coll-block closed"
                        status={this.state.status}
                        statusColl={this.state.statusColl}
                        nameColl={this.state.nameColl}
                        onChangeCollName={this.onChangeCollName}
                        onFocusField={this.onFocusField}
                        statusDescrip={this.state.statusDescrip}
                        nameDescrip={this.state.nameDescrip}
                        onChangeDescription={this.onChangeDescription}
                        statusTopic={this.state.statusTopic}
                        onChangeTopic={this.onChangeTopic}
                        TopicsList={this.TopicsList}
                        onCreateCollection={this.onCreateCollection}
                        onAddClickHandler={this.onAddClickHandler}
                    />
                </>
                : 
                  <div className="user-coll-list">
                    {this.state.addClicked ? null 
                    :<button type="button" className="btn btn-success exists" onClick={this.onAddClickHandler}>Add+</button>}

                    {!this.state.addClicked ?
                    <CreateCollBlock
                        CreateContName="create-coll-container closed"
                        CreateBlockName="create-coll-block closed"
                        status={this.state.status}
                        statusColl={this.state.statusColl}
                        nameColl={this.state.nameColl}
                        onChangeCollName={this.onChangeCollName}
                        onFocusField={this.onFocusField}
                        statusDescrip={this.state.statusDescrip}
                        nameDescrip={this.state.nameDescrip}
                        onChangeDescription={this.onChangeDescription}
                        statusTopic={this.state.statusTopic}
                        onChangeTopic={this.onChangeTopic}
                        TopicsList={this.TopicsList}
                        onCreateCollection={this.onCreateCollection}
                        onAddClickHandler={this.onAddClickHandler}
                    />
                    :
                    <CreateCollBlock
                        CreateContName="create-coll-container"
                        CreateBlockName="create-coll-block"
                        status={this.state.status}
                        statusColl={this.state.statusColl}
                        nameColl={this.state.nameColl}
                        onChangeCollName={this.onChangeCollName}
                        onFocusField={this.onFocusField}
                        statusDescrip={this.state.statusDescrip}
                        nameDescrip={this.state.nameDescrip}
                        onChangeDescription={this.onChangeDescription}
                        statusTopic={this.state.statusTopic}
                        onChangeTopic={this.onChangeTopic}
                        TopicsList={this.TopicsList}
                        onCreateCollection={this.onCreateCollection}
                        onAddClickHandler={this.onAddClickHandler}
                    />}
                    <div className={this.state.collectionsStatus.join(" ")}>
                      {this.CollectionList()}
                    </div>
                    <div className={this.state.pagination.join(" ")}>
                              {this.Pagination()}
                    </div>
                </div>
                
                
                }

            </div>
            </>
            : <div className="admin-pa" >
                <div className="admin-main-block">
                  <div className="admin-main-header"> 
                    <div className="admin-main-small-table" style={{ padding: "5px 0 0 15px",width: "30%", borderWidth: "0"}}>
                      <h2>User</h2>
                    </div>
                    <div className="admin-main-small-table" >
                      <h2>Collections</h2>
                    </div>
                    <div className="admin-main-small-table" >
                      <h2>Items</h2>
                    </div>
                    <div className="admin-main-small-table" style={{ padding: "5px 10px 0 10px", width: "15%"}}>
                      <h2>Block</h2>
                    </div>
                    <div className="admin-main-small-table" style={{ padding: "5px 10px 0 10px", width: "15%"}}>
                      <h2>Delete</h2>
                    </div>
                  </div>
                  
                  {this.AdminUsersList()}
                  
                </div>
                <div style={{border:"2px solid #fff", marginTop:"20px", padding: "10px"}} onDrop>
                  <form action="http://localhost:5000/upload" method="post" enctype="multipart/form-data" style={{color: "#fff"}}>
                    <label>Add Image.png to topic (Both names MUST be indentical)</label><br/>
                    <input type="file" name="filedata" onChange={this.onChangeImage}/><br></br>
                    <input type="submit" value="Send" />
                  </form>
                  <h1 style={{color: "#fff"}}>Preview</h1>
                  <img src={this.state.image} alt="" style={{maxWidth: "200px", maxHeight:"200px"}}/>
                </div>
                <div style={{border:"2px solid #fff", marginTop:"20px", padding: "10px"}}>
                  <input type="text" placeholder="Add Topic" value={this.state.adminTopic} onChange={this.onChangeAdminTopic}/><br></br>
                  <button onClick={this.AddTopic}>Add Topic</button>
                </div>
                
              </div>}
        </div>)
    }
}

export default PersonalAPage