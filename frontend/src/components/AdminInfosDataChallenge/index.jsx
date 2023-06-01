import styled from "styled-components";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { togglePost } from "../../toggles/togglePost";
import { togglePut } from "../../toggles/togglePut";
import Button from "../../components/Button";
import InputTextDefault from "../../components/Input/Text/Default";
import BasicButton from "../../components/BasicButton";
import Select from "../Input/Select";
import routes from "../../utils/routes";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

const StyledModifyInfoDataChallenge = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 30px;

    .section {
        width: 800px;
        display: flex;
        flex-direction: column;
        padding: 10px 50px;
    }

    & form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    & input,
    & select {
        width: 100%;
        margin: 10px 0px;
    }

    & .row {
        display: flex;
        flex-direction: row;
    }

    & .row input,
    & .row button {
        height: 20px;
    }
`;

function AdminInfosDataChallenge({ className }) {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [eventType, setEventType] = useState("");
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [rewards, setRewards] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [redirectPatch, setRedirectPatch] = useState(null)
    const {verifyAuth} = useVerifyAuth()

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
                            },
                        }
                    );
                    await verifyAuth()
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

    const sendRequest = async (e) => {
        e.preventDefault();
        const post = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + `/api/evenements/createEvenement/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application.json",
                },
                body: JSON.stringify({
                    "TypeEvenement": "DataChallenge",
                    "Libele": label,
                    "Description": description,
                    "Recompenses": rewards,
                    "Debut": start,
                    "Fin": end,
                })
            })
            await verifyAuth()
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                setRedirectPatch(json.IdEvenement)
            }
        }
        const patch = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/editEvenement/', {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application.json",
                },
                body: JSON.stringify({
                    "IdEvenement": id,
                    "TypeEvenement": eventType,
                    "Libele": label,
                    "Description": description,
                    "Recompenses": rewards,
                    "Debut": start,
                    "Fin": end,
                })
            })
            await verifyAuth()
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                console.log(json)
            }
        }
        if (id === undefined) {
            post();
        } else {
            patch();
        }
    }
    return (
        <StyledModifyInfoDataChallenge className={className}>
            <Button className="section">
                <h2>Informations Data Challenge</h2>
                <form
                    onSubmit={sendRequest}
                >
                    <Select
                        style={{ flexGrow: 1 }}
                        options={["DataChallenge", "DataBattle"]}
                        name="level"
                        value={eventType}
                        setValue={setEventType}
                    />
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
                    <div className="row">
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
                        <BasicButton>Enregistrer</BasicButton>
                    </div>
                </form>
            </Button>
            {redirectPatch && <Navigate to={routes.modifyDataChallenge + '/' + redirectPatch} />}
        </StyledModifyInfoDataChallenge>
    );
}

export default AdminInfosDataChallenge;
