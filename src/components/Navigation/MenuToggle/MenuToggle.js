import React from "react"
import "./MenuToggle.css"

const MenuToggle = props => {
    const cls = [
        "MenuToggle",
        "fa"
    ]

    if (props.isOpen) {
        cls.push("fa-times")
        cls.push("open")
    } else {
        cls.push("fa-bars")
    }

    return (
        <i
            className={cls.join(" ")}
            onClick={props.onMenuToggle}
        />
    )
}

export default MenuToggle