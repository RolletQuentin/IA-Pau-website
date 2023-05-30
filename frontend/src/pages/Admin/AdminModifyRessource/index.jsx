import styled from "styled-components";
import NavbarOffset from "../../../components/NavbarOffset";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputTextDefault from "../../../components/Input/Text/Default";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import BasicButton from "../../../components/BasicButton";
import { togglePut } from "../../../toggles/togglePut";
import { togglePost } from "../../../toggles/togglePost";

const StyledAdminRessources = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 500px;
`;

function AdminModifyRessource() {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [urlRessource, setUrlRessource] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                    setError(err);
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            setIsLoading(true);
            fetchData();
        }
    }, [id, user]);

    return (
        <StyledAdminRessources>
            <NavbarOffset />
            <h1>Ajouter / Modifier une ressource</h1>
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
                                  "UrlRessource": urlRessource,
                                  "IdRessource": id,
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
        </StyledAdminRessources>
    );
}

export default AdminModifyRessource;
