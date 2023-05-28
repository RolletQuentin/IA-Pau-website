import styled from "styled-components";
import { Loader } from "../../utils/Atoms";
import routes from "../../utils/routes";
import { useFetch } from "../../hooks/useFetch";
import NavbarOffset from "../../components/NavbarOffset";
import Button from "../../components/Button";
import AbstractUser from "../../assets/abstract-user.png";
import BasicButton from "../../components/BasicButton";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

const StyledTeamView = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;

    .section {
        width: 500px;
        display: flex;
        flex-direction: column;
        padding: 10px 50px;
    }

    .button {
        margin: 10px;
        background: var(--primary);
        justify-content: space-between;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .button img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }

    .delete {
        background: var(--pastel2);
        margin-right: 20px;
    }

    .add-member {
        align-self: end;
    }

    .return {
        align-self: start;
        margin-top: 20px;
    }
`;

function TeamView() {
    const { user } = useAuthContext();
    const { data, isLoading, error } = useFetch(
        process.env.REACT_APP_PROXY + "api/user/",
        {
            headers: {
                Authorization: "Bearer " + user.jwt,
                "Content-Type": "apllication/json",
            },
        }
    );
    const isCaptain = true;
    return (
        <StyledTeamView>
            <NavbarOffset />
            <h1>Mon équipe</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <Button className="section">
                    <Button className="button">Projet</Button>
                    <Button className="button">
                        <div className="left">
                            <img
                                src={AbstractUser}
                                alt="Icone utilisateur"
                                className="icon"
                            />
                            <span>Membre 1</span>
                        </div>
                        {isCaptain ? (
                            <div>
                                <BasicButton className="delete">
                                    Supprimer
                                </BasicButton>
                            </div>
                        ) : null}
                    </Button>
                    <Button className="button">
                        <div className="left">
                            <img
                                src={AbstractUser}
                                alt="Icone utilisateur"
                                className="icon"
                            />
                            <span>Membre 2</span>
                        </div>
                        {isCaptain ? (
                            <div>
                                <BasicButton className="delete">
                                    Supprimer
                                </BasicButton>
                            </div>
                        ) : null}
                    </Button>
                    {isCaptain ? (
                        <Link className="add-member">
                            <BasicButton>Ajouter membre</BasicButton>
                        </Link>
                    ) : null}
                </Button>
            )}
            <Link className="return" to={routes.myDataChallenges}>
                <BasicButton>Retour aux data challenges</BasicButton>
            </Link>
        </StyledTeamView>
    );
}

export default TeamView;
