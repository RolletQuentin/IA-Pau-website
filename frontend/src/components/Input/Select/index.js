import React, { useState } from "react";

const Select = ({
    value = "",
    setValue = null,
    name = "",
    emptyField = [],
    setEmptyField,
    style,
    options,
    className,
    placeholder="filière"
}) => {

    const [defaultValue, setDefaultValue] = useState(value);
    
    const removeClassError = (name) => {
        if (setEmptyField) {
            setEmptyField(emptyField.filter((f) => f !== name))
        }
    }

    return (
        
        <select
            className={className + " inputTextDefault"}
            style={{
                borderRadius: "10px",
                backgroundColor:" var(--primary)",
                padding: "10px",
                marginBottom: "20px",
                border: emptyField.includes(name) ? 'solid 2px var(--error)' : 'none',
                ...style,
            }}
            onChange={(e) => setValue !== null ? setValue(e.target.value) : setDefaultValue(e.target.value)}
            value={setValue !== null ? value : defaultValue}
            onClick={() => removeClassError(name)}
        >
            <option value='' hidden disabled>{placeholder}</option>
            {options && options.map((opt, index) => (
                <option key={index} value={opt}>{opt}</option>
            ))}
        </select>
    )
}

export default Select;