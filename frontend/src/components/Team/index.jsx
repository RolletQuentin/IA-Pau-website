import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import Button from "../Button";
import InputTextDefault from "../Input/Text/Default";
import BasicButton from "../BasicButton";
import { togglePatch } from "../../toggles/togglePatch";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";
import routes from "../../utils/routes";

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
    const {verifyAuth} = useVerifyAuth()

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
                    await verifyAuth()
                    const json = await response.json();
                    setData(json);
                    setGithubLink(json.LienProjet);
                } catch (err) {
                    await verifyAuth()
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
            <Button className="item">
                <p style={{flexGrow: 1}}>{data.Nom}</p>
                <Link to={routes.teamView + "/" + data.IdEquipe}><BasicButton
                    onClick={() =>
                        togglePatch(
                            process.env.REACT_APP_PROXY +
                                `api/teams/edit/?IdEquipe=${id_equipe}`,
                            user,
                            { "LienProjet": githubLink }
                        )
                    }
                >
                    Voir
                </BasicButton></Link>
            </Button>
            {isCaptain ? (
                <Button className="item">
                    <InputTextDefault
                        style={{flexGrow: 1}}
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
