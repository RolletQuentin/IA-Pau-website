import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import Button from "../Button";
import RessourceIcon from "../../assets/files.png";

const StyledRessource = styled(Button)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 500px;
    padding: 10px;

    & .item {
        width: 400px;
        background: var(--primary);
        min-height: 40px;
        margin: 10px;
        padding: 10px 20px;
    }

    & .item img {
        width: 35px;
        height: 35px;
        margin-right: 5px;
    }
`;

function Ressource() {
    const { user } = useAuthContext();
    const { id_project } = useParams();
    const [ressources, setRessources] = useState("");

    useEffect(() => {
        if (id_project !== undefined && user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/projets/getAllRessourcesByProjet/?id=${id_project}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    setRessources(json.Ressources);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [id_project, user]);

    return (
        <StyledRessource>
            <h2>Liste de ressources</h2>
            {ressources &&
                ressources.map(
                    ({ IdRessource, UrlRessource, NomRessource }) => {
                        return (
                            <Button className="item" key={IdRessource}>
                                <img src={RessourceIcon} alt="Icone files" />
                                <Link to={UrlRessource}>{NomRessource}</Link>
                            </Button>
                        );
                    }
                )}
        </StyledRessource>
    );
}

export default Ressource;
