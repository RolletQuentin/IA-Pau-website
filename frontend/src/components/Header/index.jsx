import routes from "../../utils/routes";
import Logo from "../../assets/iapau_logo.png";
import styled from "styled-components";

import MyNavLink from "../MyNavLink";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & img {
        width: 50px;
        height: 50px;
    }
`;

function Header() {
    return (
        <StyledHeader>
            <img src={Logo} alt="Logo d'IA Pau" />
            <nav>
                <ul>
                    <li>
                        <MyNavLink to={routes.home}>Home</MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to={routes.myDataChallenges}>
                            DataChallenges
                        </MyNavLink>
                    </li>
                </ul>
            </nav>

            <a href="login">Connexion</a>
        </StyledHeader>
    );
}

export default Header;
