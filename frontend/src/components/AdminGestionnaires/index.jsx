import styled from "styled-components";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import routes from "../../utils/routes";
import { Link } from "react-router-dom";
import BasicButton from "../../components/BasicButton";
import { Loader } from "../../utils/Atoms";
import Button from "../../components/Button";
import AbstractUser from "../../assets/abstract-user.png";
import axios from "axios";

const StyledAdminProjects = styled.div`
    margin: auto;
    width: 500px;
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

function AdminGestionnaires({ id_event, className }) {
    const { user } = useAuthContext();
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // récupération des données pour récuper tout les utilisateurs
    useEffect(() => {
        if (user && id_event !== undefined) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/evenements/getGestionnaire/?IdEvent=${id_event}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    const events = json;
                    setData(events);
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
    }, [id_event, user]);

    const toggleDelete = async (url, user, data) => {
        console.log("salut");
        // eslint-disable-next-line no-restricted-globals
        const confirmResponse = confirm(
            `Êtes-vous sûr de vouloir supprimer cet élément ?`
        );
        if (confirmResponse) {
            try {
                await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify(data),
                });
                console.log("Élément supprimé avec succès");
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <StyledAdminProjects className={className}>
            {isLoading ? (
                <Loader />
            ) : (
                <Button className="section">
                    <h2>Gestionnaire(s)</h2>
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
                                                    `/api/user/removeGestionnaireFromEvent/`,
                                                user,
                                                {
                                                    "IdEvent": id_event,
                                                    "IdUser": id,
                                                }
                                            )
                                        }
                                    >
                                        Retirer
                                    </BasicButton>
                                    <Link to={routes.addUser + `/${id}`}>
                                        <BasicButton className="update">
                                            Modifier
                                        </BasicButton>
                                    </Link>
                                </div>
                            </Button>
                        ))}
                    <Link
                        className="add-member"
                        to={routes.addGestionnaire + `/${id_event}`}
                    >
                        <BasicButton>Ajouter gestionnaire</BasicButton>
                    </Link>
                </Button>
            )}
        </StyledAdminProjects>
    );
}

export default AdminGestionnaires;
