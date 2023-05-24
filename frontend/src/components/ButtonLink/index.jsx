import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../Button";

const StyledLink = styled(Link)`
    width: 100%;

    & :hover {
        cursor: pointer;
    }
`;

function ButtonLink({ children, to }) {
    return (
        <StyledLink to={to}>
            <Button>{children}</Button>
        </StyledLink>
    );
}

export default ButtonLink;
