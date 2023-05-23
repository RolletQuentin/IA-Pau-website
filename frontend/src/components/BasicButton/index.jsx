import React from "react";
import styled from "styled-components";

const BasicButton = ({
    children,
    style
}) => {

    const StyledBasicButton = styled.button`
        background-color: var(--dark-primary);
        color: var(--light-color);
        border: none;
        border-radius: 10px;
        padding: 5px 10px;
        cursor: pointer;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    `;

    return (
        <StyledBasicButton style={style}>
            {children}
        </StyledBasicButton>
    )
}

export default BasicButton;