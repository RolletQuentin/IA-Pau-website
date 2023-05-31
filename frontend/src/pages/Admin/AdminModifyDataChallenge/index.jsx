import styled from "styled-components";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { redirect, useParams } from "react-router-dom";
import NavbarOffset from "../../../components/NavbarOffset";
import { useEffect, useState } from "react";
import { togglePost } from "../../../toggles/togglePost";
import { togglePut } from "../../../toggles/togglePut";
import Button from "../../../components/Button";
import InputTextDefault from "../../../components/Input/Text/Default";
import AdminProjects from "../../../components/AdminProjects";
import AdminGestionnaires from "../../../components/AdminGestionnaires";
import AdminRessourcesDataChallenge from "../../../components/AdminRessourcesDataChallenge";
import BasicButton from "../../../components/BasicButton";

const StyledModifyDataChallenge = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    margin: auto;
`;

function AdminModifyDataChallenge() {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [eventType, setEventType] = useState("");
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [rewards, setRewards] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        if (id !== undefined && user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/evenements/getEvenement/?id=${id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    setEventType(json["TypeEvenement"]);
                    setLabel(json["Libele"]);
                    setDescription(json["Description"]);
                    setRewards(json["Recompenses"]);
                    setStart(json["Debut"]);
                    setEnd(json["Fin"]);
                } catch (err) {
                    console.error(err);
                }
            };

            fetchData();
        }
    }, [id, user]);

    return (
        <StyledModifyDataChallenge>
            <NavbarOffset />
            <h1>Ajouter / Modifier un Data Challenge</h1>
            <Button>
                <h2>Informations Data Challenge</h2>
                <form
                    onSubmit={() => {
                        if (id === undefined) {
                            togglePost(
                                process.env.REACT_APP_PROXY +
                                    `/api/evenements/createEvenement/`,
                                user,
                                {
                                    "TypeEvenement": "DataChallenge",
                                    "Libele": label,
                                    "Description": description,
                                    "Recompenses": rewards,
                                    "Debut": start,
                                    "Fin": end,
                                }
                            );
                        } else {
                            togglePut(
                                process.env.REACT_APP_PROXY +
                                    `/api/evenements/editEvenement/`,
                                user,
                                {
                                    "IdEvenement": id,
                                    "TypeEvenement": eventType,
                                    "Libele": label,
                                    "Description": description,
                                    "Recompenses": rewards,
                                    "Debut": start,
                                    "Fin": end,
                                }
                            );
                        }
                    }}
                >
                    <select>
                        <option value="">Data Challenge</option>
                        <option value="">Data Battle</option>
                    </select>
                    <InputTextDefault
                        placeholder="Libellé"
                        value={label}
                        setValue={setLabel}
                    />
                    <InputTextDefault
                        placeholder="Description"
                        value={description}
                        setValue={setDescription}
                    />
                    <InputTextDefault
                        placeholder="Récompenses"
                        value={rewards}
                        setValue={setRewards}
                    />
                    <>
                        <InputTextDefault
                            placeholder="Date début"
                            value={start}
                            setValue={setStart}
                        />
                        <InputTextDefault
                            placeholder="Date fin"
                            value={end}
                            setValue={setEnd}
                        />
                    </>
                    <BasicButton>Enregistrer</BasicButton>
                </form>
            </Button>
            {id !== undefined && (
                <>
                    <AdminProjects id={id} />
                    <AdminRessourcesDataChallenge id={id} />
                    <AdminGestionnaires id={id} />
                </>
            )}
        </StyledModifyDataChallenge>
    );
}

export default AdminModifyDataChallenge;
