import React from "react";

const InputTextDefault = ({
    placeholder="this is a default placeholder",
    style,
    type="text"
}) => {
    const styleInput = {
        borderRadius: "10px",
        backgroundColor: "var(--primary)",
        padding: "10px",
        border: "none",
        ...style
    }

    return (
        <input className="inputTextDefault" type={type} style={styleInput} placeholder={placeholder}>

        </input>
    )
}

export default InputTextDefault;