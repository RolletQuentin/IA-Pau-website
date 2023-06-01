import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import Button from "../Button";
import InputTextDefault from "../Input/Text/Default";
import BasicButton from "../BasicButton";
import { togglePatch } from "../../toggles/togglePatch";

const StyledTeam = styled(Button)`
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

function Team() {
    const { user } = useAuthContext();
    const { id_equipe } = useParams();
    const [data, setData] = useState({});
    const [githubLink, setGithubLink] = useState("");

    useEffect(() => {
        if (id_equipe !== undefined && user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/teams/?IdEquipe=${id_equipe}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    setData(json);
                    setGithubLink(json.LienProjet);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [id_equipe, user]);

    const isCaptain = user && user.userId === data.IdLeader;

    return (
        <StyledTeam>
            <h2>Informations de l'équipe</h2>
            <Button className="item">{data.Nom}</Button>
            {isCaptain ? (
                <Button className="item">
                    <InputTextDefault
                        placeholder="Lien Github.com"
                        value={githubLink}
                        setValue={setGithubLink}
                    />
                    <BasicButton
                        onClick={() =>
                            togglePatch(
                                process.env.REACT_APP_PROXY +
                                    `api/teams/edit/?IdEquipe=${id_equipe}`,
                                user,
                                { "LienProjet": githubLink }
                            )
                        }
                    >
                        Enregistrer
                    </BasicButton>
                </Button>
            ) : (
                <Button className="item">
                    {githubLink === "" ? "Lien Github" : githubLink}
                </Button>
            )}
        </StyledTeam>
    );
}

export default Team;
