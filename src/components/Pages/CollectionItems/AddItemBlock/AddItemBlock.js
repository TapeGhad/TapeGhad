import React from "react"
import Warning from "../../MenuBlock/Warning/Warning"
import Input from "../../MenuBlock/Input/Input"

const AddItemBlock = props => (
    <div className={props.addItemCont}> 
                                <div className={props.addItemBlock}>
                                    <h2>New Item:</h2>
                                    {props.ItemStatus.includes("Successfully") ? 
                                    <Warning status="Successfully" word="Item successfully created"/>
                                    :props.ItemStatus.includes("Short-Item") ? 
                                    <Warning status="Invalid-data" word="Item name is too short (3-15 symbols)"/>
                                    :props.ItemStatus.includes("No-Tags") ?
                                    <Warning status="Invalid-data" word="You must choose 1-5 tags"/>
                                    :props.ItemStatus.includes("Long-Tag") ?
                                    <Warning status="Invalid-data" word="Max length of one tag is 10 symbols"/>
                                    :props.ItemStatus.includes("Item-exists") ?
                                    <Warning status="Invalid-data" word="Item with such name in this collection already exists"/>
                                    : null}
                                        <Input    
                                            name="Name: "
                                            nameCl={props.statusItem.join(" ")}
                                            defaultValue={props.nameItem}
                                            onChangeHandler={props.onChangeItemName}
                                            onFocusHandler={props.onFocusField}
                                        />
                                        <div className="form-group">
                                            <label htmlFor="TagsSelect">Tags</label>
                                            <div className="tags-input">
                                                {props.AddedTags()}
                                                <div className="tag-block-add">
                                                    <i className="fa fa-check tags" onClick={props.onAddButtonTags}/>
                                                </div>
                                                <input 
                                                    className={props.statusTags.join(" ")} 
                                                    list="TagsSelect" 
                                                    onChange={props.onChangeTags}
                                                    onFocus={props.onFocusField}
                                                    value={props.currTag}
                                                    placeholder="Tags"
                                                    style={{border:"none", minWidth:"100px"}}>
                                                </input>  
                                            </div>
                                            <datalist id="TagsSelect">
                                                    {props.TagsList()} 
                                            </datalist>
                                        </div>
                                        <div className="buttons">
                                            <button type="button" className="btn btn-success" onClick={props.onAddItemHandler}>Create</button> 
                                            <button type="button" className="btn btn-primary" onClick={props.onAddClickHandler}>Back</button> 
                                        </div>
                                                    
                                    </div>
                            </div>
)

export default AddItemBlock