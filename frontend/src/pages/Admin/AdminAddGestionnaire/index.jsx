import styled from "styled-components";
import NavbarOffset from "../../../components/NavbarOffset";
import SignupForm from "../../../components/Form/Signup";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import BasicButton from "../../../components/BasicButton";
import AbstractUser from "../../../assets/abstract-user.png";
import { Loader } from "../../../utils/Atoms";
import { togglePost } from "../../../toggles/togglePost";
import { useVerifyAuth } from "../../../hooks/auth/useVerifyAuth";

const StyledAddGestionnaire = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    margin: auto;

    & .row {
        display: flex;
        flex-direction: row;
    }

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

function AdminAddGestionnaire() {
    const { user } = useAuthContext();
    const { id_event } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { verifyAuth } = useVerifyAuth();

    // récupération des données pour récuper tout les utilisateurs
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            "/api/user/getAllGestionnaire/",
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    await verifyAuth();
                    const json = await response.json();
                    const gestionnaires = json;
                    setData(gestionnaires);
                } catch (err) {
                    await verifyAuth();
                    setError(err);
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            setIsLoading(true);
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <StyledAddGestionnaire>
            <NavbarOffset />
            <div className="row">
                <SignupForm
                    title="Ajouter / Modifier un utilisateur"
                    icon={false}
                    buttonText="Enregistrer"
                    firstAuth={false}
                />
                {isLoading ? (
                    <Loader />
                ) : (
                    <Button className="section">
                        <h2>Liste des gestionnaires disponibles</h2>
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
                                            className="update"
                                            onPress={() => {
                                                togglePost(
                                                    process.env
                                                        .REACT_APP_PROXY +
                                                        "/api/user/addGestionnaireToEvent/",
                                                    user,
                                                    {
                                                        "IdEvent": id_event,
                                                        "IdUser": id,
                                                    }
                                                );
                                            }}
                                        >
                                            Ajouter
                                        </BasicButton>
                                    </div>
                                </Button>
                            ))}
                    </Button>
                )}
            </div>
        </StyledAddGestionnaire>
    );
}

export default AdminAddGestionnaire;
