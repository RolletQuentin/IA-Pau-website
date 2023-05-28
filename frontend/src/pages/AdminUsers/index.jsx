import styled from "styled-components";
import NavbarOffset from "../../components/NavbarOffset";
import Button from "../../components/Button";
import { Loader } from "../../utils/Atoms";
import AbstractUser from "../../assets/abstract-user.png";
import BasicButton from "../../components/BasicButton";
import { Link } from "react-router-dom";
import routes from "../../utils/routes";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect } from "react";
import { useState } from "react";
import toggleDelete from "../../toggles/toggleDelete";

const StyledAdminUsers = styled.div`
    margin: auto;
    width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .section {
        width: 800px;
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

function AdminUsers() {
    const { user } = useAuthContext();
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // récupération des données pour récuper tout les utilisateurs
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY + "api/user/",
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    setData(json);
                } catch (err) {
                    setError(err);
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            setIsLoading(true);
            fetchData();
        }
    }, [user]);

    return (
        <StyledAdminUsers>
            <NavbarOffset />
            <h1>Administrer utilisateurs</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <Button className="section">
                    {data &&
                        data.map(({ id, email, lastname, firstname }) => (
                            <Button key={id} className="button">
                                <div className="left">
                                    <img
                                        src={AbstractUser}
                                        alt="Icone utilisateur"
                                        className="icon"
                                    />
                                    <span>
                                        {firstname} {lastname}
                                    </span>
                                </div>
                                <span>{email}</span>
                                <div>
                                    <BasicButton
                                        className="delete"
                                        onPress={() =>
                                            toggleDelete(
                                                process.env.REACT_APP_PROXY +
                                                    `api/user/?id=${id}/`,
                                                user
                                            )
                                        }
                                    >
                                        Supprimer
                                    </BasicButton>
                                    <Link>
                                        <BasicButton className="update">
                                            Modifier
                                        </BasicButton>
                                    </Link>
                                </div>
                            </Button>
                        ))}
                    <Link className="add-member">
                        <BasicButton>Ajouter membre</BasicButton>
                    </Link>
                </Button>
            )}
            <Link className="return" to={routes.admin}>
                <BasicButton>Retour menu administrer</BasicButton>
            </Link>
        </StyledAdminUsers>
    );
}

export default AdminUsers;
