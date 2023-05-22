import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled.div`
    & a {
    }

    & .active {
        text-decoration: underline;
    }
`;

function MyNavLink({ children, to }) {
    return (
        <StyledNavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "active" : null)}
                to={to}
            >
                {children}
            </NavLink>
        </StyledNavLink>
    );
}

export default MyNavLink;
