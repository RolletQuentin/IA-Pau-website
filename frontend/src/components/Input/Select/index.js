import React, { useState } from "react";

const Select = ({
    value = "",
    setValue = null,
    name = "",
    emptyField = [],
    setEmptyField,
    style,
    children,
}) => {

    const [defaultValue, setDefaultValue] = useState(value);
    
    const removeClassError = (name) => {
        if (setEmptyField) {
            setEmptyField(emptyField.filter((f) => f !== name))
        }
    }

    return (
        <select
            className={"inputTextDefault"}
            style={{
                ...style,
                border: emptyField.includes(name) ? 'solid 2px var(--error)' : 'none'
            }}
            onChange={(e) => setValue !== null ? setValue(e.target.value) : setDefaultValue(e.target.value)}
            value={setValue !== null ? value : defaultValue}
            onClick={() => removeClassError(name)}
        >
            {children}
        </select>
    )
}

export default Select;