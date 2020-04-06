import React from "react"
import Warning from "../../MenuBlock/Warning/Warning"

const CollectionHeader = props => (
    <>
    <div className="collection-header">
                        <div>
                            {!props.editColl 
                            ?
                            <>
                                {props.status.includes("Successfully") ? 
                                <Warning status="Successfully" word="Collection successfully updated"/>:null}
                                <h1 style={{textShadow: "5px 5px 15px black"}}>Collection: {props.nameColl} 
                                    {props.authorized===props.owner 
                                    ?<i className="fa fa-edit edit-toggle" onClick={props.onEditCollHandler}></i>
                                    :props.authorized==="admin" ||props.statusAccess ===2
                                    ?<i className="fa fa-edit edit-toggle" onClick={props.onEditCollHandler}></i>
                                    :null}
                                </h1>
                                <h2 style={{color:"rgb(194, 255, 145)",textShadow: "3px 3px 15px black"}}>Topic: {props.topic}</h2>
                                <h4 style={{color:"rgb(194, 255, 145)",textShadow: "3px 3px 15px black"}}>Description: {props.description}</h4>
                                <h5 style={{color:"rgb(194, 255, 145)",textShadow: "3px 3px 15px black"}}>Items: {props.amountItems}</h5>

                            </>
                            :
                            <>
                                {props.status.includes("Successfully") ? 
                                <Warning status="Successfully" word="Collection successfully updated"/>
                                :props.status.includes("Short-Topic") ? 
                                <Warning status="Invalid-data" word="Choose a topic"/>
                                :props.status.includes("Incorect-Descrip") ?
                                <Warning status="Invalid-data" word="Description is wrong (5-30 symbols)"/>
                                :props.status.includes("Incorect-CollName") ?
                                <Warning status="Invalid-data" word="Collection name is wrong (3-15 symbols)"/>
                                :props.status.includes("Coll-exists") ?
                                <Warning status="Invalid-data" word="Collection with such name already exists"/>
                                : null}
                                <div className="name-redacting" >
                                    <h1 style={{marginRight: "5px"}}>Collection: </h1>
                                    <input type="text" className={props.statusColl.join(" ")}  defaultValue={props.nameColl} onChange={props.onChangeCollName} onFocus={props.onFocusField}/>
                                    <div style={{display:"flex", flexDirection: "row"}}>
                                        <i className="fa fa-check check-toggle" onClick={props.onEditCollHandler}/>
                                        <i className="fa fa-times times-toggle" onClick={props.onEditCloseHandler}/>
                                    </div>
                                </div>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <h2 style={{color:"rgb(194, 255, 145)",textShadow: "3px 3px 15px black"}}>Topic:</h2>
                                    <select className={props.statusTopic.join(" ")} id="TopicSelect" onChange={props.onChangeTopic} defaultValue={props.topic} required>
                                        <option ></option>
                                        {props.TopicsList()}
                                    </select>
                                </div>
                                <div className="descrip-redacting" >
                                    <h4 style={{color:"rgb(194, 255, 145)",textShadow: "3px 3px 15px black"}}>Description:</h4>
                                    <input type="text" className={props.statusDescrip.join(" ")}  defaultValue={props.description} onChange={props.onChangeDescription} onFocus={props.onFocusField}/>
                                </div>
                            </>
                            }
                        </div>
                        <div className="collection-status">
                            {props.authorized===props.owner 
                            ? <h2 style={{color: "rgb(71, 230, 71)", textDecoration: "underline",textShadow: "3px 3px 15px black"}}>It's your collection</h2>
                            : props.authorized==="admin" ||props.statusAccess ===2
                            ?<h2 style={{color: "rgb(71, 230, 71)", textDecoration: "underline",textShadow: "3px 3px 15px black"}}>Admin Access</h2>
                            :<h2 style={{color: "rgb(255, 56, 56)", textDecoration: "underline",textShadow: "3px 3px 15px black"}}>It's not your collection</h2>
                            }
                        </div>
                    </div>
                    <hr align="center" width="80%"  size="1" color="#fff"/>
                    
                    <div className="item-tool-bar">
                        <div className="buttons-tool-bar">
                            <div style={{display:"flex", flexDirection:"row"}}>
                                <i className="fa fa-sort"></i>
                                                    <select className="sort-select" onChange={props.onChangeSort}>
                                                        <option >New->Old</option>
                                                        <option >A->Z</option> 
                                                        <option >Z->A</option>  
                                                        <option >Old->New</option> 
                                                    </select>
                                
                            </div>
                        </div>
                        <div className="search-tool-bar">
                            <i className="fa fa-search"></i>
                            <input 
                                className="form-control" 
                                placeholder="Search"
                                onChange={props.onChangeSearch}
                                value={props.currSearch}
                                style={{border:"none", minWidth:"50px", maxWidth: '175px', marginTop:"3px"}}>
                            </input>  
                        </div>
                        <div className="block-tags-filtr" >
                            <i className="fa fa-filter"></i>
                            <div className="form-group" style={{marginBottom: "0"}}>
                                                <div className="tags-input filtr" >
                                                    {props.AddedTags()}
                                                    <input 
                                                        className="form-control" 
                                                        list="TagsSelect" 
                                                        placeholder="Tags here..."
                                                        onChange={props.onChangeTags}
                                                        value={props.currTag}
                                                        style={{border:"none", minWidth:"50px", maxWidth: '175px'}}>
                                                    </input>  
                                                </div>
                                                <datalist id="TagsSelect">
                                                        {props.TagsList()} 
                                                </datalist>
                                            
                            </div>
                        </div>

                    </div>
                    <hr align="center" width="80%"  size="1" color="#fff" />
                   
        </>
)

export default CollectionHeader