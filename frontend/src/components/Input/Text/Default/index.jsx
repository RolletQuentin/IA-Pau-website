import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    border-radius: 10px;
    background-color: var(--primary);
    padding: 10px;
    border: none;
`;

const InputTextDefault = ({
    placeholder = "this is a default placeholder",
    style,
    type = "text",
    value = "",
    setValue = null,
    name = "",
    emptyField = [],
    setEmptyField,
}) => {
    const [defaultValue, setDefaultValue] = useState(value);

    const removeClassError = (name) => {
        if (setEmptyField) {
            setEmptyField(emptyField.filter((f) => f !== name))
        }
    }

    useEffect(() => {
        console.log(emptyField.includes(name))
    }, [emptyField])

    return (
        <StyledInput
            className={"inputTextDefault"}
            type={type}
            style={{
                ...style,
                color: emptyField.includes(name) ? 'var(--error)' : 'inherit'
            }}
            placeholder={placeholder}
            onChange={(e) => setValue !== null ? setValue(e.target.value) : setDefaultValue(e.target.value)}
            value={setValue !== null ? value : defaultValue}
            onClick={() => removeClassError(name)}
        ></StyledInput>
    );
};

export default InputTextDefault;
