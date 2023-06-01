import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import Button from "../Button";
import InputTextDefault from "../Input/Text/Default";
import BasicButton from "../BasicButton";
import { togglePatch } from "../../toggles/togglePatch";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

const StyledQuestionnaire = styled(Button)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 500px;
    padding: 10px;

    & .item {
        width: 400px;
        background: var(--primary);
        height: 40px;
        margin: 10px;
    }
`;

function Questionnaire() {
    const { user } = useAuthContext();
    const { id_projet } = useParams();
    const [questionnaires, setQuestionnaires] = useState();
    const {verifyAuth} = useVerifyAuth()

    useEffect(() => {
        if (id_projet !== undefined && user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/evenements/getAllQuestionnairesByEvent/?id=${id_projet}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    await verifyAuth()
                    const json = await response.json();
                    setQuestionnaires(json.Questionnaires);
                } catch (err) {
                    await verifyAuth()
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [id_projet, user]);

    return (
        <StyledQuestionnaire>
            <h2>Questionnaires</h2>
            {questionnaires &&
                questionnaires.map(
                    ({
                        IdQuestionnaire,
                        IdProjet,
                        Titre,
                        Sujet,
                        Debut,
                        Fin,
                    }) => {
                        return (
                            <Button className="item" key={IdQuestionnaire}>
                                <Link>{Titre}</Link>
                            </Button>
                        );
                    }
                )}
        </StyledQuestionnaire>
    );
}

export default Questionnaire;
