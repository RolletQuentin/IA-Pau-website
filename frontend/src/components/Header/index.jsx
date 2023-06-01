import routes from "../../utils/routes";
import Logo from "../../assets/iapau_logo.png";
import styled from "styled-components";

import MyNavLink from "../MyNavLink";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

import { useLogout } from "../../hooks/auth/useLogout";
import { useEffect, useState } from "react";

const StyledHeader = styled.header`
    width: calc(100% - 60px);
    background: var(--background-color);
    padding: ${(props) => (props.padding + "px 30px")};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: fixed;
    z-index: 1;

    & nav {
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
        transition: height 0.4s;
        height: ${(props) => (props.imgHeight + "px")};
    }
`;

function Header() {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    // to add an animation when we scroll on the page
    const [imgHeight, setImgHeight] = useState(50);
    const [padding, setPadding] = useState(10);
    
    
    useEffect(() => {
        function scrollFunction() {
            if (
                document.body.scrollTop - imgHeight - padding > 5 ||
                document.documentElement.scrollTop - imgHeight - padding > 5
            ) {
                setImgHeight(50);
                setPadding(10)
            } else {
                setImgHeight(95);
                setPadding(5)
            }
        }
        scrollFunction();
        window.addEventListener("scroll", scrollFunction);
        return () => {
            window.removeEventListener("scroll", scrollFunction);
        };
    }, []);

    return (
        <StyledHeader imgHeight={imgHeight} padding={padding}>
            <Link to={routes.home}>
                <img src={Logo} alt="Logo d'IA Pau" />
            </Link>

            <nav>
                <ul>
                    <li>
                        <MyNavLink to={routes.home}>Accueil</MyNavLink>
                    </li>

                    <li>
                        <MyNavLink to={routes.analyseur}>Analyseur</MyNavLink>
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
                                <MyNavLink
                                    to={`${routes.profile}/${user.userId}`}
                                >
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

                    {/* if the user is a Student */}
                    {user && user.role === "Etudiant" ? (
                        <li>
                            <MyNavLink to={routes.invitations}>
                            <span className="material-symbols-outlined">
                            mail
                            </span>
                            </MyNavLink>
                        </li>
                    ) : null}
                </ul>
            </nav>

            {/* if the user is conected or not*/}
            {user ? (
                <div onClick={logout} style={{ cursor: "pointer" }}>
                    Déconnexion
                </div>
            ) : (
                <MyNavLink to={routes.login}>Connexion</MyNavLink>
            )}
        </StyledHeader>
    );
}

export default Header;
