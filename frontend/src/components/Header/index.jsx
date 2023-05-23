import routes from "../../utils/routes";
import Logo from "../../assets/iapau_logo.png";
import styled from "styled-components";

import MyNavLink from "../MyNavLink";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

const StyledHeader = styled.header`
    background: var(--background-color);
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    & nav {
        justify-self: start;
        flex: 2;
    }

    & nav ul {
        display: flex;
        flex-direction: row;
    }

    & nav ul li {
        padding: 0px 10px;
    }

    & img {
        width: 70px;
        height: 70px;
    }
`;

function Header() {
    // const { user } = useAuthContext();
    const user = {
        id: "015",
        role: "Administrateur",
    };

    return (
        <StyledHeader>
            <Link to={routes.home}>
                <img src={Logo} alt="Logo d'IA Pau" />
            </Link>

            <nav>
                <ul>
                    <li>
                        <MyNavLink to={routes.home}>Accueil</MyNavLink>
                    </li>

                    {/* if the user is connected*/}
                    {user ? (
                        <>
                            <li>
                                <MyNavLink to={routes.myDataChallenges}>
                                    Mes datas challenges
                                </MyNavLink>
                            </li>
                            <li>
                                <MyNavLink to={`${routes.profile}/${user.id}`}>
                                    Profil
                                </MyNavLink>
                            </li>
                        </>
                    ) : null}

                    {/* if the user is an admin */}
                    {user && user.role === "Administrateur" ? (
                        <li>
                            <MyNavLink to={routes.admin}>
                                Administrateur
                            </MyNavLink>
                        </li>
                    ) : null}
                </ul>
            </nav>

            {/* if the user is conected or not*/}
            {user ? (
                <div>Déconnexion</div>
            ) : (
                <MyNavLink to={routes.login}>Connexion</MyNavLink>
            )}
        </StyledHeader>
    );
}

export default Header;
