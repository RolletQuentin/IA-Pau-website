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
    padding: ${(props) => (props.isFixed ? "5px 30px" : "10px 30px")};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: fixed;
    transition: 0.4s;
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
        transition: 0.4s;
        width: ${(props) => (props.isFixed ? "40px" : "70px")};
        height: ${(props) => (props.isFixed ? "40px" : "70px")};
    }
`;

function Header() {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [id, setId] = useState("");

    useEffect(() => {
        if (user) {
            setId(user.id);
        }
    }, [user]);

    // to add an animation when we scroll on the page
    const [isFixed, setIsFixed] = useState(false);
    function scrollFunction() {
        var scrollTop = window.pageYOffset || document.body.scrollTop;
        if (scrollTop > 100 || document.documentElement.scrollTop > 100) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", scrollFunction);
        return () => {
            window.removeEventListener("scroll", scrollFunction);
        };
    }, []);

    return (
        <StyledHeader isFixed={isFixed}>
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
                                <MyNavLink to={`${routes.profile}/${id}`}>
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
