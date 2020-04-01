import React from 'react';

const Warning = props => (
    <div className={props.status} style={{height: "fit-content"}}>
             {props.word}
    </div>
)

export default Warning