import React from "react";
import styled from "styled-components";

const StyledBasicButton = styled.button`
    background-color: var(--dark-primary);
    color: var(--light-color);
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const BasicButton = ({ children, className }) => {
    return (
        <StyledBasicButton className={className}>{children}</StyledBasicButton>
    );
};

export default BasicButton;
