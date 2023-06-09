import styled from "styled-components";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import routes from "../../utils/routes";
import { Link } from "react-router-dom";
import BasicButton from "../../components/BasicButton";
import { Loader } from "../../utils/Atoms";
import Button from "../../components/Button";
import toggleDelete from "../../toggles/toggleDelete";
import DataChallengeIcon from "../../assets/data-challenges.png";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

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

function AdminProjects({ id, className }) {
    const { user } = useAuthContext();
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {verifyAuth} = useVerifyAuth()

    // récupération des données pour récuper tout les utilisateurs
    useEffect(() => {
        if (user && id !== undefined) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/evenements/getAllProjetsByEvent/?id=${id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    await verifyAuth()
                    const json = await response.json();
                    const events = json.Projets;
                    setData(events);
                } catch (err) {
                    await verifyAuth()
                    setError(err);
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            setIsLoading(true);
            fetchData();
        }
    }, [id, user]);
    return (
        <StyledAdminProjects className={className}>
            {isLoading ? (
                <Loader />
            ) : (
                <Button className="section">
                    <h2>Projet(s)</h2>
                    {data &&
                        data.map(({ IdProjet, Libele }) => (
                            <Button key={IdProjet} className="button">
                                <div className="left">
                                    <img
                                        src={DataChallengeIcon}
                                        alt="Icone data challenge"
                                        className="icon"
                                    />
                                    <span>{Libele}</span>
                                </div>
                                <div>
                                    <BasicButton
                                        className="delete"
                                        onPress={() =>
                                            toggleDelete(
                                                process.env.REACT_APP_PROXY +
                                                    `/api/projets/deleteProjet/?id=${IdProjet}`,
                                                user
                                            )
                                        }
                                    >
                                        Supprimer
                                    </BasicButton>
                                    <Link
                                        to={
                                            routes.modifyProject +
                                            `/${id}/${IdProjet}`
                                        }
                                    >
                                        <BasicButton className="update">
                                            Modifier
                                        </BasicButton>
                                    </Link>
                                </div>
                            </Button>
                        ))}
                    <Link
                        className="add-member"
                        to={routes.modifyProject + `/${id}`}
                    >
                        <BasicButton>Ajouter projet</BasicButton>
                    </Link>
                </Button>
            )}
        </StyledAdminProjects>
    );
}

export default AdminProjects;
