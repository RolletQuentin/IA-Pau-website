import styled from "styled-components";
import NavbarOffset from "../../../components/NavbarOffset";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputTextDefault from "../../../components/Input/Text/Default";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import BasicButton from "../../../components/BasicButton";
import { togglePut } from "../../../toggles/togglePut";
import { togglePost } from "../../../toggles/togglePost";
import Button from "../../../components/Button";

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
                    const json = await response.json();
                    setUrlRessource(json["UrlRessource"]);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [id, user]);

    return (
        <StyledAdminRessources>
            <h1>Ajouter / Modifier une ressource</h1>
            <Button className="container">
                <form
                    onSubmit={() =>
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
                >
                    <InputTextDefault
                        placeholder="URL ressource"
                        value={urlRessource}
                        setValue={setUrlRessource}
                    />
                    <BasicButton>Envoyer</BasicButton>
                </form>
            </Button>
        </StyledAdminRessources>
    );
}

export default AdminModifyRessource;
