import React, {Component} from 'react';
import "./MainPage.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

class MainPage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.CollectionList = this.CollectionList.bind(this);
        this.ItemsList = this.ItemsList.bind(this);
        this.isCollectionsExists = this.isCollectionsExists.bind(this);
        this.isItemsExists = this.isItemsExists.bind(this);
        this.PaginationColl = this.PaginationColl.bind(this);
        this.PaginationItems = this.PaginationItems.bind(this);
        this.onChangePageColl = this.onChangePageColl.bind(this);
        this.onChangePageItem = this.onChangePageItem.bind(this);
        this.onLikeItem = this.onLikeItem.bind(this);
        this.onOpenCommentItem = this.onOpenCommentItem.bind(this);
        this.onCloseCommentItem = this.onCloseCommentItem.bind(this);
        this.onChangeCommentItem = this.onChangeCommentItem.bind(this);
        this.onCreateComment = this.onCreateComment.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);


        this.state = {
            counter: 1,
            keyColl: true,
            keyItem: true,
            PerPage: 5,
            currPageColl: 1,
            currPageItem: 1,
            pagesColl: 0,
            pagesItems: 0,
            collections: [],
            items: [],
            commentNameItem: "",
            commentItem: false,
            currComentItem: ""
        }
      }

    isCollectionsExists () {
        axios.get('https://tapeghadkpserver.herokuapp.com/collections').then(res => {
             const pagesColl = Math.ceil(res.data.length / this.state.PerPage)
              this.setState({
                  collections: res.data,
                  pagesColl,
                  keyColl: false
              })
          })
    }

    isItemsExists () {
        axios.get('https://tapeghadkpserver.herokuapp.com/items').then(res => {
             const pagesItems = Math.ceil(res.data.length / this.state.PerPage)
              this.setState({
                  items: res.data,
                  pagesItems,
                  keyItem: false
              })
          })
    }

    CollectionList() {
        let array = [];
        array=array.concat(this.state.collections);
        array=array.sort(function (a, b) {
            if (a.items > b.items) {
              return -1;
            }
            if (a.items < b.items) {
              return 1;
            }
            return 0;
          });
        const startSlice = this.state.currPageColl *this.state.PerPage ;
        array = array.slice(startSlice-5, startSlice);
        return array.map((coll, index) =>{
          return (
              <div className="collection-block-main"key={index} >
                  <div className="info-coll-block-main">
                        <div style={{display: "flex", flexDirection:"row",justifyContent: "left"}}>
                            <Link to={`/collection/${coll.name}`} style={{textDecoration: "none", color: "#fff"}}>
                            <h2 >{coll.name}</h2>
                            </Link>
                            
                        </div>
                        <h4 style={{color: "rgb(251, 223, 146)"}}>Topic: {coll.topic}</h4>
                        <h4 style={{color: "rgb(251, 223, 146)"}}>{coll.description}</h4>
                        <h5 style={{color: "rgb(126, 208, 255)"}}>Items: {coll.items}</h5>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {this.props.authorized===coll.owner
                            ? <i className="fa fa-check check-main" title="Your Collection" style={{marginLeft: "20px"}}/>
                            :null}
                        {coll.topic==="Alcohol" 
                            ?<div className="topic-alcohol"></div>
                            : coll.topic==="Books" 
                            ?<div className="topic-books"></div>
                            : coll.topic==="Music" 
                            ?<div className="topic-music"></div>
                            :coll.topic==="Cars" 
                            ?<div className="topic-cars"></div>
                            :null } 
                        {this.props.authorized==="admin" 
                        ?
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <button type="button" className="delete-coll" onClick={this.deleteCollection.bind(this, coll.name)} styele={{marginTop: "auto"}}>×</button>
                        </div>
                        : null}
                    </div>
              </div>
          
          )
      })
    }

    ItemsList () {
        let array =[];
        array = array.concat(this.state.items)
        array = array.reverse();
        const startSlice = this.state.currPageItem *this.state.PerPage ;
        array = array.slice(startSlice-5, startSlice);
        return array.map((item, index) =>{
            const itemBlock  = item.name===this.state.commentNameItem ? 'item-block-main open' : "item-block-main";
            return (
                <>
                <div className={itemBlock} key={index}>
                    <div style={{display: "flex", flexDirection:"row",justifyContent: "space-between"}}>
                        <Link to={`/collection/${item.collectionName}/${item.name}`} style={{textDecoration: "none", color: "#fff"}}>
                            <h2 style={{cursor: "pointer", textShadow:"5px 5px 15px black"}} title={item.collectionName}>{item.name}</h2>
                        </Link>
                    </div>
                    <h4 style={{textShadow:"5px 5px 15px black"}}>Tags:</h4>
                    <div style={{display:"flex", flexDirection:"row"}}>
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
                                    {this.props.authorized.length>=3 ?
                                    <>
                                    {item.likes.includes(this.props.authorized) 
                                    ? <i className="fa fa-heart liked" onClick={this.onLikeItem.bind(this, item.name, item.collectionName)}></i>
                                    : <i className="fa fa-heart" onClick={this.onLikeItem.bind(this, item.name, item.collectionName)}></i>}
                                    </>
                                    : <>
                                    {item.likes.includes(this.props.authorized) 
                                    ? <i className="fa fa-heart liked" ></i>
                                    : <i className="fa fa-heart" ></i>}
                                    </>}
                                </div>
                            </div>
                    </div> 
                    </div>
                    {item.name===this.state.commentNameItem 
                    ?
                        <div className="comment-block-main" key={item.name}>
                            <div className="comments-block-main">
                                {item.comments.map((comment, index) => {
                                    return (
                                        <div className="comm-block-main" key={index}>
                                            <h3 style={{fontSize: "22px", textDecoration: "underline", color: "rgb(251, 223, 146)"}}>{comment.author} comments:</h3>
                                            <h4 style={{fontSize: "18px",color: "#fff"}}>{comment.comment}</h4>
                                        </div>
                                    )
                                })}
                            </div>
                            {this.props.authorized.length>=3
                            ?
                            <div className="create-comment">
                                <input type="text" className="form-control comment" placeholder="Comment here (3min)..." value={this.state.currComentItem} onChange={this.onChangeCommentItem}  style={{marginLeft: "15px"}}/>
                                <i className="fa fa-paper-plane" onClick={this.onCreateComment.bind(this, item.collectionName)}></i>
                            </div>
                            : null}
                        </div>
                    : null}
                </>
            )})
}

    onLikeItem(nameItem, nameColl) {
        const user = {
            username: this.props.authorized,
            nameItem,
            nameColl
        }
        axios.post('https://tapeghadkpserver.herokuapp.com/items/like', user).then(res => {
            if (res.data) {this.isItemsExists();}
            else this.isItemsExists();
   })
   
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

    onChangeCommentItem(e) {
        this.setState({
            currComentItem: e.target.value
        })
}

    onCreateComment(nameColl) {
        if (this.state.currComentItem.length >= 3) {
                
            const comment = {
                author: this.props.authorized,
                nameColl,
                nameItem: this.state.commentNameItem,
                comment: this.state.currComentItem
              }
              console.log(comment)
              axios.post('https://tapeghadkpserver.herokuapp.com/items/add-comment', comment)
                .then(res => {
                    if (res.data) {this.isItemsExists();}
                        this.isItemsExists();
                        this.setState({
                            currComentItem: ''
                        })
                });
            
        }else {}
}

    PaginationColl() {
        const pages = [];
        for(let page=1; page<=this.state.pagesColl; page++) {
            pages.push(page)
        }  
        return  pages.map((page, index) => {
                    return (
                        <div key={index}>
                            {this.state.currPageColl===page 
                            ?
                                <div className="page-active-main" key={index} onClick={this.onChangePageColl.bind(this, page)}>
                                    <h1>{page}</h1>
                                </div>
                            : 
                                <div className="page-main" key={index} onClick={this.onChangePageColl.bind(this, page)}>
                                    <h1>{page}</h1>
                                </div>
                            }
                        </div>
                    )})
    }

    PaginationItems() {
        const pages = [];
        for(let page=1; page<=this.state.pagesItems; page++) {
            pages.push(page)
        }  
        return  pages.map((page, index) => {
                    return (
                        <div key={index}>
                            {this.state.currPageItem===page 
                            ?
                                <div className="page-active-main" key={index} onClick={this.onChangePageItem.bind(this, page)}>
                                    <h1>{page}</h1>
                                </div>
                            : 
                                <div className="page-main" key={index} onClick={this.onChangePageItem.bind(this, page)}>
                                    <h1>{page}</h1>
                                </div>
                            }
                        </div>
                    )})
    }

    onChangePageColl(page) {
        this.setState({
            currPageColl: page
        })
    }

    onChangePageItem(page) {
        this.setState({
            currPageItem: page
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

    componentDidMount() {
        this._isMounted = true;
        this.state.counter > 0 && setInterval(() => {
            this.isItemsExists();
        }, 3000);
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

      render() { 
        return (
                <div className="main-page">
                    {this.state.keyColl ? this.isCollectionsExists() : null}
                    {this.state.keyItem ? this.isItemsExists() : null}

                    <div className="collections-block-main">
                        <h1 style={{color: '#fff', textShadow: "5px 10px 15px black"}}>Top Collections:</h1>
                        <hr align="center" width="100%"  size="1" color="#fff"/>
                        <div className="collections-list-main">
                            {this.CollectionList()}
                        </div>
                        <div className="pagination-coll-main">
                                {this.PaginationColl()}
                        </div>
                    </div>
                    <div className="items-block-main">
                        <h1 style={{color: '#fff', textShadow: "5px 10px 15px black"}}>New Items:</h1>
                        <hr align="center" width="100%"  size="1" color="#fff" />
                        <div className="items-list-main">
                            {this.ItemsList()}
                        </div>
                        <div className="pagination-coll-main">
                                {this.PaginationItems()}
                        </div>
                    </div>
                </div>
        )}
}

export default MainPage