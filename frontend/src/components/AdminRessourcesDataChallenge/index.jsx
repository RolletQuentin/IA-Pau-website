import styled from "styled-components";
import Button from "../../components/Button";
import { Loader } from "../../utils/Atoms";
import FilesIcon from "../../assets/files.png";
import BasicButton from "../../components/BasicButton";
import { Link } from "react-router-dom";
import routes from "../../utils/routes";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useState, useEffect } from "react";
import toggleDelete from "../../toggles/toggleDelete";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

const StyledAdminRessources = styled.div`
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

function AdminRessourcesDataChallenge({ id, className }) {
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
                            `/api/evenements/getAllRessourcesByEvent/?id=${id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    await verifyAuth()
                    const json = await response.json();
                    const ressources = json.Ressources;
                    setData(ressources);
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
    }, [user, id]);

    return (
        <StyledAdminRessources className={className}>
            {isLoading ? (
                <Loader />
            ) : (
                <Button className="section">
                    <h2>Liste de ressources spécifiques</h2>
                    {data &&
                        data.map(({ IdRessource, UrlRessource }) => (
                            <Button key={IdRessource} className="button">
                                <div className="left">
                                    <img
                                        src={FilesIcon}
                                        alt="Icone utilisateur"
                                        className="icon"
                                    />
                                    <span>{UrlRessource}</span>
                                </div>
                                <div>
                                    <BasicButton
                                        className="delete"
                                        onPress={() =>
                                            toggleDelete(
                                                process.env.REACT_APP_PROXY +
                                                    `/api/ressources/deleteRessource/?id=${IdRessource}`,
                                                user
                                            )
                                        }
                                    >
                                        Supprimer
                                    </BasicButton>
                                    <Link
                                        to={
                                            routes.modifyRessource +
                                            `/${IdRessource}`
                                        }
                                    >
                                        <BasicButton className="update">
                                            Modifier
                                        </BasicButton>
                                    </Link>
                                </div>
                            </Button>
                        ))}
                    <Link className="add-member" to={routes.modifyRessource}>
                        <BasicButton>Ajouter ressource</BasicButton>
                    </Link>
                </Button>
            )}
        </StyledAdminRessources>
    );
}

export default AdminRessourcesDataChallenge;
