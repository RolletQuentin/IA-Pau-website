import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import Button from "../Button";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

const StyledProject = styled(Button)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 500px;
    padding: 10px;

    & .item {
        width: 400px;
        background: var(--primary);
        margin: 10px;
    }

    & .description {
        background: var(--primary);
        width: 100%; /* Set the width to 100% /
        max-width: 400px; / Set a maximum width to prevent it from exceeding 400px */
        margin-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
`;

function Project() {
    const { user } = useAuthContext();
    const { id_project } = useParams();
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const {verifyAuth} = useVerifyAuth()

    useEffect(() => {
        if (id_project !== undefined && user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/projets/getProjet/?id=${id_project}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    await verifyAuth()
                    const json = await response.json();
                    setLabel(json["Libele"]);
                    setDescription(json["Description"]);
                    setCompany(json["Entreprise"]);
                } catch (err) {
                    await verifyAuth()
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [id_project, user]);

    return (
        <StyledProject>
            <h2>Informations projet</h2>
            <Button className="item">{label}</Button>
            <Button className="item">{description}</Button>
            <Button className="item">{company}</Button>
        </StyledProject>
    );
}

export default Project;
