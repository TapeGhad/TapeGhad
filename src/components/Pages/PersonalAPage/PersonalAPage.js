import React, { Component } from 'react';
import axios from 'axios';
import "./PersonalAPage.css"
import "bootstrap/dist/css/bootstrap.min.css";
import PersonalInfo from "./PersonalInfo/PersonalInfo"
import CollHeader from './CollHeader/CollHeader';
import AddColl from './AddCollOffer/AddColl';
import CreateCollBlock from "./CreateCollBlock/CreateCollBlock"
import { Link } from 'react-router-dom';



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


        this.state = {
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
          statusTopic: ["form-control coll"]
        }
      }

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
                : coll.topic==="Books" 
                ?<div className="topic-books"></div>
                : coll.topic==="Music" 
                ?<div className="topic-music"></div>
                :coll.topic==="Cars" 
                ?<div className="topic-cars"></div>
                :null } 
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
        this.setState({
            addClicked: !this.state.addClicked,
            nameColl: '',
            nameDescrip: '',
            nameTopic: '',
            collectionsStatus: coll,
            status: [],
            topics: [],
            statusColl: ["form-control coll"],
            statusDescrip: ["form-control coll"],
            statusTopic: ["form-control coll"]

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

    onFocusField() {
        this.setState({
          status: [],
          statusColl: ["form-control coll"],
          statusDescrip: ["form-control coll"],
          statusTopic: ["form-control coll"],
          collectionsStatus: ["collectionsStatus", "move"]
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
                      status: ["Coll-exists"],
                      statusColl: ["form-control coll", "error"],
                      collectionsStatus: ["collectionsStatus", "move", "err"]
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
                      collectionsStatus: ["collectionsStatus", "move", "err"]
                    })
                  }
                });
            }else {
                this.setState({
                    status: ["Short-Topic"],
                    statusTopic: ["form-control coll", "error"],
                    collectionsStatus: ["collectionsStatus", "move", "err"]
                  })
            } 
          } else {
              this.setState({
                status: ["Incorect-Descrip"],
                statusDescrip: ["form-control coll", "error"],
                collectionsStatus: ["collectionsStatus", "move", "err"]
              })
            }
          }
        else {
          this.setState({
            status: ["Incorect-CollName"],
            statusColl: ["form-control coll", "error"],
            collectionsStatus: ["collectionsStatus", "move", "err"]
          })
      
        }
    }

    isCollectionsExists () {
      const user = {
        owner: this.props.authorized
      }
      axios.post('https://tapeghadkpserver.herokuapp.com/collections/owner', user).then(res => {
            this.setState({
                collections: res.data,
                key: false
            })
        })
    }

    deleteCollection(collname) {
      const collection = {
        collname: collname
      }
      
      axios.post('https://tapeghadkpserver.herokuapp.com/collections/delete', collection).then(res => {
          if (res.data==="Ok") this.isCollectionsExists()
          else {
            this.isCollectionsExists()
          } 
        })
    }

      
    
    render () {
        return (
        <div className="personalA-page">
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
                </div>
                
                
                }

            </div>
        </div>)
    }
}

export default PersonalAPage