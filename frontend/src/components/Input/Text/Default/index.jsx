import React from "react";
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
}) => {
    return (
        <StyledInput
            className="inputTextDefault"
            type={type}
            style={style}
            placeholder={placeholder}
        ></StyledInput>
    );
};

export default InputTextDefault;
