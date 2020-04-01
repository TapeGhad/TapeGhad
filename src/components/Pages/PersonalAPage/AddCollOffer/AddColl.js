import React from "react"

const AddColl = props => {
    const cls = ["coll-list"]
    cls.push(props.onClassClose)

    return (
        <div className={cls.join(" ")}>
            <h1 style={{marginTop:"10px", textShadow: "5px 5px 15px black"}}>Collections list is empty.<br/> Create your first one:</h1>
            <button type="button" className="btn btn-success" onClick={props.onAddColl}>Add</button>
        </div>
)}

export default AddColl