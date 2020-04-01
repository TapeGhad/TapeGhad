import React, { Component} from 'react';
import axios from "axios";
import "react-router-dom";
import "./CollectionItems.css"
import { Redirect } from 'react-router-dom';
import CollectionHeader from './CollectionHeader/CollectionHeader';
import AddItemBlock from './AddItemBlock/AddItemBlock';
import Warning from "../MenuBlock/Warning/Warning"


class CollectionItems extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.onEditCollHandler = this.onEditCollHandler.bind(this);
        this.onEditItemHandler = this.onEditItemHandler.bind(this);
        this.onEditCloseHandler = this.onEditCloseHandler.bind(this);
        this.onChangeEditItemName = this.onChangeEditItemName.bind(this);
        this.onEditItemCloseHandler = this.onEditItemCloseHandler.bind(this);
        this.onFocusField = this.onFocusField.bind(this);
        this.onChangeCollName = this.onChangeCollName.bind(this);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onChangeFiltrTags = this.onChangeFiltrTags.bind(this);
        this.onChangeItemTags = this.onChangeItemTags.bind(this);
        this.onChangeCommentItem = this.onChangeCommentItem.bind(this);
        this.TopicsList = this.TopicsList.bind(this);
        this.TagsList = this.TagsList.bind(this);
        this.onAddClickHandler = this.onAddClickHandler.bind(this);
        this.isItemsExists = this.isItemsExists.bind(this);
        this.AddedTags = this.AddedTags.bind(this);
        this.AddedTagsFiltr = this.AddedTagsFiltr.bind(this);
        this.AddedCurrItemTags = this.AddedCurrItemTags.bind(this);
        this.onAddButtonTags = this.onAddButtonTags.bind(this);
        this.onAddButtonFiltrTags = this.onAddButtonFiltrTags.bind(this);
        this.onAddButtonItemTags = this.onAddButtonItemTags.bind(this);
        this.onAddItemHandler = this.onAddItemHandler.bind(this);
        this.ItemsList = this.ItemsList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.removeItemTag = this.removeItemTag.bind(this);
        this.AddedCurrItemName = this.AddedCurrItemName.bind(this);
        this.Pagination = this.Pagination.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onLikeItem = this.onLikeItem.bind(this);
        this.onOpenCommentItem = this.onOpenCommentItem.bind(this);
        this.onCloseCommentItem = this.onCloseCommentItem.bind(this);
        this.onCreateComment = this.onCreateComment.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
   

        this.state = {
            amountItems: 0,
            counter: 1,
            update: false,
            currPage: 1,
            itemsPerPage: 5,
            pages: 0,
            addClicked: false,
            goto: '',
            key: true,
            authorized: this.props.authorized,
            owner: '',
            nameColl: '',
            items: [],
            checkItems: [],
            nameItem: '',
            nameTags: [],
            nameFiltrTags: [],
            description: '',
            topic: '',
            topics: [],
            tags: [],
            currTag: '',
            currFiltrTag: '',
            currSort: "New->Old",
            editnameColl: '',
            editnameDescrip: '',
            editnameTopic: '',
            ItemStatus: [],
            ILM: ["items-list-status"],
            pagination: ["pagination"],
            statusItem: ["form-control"],
            statusTags: ["form-control"],
            status:[],
            statusColl: ["form-control"],
            statusDescrip: ["form-control"],
            statusTopic:["form-control"],
            redirect: "0",
            editColl: false,
            editItem: false,
            commentItem: false,
            commentNameItem: "",
            currComentItem: '',
            editItemIcon: ["fa fa-edit edit-toggle-item"],
            editNameItem: '',
            currItemTags: [],
            ItemEditStatus: [],
            statusItemName: ["form-control"],
            statusItemTags: ["form-control"],
            currEditItemTag: "",
            nameEditItem: "-!+56",
            currSearch: "",
            searchKey: true
        }
      }

    onAddClickHandler() {
        axios.get('http://localhost:5000/tags').then(res => {
            this.setState({
                tags: res.data
            })
       })

        const coll = this.state.addClicked ? ["collectionsStatus"] : ["collectionsStatus", "move"]
        const item = this.state.addClicked ? ["items-list-status"] : ["items-list-status", "move"]
        const pagination = this.state.addClicked ? ["pagination"] : ["pagination", "move"] 
        this.setState({
            
            addClicked: !this.state.addClicked,
            nameItem: '',
            nameTags: [],
            ItemStatus: coll,
            status:[],
            statusItem: ["form-control"],
            statusTags: ["form-control"],
            ILM: item,
            pagination: pagination
        })
      }

    onLikeItem(name) {
        const user = {
            username: this.state.authorized,
            nameItem: name,
            nameColl: this.state.nameColl
        }
        axios.post('http://localhost:5000/items/like', user).then(res => {
            if (res.data) {this.isItemsExists();}
            else this.isItemsExists();
       })
       
    }

    onAddItemHandler() {
        if (this.state.nameItem.length>=3 && this.state.nameColl.length<=15) {
            if (this.state.nameTags.length >= 1 && this.state.nameTags.length <= 5) {
              const item = {
                nameColl: this.state.nameColl,
                name: this.state.nameItem,
                tags: this.state.nameTags
              }
              axios.post('http://localhost:5000/items/add', item)
                .then(res => {
                  if (res.data==="Item already exists") {
                    this.setState({
                      ItemStatus: ["Item-exists"],
                      statusItem: ["form-control", "error"],
                      ILM: ["items-list-status", "move", "err"],
                      pagination: ["pagination", "move", "err"]
                    })
                  }
                  if (res.data==="Item added succesfully.") {
                    this.isItemsExists()


                    axios.get('http://localhost:5000/tags').then(res => {
                            this.setState({
                                tags: res.data
                            })
                    })
                    this.setState({
                    nameItem: '',
                    nameTags: [],
                   
                    statusItem: ["form-control"],
                    statusTags: ["form-control"],
                    ItemStatus: ["Successfully"],
                    ILM: ["items-list-status", "move", "err"],
                    pagination: ["pagination", "move", "err"]
                    })
                    this.componentDidMount();
                  }
                });
           
          } else {
              this.setState({
                ItemStatus: ["No-Tags"],
                statusTags: ["form-control", "error"],
                ILM: ["items-list-status", "move", "err"],
                pagination: ["pagination", "move", "err"]
              })
            }
          }
        else {
          this.setState({
            ItemStatus: ["Short-Item"],
            statusItem: ["form-control", "error"],
            ILM: ["items-list-status", "move", "err"],
            pagination: ["pagination", "move", "err"]
          })
      
        }
    }

    onEditCollHandler (e) {
        e.preventDefault();
        if (this.state.editColl) {
            
            
            if (this.state.editnameColl.length>=3 && this.state.editnameColl.length<=15) {
                if (this.state.editnameDescrip.length >= 5 && this.state.editnameDescrip.length <= 30) {
                 if (this.state.editnameTopic.length >= 2) {
                     if (this.state.editnameColl===this.state.nameColl && this.state.editnameDescrip===this.state.description && this.state.editnameTopic===this.state.topic) {
                        this.setState({
                            editColl: !this.state.editColl,
                            status: []
                        })
                    }
                    else {
                    const collection = {
                        oldnameColl: this.state.nameColl,
                        newnameColl: this.state.editnameColl,
                        description: this.state.editnameDescrip,
                        topic: this.state.editnameTopic
                      }
                      axios.post('http://localhost:5000/collections/update', collection)
                        .then(res => {
                            if (res.data==="Collection already exists") {
                                this.setState({
                                  status: ["Coll-exists"],
                                  statusColl: ["form-control", "error"]
                                })
                              }
                            if (res.data==="Collection updated succesfully.") {
                                if (this.state.nameColl!==this.state.editnameColl) {
                                    this.setState({
                                        goto: "on"

                                    })
                                }
                                this.setState({
                                    editColl: !this.state.editColl,
                                    status: ["Successfully"],
                                })
                                this.componentDidMount();
                            }
                        });
                    }
                }else {
                    this.setState({
                        status: ["Short-Topic"],
                        statusTopic: ["form-control coll", "error"]
                      })
                } 
              } else {
                  this.setState({
                    status: ["Incorect-Descrip"],
                    statusDescrip: ["form-control coll", "error"]
                  })
                }
              }
            else {
              this.setState({
                status: ["Incorect-CollName"],
                statusColl: ["form-control coll", "error"]
              })
          
            }
        
        }
        else {
            this.setState({
            editColl: !this.state.editColl
        })}
      }

    onEditCloseHandler(e) {
        e.preventDefault();
        this.setState({
            editColl: !this.state.editColl,
            editnameColl: this.state.nameColl,
            editnameDescrip: this.state.description,
            editnameTopic: this.state.topic,
            statusColl: ["form-control"],
            statusDescrip: ["form-control"],
            statusTopic: ["form-control"],
            status: [],
        
        })
    }

    onEditItemCloseHandler() {
        this.setState({
            editNameItem: '',
            editItemIcon: ["fa fa-edit edit-toggle-item"],
            editItem: false,
            currItemTags: [],
            currEditItemTag: "",
            statusItemName: ["form-control"],
            statusItemTags: ["form-control"],
            nameEditItem: "-!+56",
            ItemEditStatus: []
        })
    }

    onChangeCollName(e) {
        this.setState({
          editnameColl: e.target.value
        })
      }

    onChangeDescription(e) {
        this.setState({
            editnameDescrip: e.target.value
        })
      }

    onChangeTopic(e) {
        this.setState({
            editnameTopic: e.target.value,
            statusTopic: ["form-control"],
            status: []
        })
      }

    onChangeSearch(e) {
        this.setState({
            currSearch: e.target.value
        })
      }

    onChangeItemName(e) {
        this.setState({
            nameItem: e.target.value
        })
    }

    onChangeCommentItem(e) {
        this.setState({
            currComentItem: e.target.value
        })
    }

    onChangeEditItemName(e) {
        this.setState({
            nameEditItem: e.target.value
        })
    }

    onChangeTags(e) {
        this.setState({
            currTag: e.target.value
        })
        if (this.state.nameTags.length<5){ 
        this.state.tags.forEach((tag) =>{
            if (tag.name===e.target.value) {
             let check=true;
             this.state.nameTags.forEach((tag) =>{
                 if (tag===e.target.value) check=false;
             })
             if (check) {
             const currTags = this.state.nameTags;
             currTags.push(e.target.value)
             this.setState({
                 nameTags: currTags,
                 currTag: ''
             })}
            return;}
        
        })
    }else {}
        
    }

    onChangeFiltrTags(e) {
        this.setState({
            currFiltrTag: e.target.value
        })
        if (this.state.nameFiltrTags.length<5){ 
        this.state.tags.forEach((tag) =>{
            if (tag.name===e.target.value) {
             let check=true;
             this.state.nameFiltrTags.forEach((tag) =>{
                 if (tag===e.target.value) check=false;
             })
             if (check) {
             const currTags = this.state.nameFiltrTags;
             currTags.push(e.target.value)
             this.setState({
                 nameFiltrTags: currTags,
                 currFiltrTag: ''
             })}
            return;}
        
        })
    } else {}
        
    }

    onChangeItemTags(e) {
        this.setState({
            currEditItemTag: e.target.value
        })
        if (this.state.currItemTags.length<5){ 
        this.state.tags.forEach((tag) =>{
            if (tag.name===e.target.value) {
             let check=true;
             this.state.currItemTags.forEach((tag) =>{
                 if (tag===e.target.value) check=false;
             })
             if (check) {
             const currTags = this.state.currItemTags;
             currTags.push(e.target.value)
             this.setState({
                 currItemTags: currTags,
                 currEditItemTag: ''
             })}
            return;}
        
        })
    }else {}
        
    }

    onChangeSort(e) {
        this.setState({
            currSort: e.target.value
        })
    }

    onAddButtonTags(Tag) {
        if (Tag.length===0) {}
        else if (Tag.length>10) {
            this.setState({
                ItemStatus: ["Long-Tag"],
                statusTags: ["form-control", "error"],
                ILM: ["items-list-status", "move", "err"],
                pagination: ["pagination", "move", "err"]
              })
        }
        else if (this.state.nameTags.length<5) {
        this.setState({
            currTag: ''
        })
        this.state.tags.forEach((tag) =>{
            
             let check=true;
             this.state.nameTags.forEach((tag) =>{
                 if (tag===Tag) check=false;
                 
             })
             if (check) {
                
                const currTags = this.state.nameTags;
                currTags.push(Tag)
                this.setState({
                    nameTags: currTags,
                    currTag: ''
                })
            }}
        
        )
    } else {}
    }

    onAddButtonFiltrTags(Tag) {
        if (Tag.length===0) {}
        
        else if (this.state.nameTags.length<5) {
        this.setState({
            currFiltrTag: ''
        })
        this.state.tags.forEach((tag) =>{
            
             let check=true;
             this.state.nameFiltrTags.forEach((tag) =>{
                 if (tag===Tag) check=false;
                 
             })
             if (check) {
                
                const currFiltrTags = this.state.nameFiltrTags;
                currFiltrTags.push(Tag)
                this.setState({
                    nameFiltrTags: currFiltrTags,
                    currFiltrTag: ''
                })
            }}
        
        )
    } else {}
    }

    onAddButtonItemTags(Tag) {
        if (Tag.length===0) {}
        else if (Tag.length>10) {
            this.setState({
                ItemEditStatus: ["Long-Tag"],
                statusItemTags: ["form-control", "error"],
              })
        }
        else if (this.state.currItemTags.length<5) {
        this.setState({
            currEditItemTag: ''
        })
        this.state.tags.forEach((tag) =>{
            
             let check=true;
             this.state.currItemTags.forEach((tag) =>{
                 if (tag===Tag) check=false;
                 
             })
             if (check) {
                
                const currTags = this.state.currItemTags;
                currTags.push(Tag)
                this.setState({
                    currItemTags: currTags,
                    currEditItemTag: ''
                })
            }}
        
        )
    } else {}
    }

    onFocusField() {
        const ILM = this.state.addClicked ? ["items-list-status", "move"] : ["items-list-status"]
        const pagination = this.state.addClicked ? ["pagination", "move"] : ["pagination"]
        this.setState({
          status: [],
          ItemStatus: [],
          statusColl: ["form-control"],
          statusDescrip: ["form-control"],
          statusTopic: ["form-control"],
          statusItem: ["form-control"],
          statusTags: ["form-control"],
          ILM: ILM,
          pagination: pagination,
          ItemEditStatus: []
         
        })
      }

      onChangePage (page) {
          this.setState({
              currPage: page
          })
      }

    TopicsList() {
        return this.state.topics.map((topic, index) =>{
            return (<option key={index}>{topic.name}</option>)
        })
      }
    
    TagsList() {
        if (this.state.tags.length===0) {}
        else {
        return this.state.tags.map((tag, index) =>{
            return (<option key={index}>{tag.name}</option>)
        })
    }
      }

    AddedTags() {
        if (this.state.nameTags.length===0) {}
        else {
        return this.state.nameTags.map((tag, index) => {
            return ( 
            <div className="tag-block" key={index}>
                {tag}
                <i className="fa fa-times tags" onClick={this.removeTag.bind(this, tag)}/>
            </div>
        )
        })}
      }

    AddedTagsFiltr() {
        if (this.state.nameFiltrTags.length===0) {}
        else {
        return this.state.nameFiltrTags.map((tag, index) => {
            return ( 
            <div className="tag-block" key={index}>
                {tag}
                <i className="fa fa-times tags" onClick={this.removeFiltrTag.bind(this, tag)}/>
            </div>
        )
        })}
      }

    AddedCurrItemTags(Tags) {
        if (this.state.currItemTags.length===0) {
            this.setState({
                currItemTags: Tags
            })
        }
        return this.state.currItemTags.map((tag, index) => {
            return ( 
            <div className="tag-block" key={index}>
                {tag}
                <i className="fa fa-times tags" onClick={this.removeItemTag.bind(this, tag)}/>
            </div>
        )
        })

    }

    removeTag(Tag) {
        const newTags = this.state.nameTags.filter(tag => tag!==Tag)
        this.setState({
            nameTags: newTags
        })
    }

    removeFiltrTag(Tag) {
        const newTags = this.state.nameFiltrTags.filter(tag => tag!==Tag)
        this.setState({
            nameFiltrTags: newTags
        })
    }

    removeItemTag (Tag) {
        if (this.state.currItemTags.length!==1) {
            const newTags = this.state.currItemTags.filter(tag => tag!==Tag)
            this.setState({
                currItemTags: newTags
            })
        }
    }

    isItemsExists () {
        const collection = {
          nameColl: this.state.nameColl
        }
        axios.post('http://localhost:5000/items/owner', collection).then(res => {
            const pages = Math.ceil(res.data.length / this.state.itemsPerPage)
           
              this.setState({
                  items: res.data,
                  checkItems: res.data,
                  key: false,
                  pages: pages
              })
          })
      }

    AddedCurrItemName(name) {
        if (this.state.nameEditItem==="-!+56") {
            this.setState({
                nameEditItem: name
            })
        }
      }

    onOpenCommentItem(name) {
        this.setState({
            commentNameItem: name,
            commentItem: true
        })
    }

    onCloseCommentItem() {
        this.setState({
            commentNameItem: '',
            commentItem: false,
            currComentItem: ""
        })
    }

    onCreateComment() {
           
                if (this.state.currComentItem.length >= 3) {
                
                    const comment = {
                        author: this.state.authorized,
                        nameColl: this.state.nameColl,
                        nameItem: this.state.commentNameItem,
                        comment: this.state.currComentItem
                      }
                      axios.post('http://localhost:5000/items/add-comment', comment)
                        .then(res => {
                            if (res.data) {this.isItemsExists();}
                                this.isItemsExists();
                                this.setState({
                                    currComentItem: ''
                                })
                                this.componentDidMount();
                        });
                    
                }else {}
    }

    ItemsList () {
        let arrayI=[];
        arrayI=arrayI.concat(this.state.items);
        if (this.state.currSort==="New->Old") {}
        if (this.state.currSort==="A->Z") arrayI=arrayI.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          });
        if (this.state.currSort==="Z->A") arrayI=arrayI.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        if (this.state.currSort==="Old->New") {arrayI=arrayI.reverse()}
        const startSlice = this.state.currPage * (-1) *this.state.itemsPerPage ;
        if (this.state.currPage===1) arrayI = arrayI.slice(startSlice);
        else arrayI = arrayI.slice(startSlice, startSlice+5);
        return arrayI.map((item, index) =>{
            let filtr=[];
            if (this.state.nameFiltrTags.length!==0)
            {
                this.state.nameFiltrTags.forEach(checkTag => {
                    item.tags.forEach(itemTag => {
                        if (itemTag===checkTag) filtr.push("1");
                    })
                })
            }
            if (filtr.length===this.state.nameFiltrTags.length) {
            const itemBlock  = item.name===this.state.commentNameItem ? 'item-block open' : "item-block";
            let check=true;
            if (this.state.currSearch.length===0) {}
            else {
                for (let iter=0; iter < this.state.currSearch.length; iter ++) {
                    if (item.name[iter]!==this.state.currSearch[iter]) check=false;
                }
            }
            if (check) {
            return (
                <>
                   
                    {item.name===this.state.commentNameItem 
                    ?
                        <div className="comment-block" key={item.name}>
                            <div className="comments-block">
                                {item.comments.map((comment, index) => {
                                    return (
                                        <div className="comm-block" key={index}>
                                            <h3 style={{fontSize: "22px", textDecoration: "underline", color: "rgb(251, 223, 146)",textShadow: "3px 3px 15px black"}}>{comment.author} comments:</h3>
                                            <h4 style={{fontSize: "18px",color: "#fff",textShadow: "3px 3px 15px black"}}>{comment.comment}</h4>
                                        </div>
                                    )
                                })}
                            </div>
                            {this.state.authorized.length>=3
                            ?
                            <div className="create-comment">
                                <input type="text" className="form-control comment" placeholder="Comment here (3min)..." value={this.state.currComentItem} onChange={this.onChangeCommentItem} onFocus={this.onFocusField} style={{marginLeft: "15px"}}/>
                                <i className="fa fa-paper-plane" onClick={this.onCreateComment}></i>
                            </div>
                            : null}
                        </div>
                    : null}
                    
                    <div className={itemBlock} key={index}>
                        {this.state.editNameItem===item.name 
                            ?
                            <div style={{marginBottom: "10px"}}>
                                        {this.state.ItemEditStatus.includes("Successfully") ? 
                                        <Warning status="Successfully" word="Item successfully updated"/>
                                        :this.state.ItemEditStatus.includes("Short-Item") ? 
                                        <Warning status="Invalid-data" word="Item name is too short (3-15 symbols)"/>
                                        :this.state.ItemEditStatus.includes("No-Tags") ?
                                        <Warning status="Invalid-data" word="You must choose 1-5 tags"/>
                                        :this.state.ItemEditStatus.includes("Long-Tag") ?
                                        <Warning status="Invalid-data" word="Max length of one tag is 10 symbols"/>
                                        :this.state.ItemEditStatus.includes("Item-exists") ?
                                        <Warning status="Invalid-data" word="Item with such name in this collection already exists"/>
                                        : null}
                            </div>
                            : null}
                    <div style={{display: "flex", flexDirection:"row",justifyContent: "space-between"}}>
                    
                        <div style={{display:"flex", flexDirection:"row"}}>
                            {this.state.editNameItem===item.name 
                            ?
                            <>
                                {this.AddedCurrItemName(item.name)}
                                <input type="text" className="form-control"  value={this.state.nameEditItem} onChange={this.onChangeEditItemName} onFocus={this.onFocusField} style={{marginBottom: "15px"}}/>
                                <i className="fa fa-check check-toggle" onClick={this.onEditItemHandler.bind(this, item.name)}/>
                                <i className="fa fa-times times-toggle" onClick={this.onEditItemCloseHandler}/>
                            </>
                            :
                            <>
                                <h2 style={{cursor: "default",textShadow: "3px 3px 15px black"}}>{item.name}</h2>
                                {this.state.owner===this.state.authorized
                                    ? this.state.editItemIcon.join(" ")==="fa fa-edit edit-toggle-item" 
                                        ?<i className={this.state.editItemIcon.join(" ")} style={{fontSize: "35px"}} onClick={this.onEditItemHandler.bind(this, item.name)}></i> 
                                        :<i className={this.state.editItemIcon.join(" ")} style={{fontSize: "35px"}}></i> 
                                :this.state.authorized==="admin"
                                    ? this.state.editItemIcon.join(" ")==="fa fa-edit edit-toggle-item" 
                                    ?<i className={this.state.editItemIcon.join(" ")} style={{fontSize: "35px"}} onClick={this.onEditItemHandler.bind(this, item.name)}></i> 
                                    :<i className={this.state.editItemIcon.join(" ")} style={{fontSize: "35px"}}></i> 
                                :null }
                            </>
                            }
                            
                        </div>
                        {this.props.authorized===this.state.owner ?
                        this.state.editNameItem===item.name 
                        ? null
                        : <button type="button" className="deleteItem" onClick={this.deleteItem.bind(this, item.name)}>×</button>
                        :this.props.authorized==="admin"
                        ?this.state.editNameItem===item.name 
                            ? null
                            : <button type="button" className="deleteItem" onClick={this.deleteItem.bind(this, item.name)}>×</button>
                        :null}
                    </div>
                    <h4 style={{textShadow: "3px 3px 15px black"}}>Tags:</h4>
                    <div style={{display:"flex", flexDirection:"row"}}>
                    {this.state.editNameItem===item.name 
                            ?   <>
                                <div className="tags-input">
                                    {this.AddedCurrItemTags(item.tags)}
                                    <div className="tag-block-add">
                                        <i className="fa fa-check tags" onClick={this.onAddButtonItemTags.bind(this, this.state.currEditItemTag)}/>
                                    </div> 
                                    <input 
                                        className={this.state.statusTags.join(" ")} 
                                        list="TagsSelect" 
                                        onChange={this.onChangeItemTags}
                                        onFocus={this.onFocusField}
                                        value={this.state.currEditItemTag}
                                        style={{border:"none", minWidth:"100px"}}>
                                    </input>  
                                </div>
                                <datalist id="TagsSelect">
                                        {this.TagsList()} 
                                </datalist>
                                </>
                            :  
                            <div style={{display:"flex", flexDirection: "row",width: "100%", justifyContent: "space-between"}}>    
                                <div style={{display:"flex", flexDirection: "row"}}>
                                    {item.tags.map((tag, index1) => {
                                    return (
                                            <div className="tag-block" key={index1} style={{width: "fit-content", fontSize:"20px", fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"}}>
                                                {tag}
                                            </div>)
                                })}
                                </div>
                                <div style={{display:"flex", alignItems: "center"}}>
                                    {this.state.commentItem 
                                    ? 
                                    <>
                                        {item.name===this.state.commentNameItem 
                                        ?<i className="fa fa-arrow-circle-up" onClick={this.onCloseCommentItem}></i>
                                        : <i className="fa fa-arrow-circle-down disable"></i>
                                        }
                                    </>
                                    :  <i className="fa fa-arrow-circle-down" onClick={this.onOpenCommentItem.bind(this, item.name)}></i>
                                    }
                                    <h5 style={{marginRight: "7px", marginTop: "4px"}}>{item.likes.length}</h5>
                                    {this.state.authorized.length>=3 ?
                                    <>
                                    {item.likes.includes(this.state.authorized) 
                                    ? <i className="fa fa-heart liked" onClick={this.onLikeItem.bind(this, item.name)}></i>
                                    : <i className="fa fa-heart" onClick={this.onLikeItem.bind(this, item.name)}></i>}
                                    </>
                                    : <>
                                    {item.likes.includes(this.state.authorized) 
                                    ? <i className="fa fa-heart liked" ></i>
                                    : <i className="fa fa-heart" ></i>}
                                    </>}
                                </div>
                            </div>
                        }
                    </div> 
                    </div>
                </>
            
            )}
            else {
                return <div/>;
            }}
            else {
                return <div/>;
            }
        })
      }

    onEditItemHandler(nameItem) {
        this.setState({
            editNameItem: nameItem
        })
        if (this.state.editItem) {
            if (this.state.nameEditItem.length>=3 && this.state.nameEditItem.length<=15) {
                if (this.state.currItemTags.length >= 1 && this.state.currItemTags.length <= 5) {
              
                    
                  const item = {
                    nameColl: this.state.nameColl,
                    oldName: this.state.editNameItem,
                    newName: this.state.nameEditItem,
                    tags: this.state.currItemTags
                  }
                  axios.post('http://localhost:5000/items/update', item)
                    .then(res => {
                      if (res.data==="Item already exists") {
                        this.setState({
                          ItemEditStatus: ["Item-exists"],
                          statusItemName: ["form-control", "error"]
                        })
                      }
                      if (res.data==="Item updated succesfully.") {
                        this.onEditItemCloseHandler()
                        this.isItemsExists()
    
                        axios.get('http://localhost:5000/tags').then(res => {
                                this.setState({
                                    tags: res.data
                                })
                        })
                        this.setState({
                       
                        statusItemName: ["form-control"],
                        statusItemTags: ["form-control"],
                        ItemEditStatus: []
                        })
                        this.componentDidMount();
                      }
                    });
               
              } else {
                  this.setState({
                    ItemEditStatus: ["No-Tags"],
                    statusItemTags: ["form-control", "error"],
                    
                  })
                }
              }
            else {
              this.setState({
                ItemEditStatus: ["Short-Item"],
                statusItemName: ["form-control", "error"],
                
              })
          
            }
        }
        else {
            this.setState({
            editItem: !this.state.editItem,
            editItemIcon: ["fa fa-edit edit-toggle-item", "blocked"]
        })}

      }

    deleteItem(nameItem) {
        if (nameItem===this.state.commentNameItem) {
            this.setState({
                commentNameItem: '',
                commentItem: false,
                currComentItem: ''
            })
        }
        const item = {
            itemname: nameItem,
            nameColl: this.state.nameColl
          }
          
          axios.post('http://localhost:5000/items/delete', item).then(res => {
              if (res.data==="Ok") this.isItemsExists()
              else {
                this.isItemsExists();
                this.componentDidMount();
              } 
              this.componentDidMount();
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
    
    

    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:5000/tags').then(res => {
            this.setState({
                tags: res.data
            })
       })

       this.state.counter > 0 && setInterval(() => {
        this.isItemsExists();
    }, 3000);
       
        const { match: { params } } = this.props;
        if (this.state.searchKey) {
        this.setState({
            currSearch: params.item===undefined ? "" : params.item,
            searchKey: false
        })
        }

        const collection ={
            nameColl: params.name
        }

        axios.get('http://localhost:5000/topics').then(res => {
            this.setState({
                topics: res.data
            })
        })

       

        axios.post('http://localhost:5000/collections/info', collection).then(res => {
            if (res.data===null)
            {
                this.setState({
                    redirect: "1"
                })
            }
            else {
            this.setState({
                owner: res.data.owner,
                description: res.data.description,
                topic: res.data.topic,
                amountItems: res.data.items,
                nameColl: params.name,
                editnameColl: params.name,
                editnameDescrip: res.data.description,
                editnameTopic: res.data.topic,

                redirect: "00"
            })
        }
        })
      }

     componentWillUnmount() {
        this._isMounted = false;
      }

      
    

        render() { 

           return (
               <div className="collection-page" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {this.state.goto==="on" ? <Redirect exact to={`/collection/${this.state.editnameColl}`}  {...this.setState({goto: ""})}/> : null}
                {this.state.redirect==="1" ? <Redirect exact to="/"/> :
                    this.state.redirect==="00" ?
                    <>
                    {this.state.key ? this.isItemsExists() : null}
                     <CollectionHeader 
                        editColl={this.state.editColl}
                        status={this.state.status}
                        nameColl={this.state.nameColl}
                        authorized={this.props.authorized}
                        owner={this.state.owner}
                        onEditCollHandler = {this.onEditCollHandler}
                        topic={this.state.topic}
                        description={this.state.description}
                        statusColl={this.state.statusColl}
                        statusTopic={this.state.statusTopic}
                        statusDescrip={this.state.statusDescrip}
                        onChangeCollName={this.onChangeCollName}
                        onChangeTopic={this.onChangeTopic}
                        onChangeSort={this.onChangeSort}
                        onChangeDescription={this.onChangeDescription}
                        onFocusField={this.onFocusField}
                        onEditCloseHandler={this.onEditCloseHandler}
                        TopicsList={this.TopicsList}
                        AddedTags={this.AddedTagsFiltr}
                        onAddButtonTags={this.onAddButtonFiltrTags}
                        TagsList={this.TagsList}
                        onChangeTags={this.onChangeFiltrTags}
                        currTag={this.state.currFiltrTag}
                        amountItems={this.state.amountItems}
                        onChangeSearch={this.onChangeSearch}
                        currSearch={this.state.currSearch}
                     />
                    <div className="items-block">
                        {this.state.addClicked ? null 
                        :
                        this.state.authorized===this.state.owner 
                        ? <button type="button" className="btn btn-success exists" onClick={this.onAddClickHandler}>Add+</button> 
                        : this.state.authorized==="admin"
                        ? <button type="button" className="btn btn-success exists" onClick={this.onAddClickHandler}>Add+</button> 
                        :null}
                        
                        {!this.state.addClicked ?
                        <>
                            {this.state.items.length===0 
                            ? <div className="no-item-block">
                                    <h1 style={{marginTop:"10px"}}>No items yet.</h1>
                              </div>
                            :null}
                            <AddItemBlock 
                                addItemCont="add-item-cont closed"
                                addItemBlock="add-item-block closed"
                                ItemStatus={this.state.ItemStatus}
                                statusItem={this.state.statusItem}
                                nameItem={this.state.nameItem}
                                onChangeItemName={this.onChangeItemName}
                                onFocusField={this.onFocusField}
                                AddedTags={this.AddedTags}
                                onAddButtonTags={this.onAddButtonTags.bind(this, this.state.currTag)}
                                statusTags={this.state.statusTags}
                                onChangeTags={this.onChangeTags}
                                currTag={this.state.currTag}
                                TagsList={this.TagsList}
                                onAddItemHandler={this.onAddItemHandler}
                                onAddClickHandler={this.onAddClickHandler}
                            />
                            <div className={this.state.ILM.join(" ")}>
                                {this.ItemsList()}
                            </div>
                            <div className={this.state.pagination.join(" ")}>
                                {this.Pagination()}
                            </div>
                            
                        </>
                        :
                        <>
                            <div className="no-item-block closed">
                                <h1 style={{marginTop:"10px"}}>No items yet.</h1>
                            </div>
                            <AddItemBlock 
                                addItemCont="add-item-cont"
                                addItemBlock="add-item-block"
                                ItemStatus={this.state.ItemStatus}
                                statusItem={this.state.statusItem}
                                nameItem={this.state.nameItem}
                                onChangeItemName={this.onChangeItemName}
                                onFocusField={this.onFocusField}
                                AddedTags={this.AddedTags}
                                onAddButtonTags={this.onAddButtonTags.bind(this, this.state.currTag)}
                                statusTags={this.state.statusTags}
                                onChangeTags={this.onChangeTags}
                                currTag={this.state.currTag}
                                TagsList={this.TagsList}
                                onAddItemHandler={this.onAddItemHandler}
                                onAddClickHandler={this.onAddClickHandler}
                            />
                            <div className={this.state.ILM.join(" ")}>
                                {this.ItemsList()}
                            </div>
                            <div className={this.state.pagination.join(" ")}>
                                {this.Pagination()}
                            </div>
                        </>
                        }
                        
                    </div>
                    </>
                :null}
                </div>
           
           )
       } 
}



export default CollectionItems