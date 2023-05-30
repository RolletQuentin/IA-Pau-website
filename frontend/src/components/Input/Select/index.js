import React, { useState } from "react";

const Select = ({
    value = "",
    setValue = null,
    name = "",
    emptyField = [],
    setEmptyField,
    style,
    options,
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
                borderRadius: "10px",
                backgroundColor:" var(--primary)",
                padding: "10px",
                marginBottom: "20px",
                border: emptyField.includes(name) ? 'solid 2px var(--error)' : 'none'
            }}
            onChange={(e) => setValue !== null ? setValue(e.target.value) : setDefaultValue(e.target.value)}
            value={setValue !== null ? value : defaultValue}
            onClick={() => removeClassError(name)}
        >
            <option value='' hidden disabled>filière</option>
            {options && options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    )
}

export default Select;