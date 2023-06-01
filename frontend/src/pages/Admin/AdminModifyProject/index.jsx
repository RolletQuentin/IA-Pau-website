import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputTextDefault from "../../../components/Input/Text/Default";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import BasicButton from "../../../components/BasicButton";
import { togglePut } from "../../../toggles/togglePut";
import { togglePost } from "../../../toggles/togglePost";
import Button from "../../../components/Button";

const StyledAdminProject = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    /* width: 500px; */

    & .main form {
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    & .main form input,
    & .main form button {
        margin: 10px;
    }
`;

function AdminModifyProject() {
    const { user } = useAuthContext();
    const { idProject, idEvent } = useParams();
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [company, setCompany] = useState("");

    useEffect(() => {
        if (idProject !== undefined && user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/projets/getProjet/?id=${idProject}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    setLabel(json["Libele"]);
                    setDescription(json["Description"]);
                    setUrlImage(json["Image"]);
                    setCompany(json["Entreprise"]);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [idProject, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (idProject === undefined) {
            await togglePost(
                process.env.REACT_APP_PROXY + `/api/projets/createProjet/`,
                user,
                {
                    "IdEvenement": `${idEvent}`,
                    "Libele": label,
                    "Description": description,
                    "Image": urlImage,
                    "Entreprise": company,
                }
            );
            alert("success");
        } else {
            togglePut(
                process.env.REACT_APP_PROXY + `/api/projets/editProjet/`,
                user,
                {
                    "IdProjet": `${idProject}`,
                    "IdEvenement": `${idEvent}`,
                    "Libele": label,
                    "Description": description,
                    "Image": urlImage,
                    "Entreprise": company,
                }
            );
        }
    };

    return (
        <StyledAdminProject>
            <h1>
                {idProject === undefined ? "Ajouter" : "Modifier"} un projet
            </h1>
            <Button className="main">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <InputTextDefault
                        placeholder="Libele"
                        value={label}
                        setValue={setLabel}
                    />
                    <InputTextDefault
                        placeholder="Description"
                        value={description}
                        setValue={setDescription}
                    />
                    <InputTextDefault
                        placeholder="URL Image"
                        value={urlImage}
                        setValue={setUrlImage}
                    />
                    <InputTextDefault
                        placeholder="Entreprise"
                        value={company}
                        setValue={setCompany}
                    />
                    <BasicButton>Envoyer</BasicButton>
                </form>
            </Button>
        </StyledAdminProject>
    );
}

export default AdminModifyProject;
