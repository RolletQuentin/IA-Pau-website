import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputTextDefault from "../../../components/Input/Text/Default";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import BasicButton from "../../../components/BasicButton";
import { togglePut } from "../../../toggles/togglePut";
import { togglePost } from "../../../toggles/togglePost";
import Button from "../../../components/Button";
import { useVerifyAuth } from "../../../hooks/auth/useVerifyAuth";
import MarginContainer from "../../../containers/MarginContainer";
import routes from "../../../utils/routes";

const StyledAdminRessources = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 500px;

    & .container {
        min-height: 80px;
    }

    & form {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

function AdminModifyRessource() {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [urlRessource, setUrlRessource] = useState("");
    const {verifyAuth} = useVerifyAuth()

    useEffect(() => {
        if (id !== undefined && user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/ressources/getRessource/?id=${id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    await verifyAuth()
                    const json = await response.json();
                    setUrlRessource(json["UrlRessource"]);
                } catch (err) {
                    await verifyAuth()
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [id, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        id === undefined
            ? togglePost(
                    process.env.REACT_APP_PROXY +
                        `/api/ressources/createRessource/`,
                    user,
                    {
                        "UrlRessource": urlRessource,
                    }
                )
            : togglePut(
                    process.env.REACT_APP_PROXY +
                        `/api/ressources/editRessource/`,
                    user,
                    {
                        "IdRessource": id,
                        "UrlRessource": urlRessource,
                    }
                )
    }
    return (
        <StyledAdminRessources>
            <h1>Ajouter / Modifier une ressource</h1>
            <Button className="container">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    style={{display: "flex", gap: "30px"}}
                >
                    <InputTextDefault
                        placeholder="URL ressource"
                        value={urlRessource}
                        setValue={setUrlRessource}
                        style={{flexGrow: 1}}
                    />
                    <BasicButton>Envoyer</BasicButton>
                </form>
            </Button>
            <MarginContainer margin={"20px"} style={{width: "100%"}}>
                <Link to={routes.adminRessources}>
                    <BasicButton style={{marginRight: "auto"}}>Retourner à la liste des ressources</BasicButton>
                </Link>
            </MarginContainer>
        </StyledAdminRessources>
    );
}

export default AdminModifyRessource;
