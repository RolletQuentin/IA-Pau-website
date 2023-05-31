import styled from "styled-components";

const StyledButton = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: var(--background-color);
    color: var(--font-color);
    min-height: 80px;
    padding: 0px 30px 0px 30px;
    border-radius: 30px;
    box-shadow: 1px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
function Button({ children, className, style }) {
    return <StyledButton className={className} style={style}>{children}</StyledButton>;
}

export default Button;
