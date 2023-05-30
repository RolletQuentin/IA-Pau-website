import styled from "styled-components";
import NavbarOffset from "../../../components/NavbarOffset";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import routes from "../../../utils/routes";
import { Link } from "react-router-dom";
import BasicButton from "../../../components/BasicButton";
import { Loader } from "../../../utils/Atoms";
import Button from "../../../components/Button";
import toggleDelete from "../../../toggles/toggleDelete";
import DataChallengeIcon from "../../../assets/data-challenges.png";

const StyledAdminDataChallenges = styled.div`
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

function AdminDataChallenges() {
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
                        process.env.REACT_APP_PROXY +
                            "/api/evenements/getAllEvenements/",
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    const events = json.Evenements;
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
    }, [user]);
    return (
        <StyledAdminDataChallenges>
            <NavbarOffset />
            <h1>Administrer Data Challenges</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <Button className="section">
                    {data &&
                        data.map(({ IdEvenement, Libele }) => (
                            <Button key={IdEvenement} className="button">
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
                                                    `/api/evenements/deleteEvenement/?id=${IdEvenement}`,
                                                user
                                            )
                                        }
                                    >
                                        Supprimer
                                    </BasicButton>
                                    <Link
                                        to={
                                            routes.modifyDataChallenge +
                                            `/${IdEvenement}`
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
                        to={routes.modifyDataChallenge}
                    >
                        <BasicButton>Ajouter data challenge</BasicButton>
                    </Link>
                </Button>
            )}
            <Link className="return" to={routes.admin}>
                <BasicButton>Retour menu administrer</BasicButton>
            </Link>
        </StyledAdminDataChallenges>
    );
}

export default AdminDataChallenges;
