import styled from "styled-components";

const StyledButton = styled.button`
    width: 100%;
    background: var(--background-color);
    color: var(--font-color);
    width: 100%;
    height: 80px;
    padding: 30px 0px 30px 0px;
    border-radius: 30px;
    border: 0px;
    box-shadow: 1px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
function Button({
    children
}) {

    return (
        <StyledButton>
            {children}
        </StyledButton>
    );
}

export default Button;
