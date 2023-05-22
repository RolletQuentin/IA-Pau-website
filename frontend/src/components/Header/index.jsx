import routes from "../../utils/routes";
import Logo from "../../assets/iapau_logo.png";
import styled from "styled-components";
import ButtonLink from "../ButtonLink";

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
                        <ButtonLink href={routes.home}>Home</ButtonLink>
                    </li>
                </ul>
            </nav>

            <a href="login">Connexion</a>
        </StyledHeader>
    );
}

export default Header;
