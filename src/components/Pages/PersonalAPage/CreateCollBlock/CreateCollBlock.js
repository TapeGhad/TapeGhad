import React from "react"
import Input from "../../MenuBlock/Input/Input"
import Warning from "../../MenuBlock/Warning/Warning"

const CreateCollBlock = props => (
    <div className={props.CreateContName}> 
        <div className={props.CreateBlockName}>
            <h2>New Collection:</h2>
               {props.status.includes("Successfully") ? 
               <Warning status="Successfully" word="Collection successfully created"/>
               :props.status.includes("Short-Topic") ? 
               <Warning status="Invalid-data" word="Choose a topic"/>
               :props.status.includes("Incorect-Descrip") ?
               <Warning status="Invalid-data" word="Description is wrong (5-30 symbols)"/>
                :props.status.includes("Incorect-CollName") ?
                <Warning status="Invalid-data" word="Collection name is wrong (3-15 symbols)"/>
                :props.status.includes("Coll-exists") ?
                <Warning status="Invalid-data" word="Collection with such name already exists"/>
                : null}
                <Input    
                    name="Name: "
                    nameCl={props.statusColl.join(" ")}
                    defaultValue={props.nameColl}
                    onChangeHandler={props.onChangeCollName}
                    onFocusHandler={props.onFocusField}
                />
                <Input    
                    name="Description: "
                    nameCl={props.statusDescrip.join(" ")}
                    defaultValue={props.nameDescrip}
                    onChangeHandler={props.onChangeDescription}
                    onFocusHandler={props.onFocusField}
                />
                <div className="form-group">
                    <label htmlFor="TopicSelect">Topic</label>
                    <select className={props.statusTopic.join(" ")} id="TopicSelect" onChange={props.onChangeTopic} required>
                        <option ></option>
                        {props.TopicsList()}
                    </select>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-success" onClick={props.onCreateCollection}>Create</button> 
                    <button type="button" className="btn btn-primary" onClick={props.onAddClickHandler}>Back</button> 
                </div>
                            
            </div>
        </div>
)

export default CreateCollBlock