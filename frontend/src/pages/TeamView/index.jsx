import styled from "styled-components";
import { Loader } from "../../utils/Atoms";
import routes from "../../utils/routes";
import { useFetch } from "../../hooks/useFetch";
import NavbarOffset from "../../components/NavbarOffset";
import Button from "../../components/Button";
import BasicButton from "../../components/BasicButton";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import HBox from "../../containers/HBox";
import UserNode from "../../components/userNode.js";
import Select from "../../components/Input/Select";
import SectionContainer from "../../containers/SectionContainer";
import VBox from "../../containers/VBox";
import {
    Navigate,
} from "react-router-dom";

const StyledTeamView = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;

    .section {
        width: 500px;
        display: flex;
        flex-direction: column;
        padding: 10px 50px;
    }

    .button {
        background: var(--primary);
        justify-content: space-between;
        width: auto;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .button img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }

    .delete {
        background: var(--pastel2);
    }

    .add-member {
        align-self: end;
    }

    .return {
        align-self: start;
        margin-top: 20px;
    }
`;

function TeamView() {
    const { user } = useAuthContext();
    const { id_team } = useParams();

    const [globalError, setGlobalError] = useState("");
    const [teamData, setTeamData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [redirectMyEvent, setRedirectMyEvent] = useState(false)
    const [redirectAllEvent, setRedirectAllEvent] = useState(false)
    const [projets, setProjets] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        console.log(projets)
        if (projets && projets.length > 0) {
            let opt = []
            for (let i = 0; i < projets.length; i++){
                opt.push(projets[i].Libele)
            }
            setOptions(opt)
        }
    }, [projets])

    useEffect(() => {
        const fetchProjets = async (data) => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getAllProjetsByEvent/?id=' + data.IdProjet)
    
            try{
                const json = await response.json();
                if (!response.ok) {     
                    console.log(json.error) 
                    setGlobalError(json.error);
                }
        
                if (response.ok) {
                    console.log(json)
                    setProjets(json.Projets)
                }
            }catch{
                console.log("response is empty")
                setRedirectAllEvent(true)
            }
            
        }
        const fetchTeamData = async () => {
            setIsLoading(true)
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/?IdEquipe=' + id_team )
    
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                setTeamData(json)
                fetchProjets(json)
            }
            setIsLoading(false)
        }
        fetchTeamData()
    }, [])

    const setTeamName = (newName) => {
        const newTeamData = {...teamData}
        newTeamData.Nom = newName
        setTeamData(newTeamData)
    }

    const handleDelete = () => {
        const fetchDeleteTeam = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/delete/?IdEquipe=' + id_team, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            })

            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                alert(json.error)
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                setRedirectMyEvent(true)
            }
        }
        fetchDeleteTeam()
    }
    
    const handleSaveTitle = () => {
        const fetchSaveTitle = async () => {
            setIsSaving(true)
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/edit/?IdEquipe=' + id_team, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({Nom: teamData.Nom})
            })

            console.log({Nom: teamData.Nom})
            if (!response.ok) {     
            
            }
            
            if (response.ok) {
                console.log("saving title")
                const json = await response.json();
            }
            setIsSaving(false)
        }
        fetchSaveTitle()
    }

    const addMember = () => {
        let newMember = prompt("entrer un mail : " ) 

        if (newMember != null) {
            handleAddMember(newMember)
        }
    }

    const handleAddMember = (newMember) => {
        const fetchSaveTitle = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/invite/?IdEquipe=' + id_team, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application.json",
                },
                body: JSON.stringify({email: newMember})
            })
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                console.log("member added")
            }
        }
        fetchSaveTitle()
    }

    return (
        <StyledTeamView>
            <h1>Mon équipe</h1>
            {isLoading ? (
                <Loader />
            ) : teamData && (
                <SectionContainer style={{width: "600px"}}>
                    <VBox gap="30px">
                        <Button className="button">
                            <HBox style={{width: "100%"}} gap="30px">
                                {teamData.IdLeader === user.userId || user.role === "Administrateur" ?
                                <>
                                <input 
                                    style={{
                                        backgroundColor: "#0000",
                                        border: "none",
                                        borderBottom: "solid 1px var(--dark-color)",
                                        flexGrow: 1
                                    }}
                                    type="text"
                                    onChange={(e) => setTeamName(e.target.value)}
                                    value={teamData.Nom}
                                />
                                {isSaving ? 
                                <Loader/>
                                :
                                <BasicButton 
                                    style={{
                                        margin: "auto",
                                        marginRight: 0,
                                        height:" min-content"
                                    }}
                                    onPress={(e) => handleSaveTitle()}
                                >
                                    Enregistrer
                                </BasicButton>}</>:
                                
                                <p>
                                    {teamData.Nom}
                                </p>
                                }
                            </HBox>
                        </Button>
                        <Select style={{
                                margin: "10px",
                                background: "var(--primary)",
                                justifyContent: "space-between",
                                width: "100%",
                                minHeight: "80px",
                                margin: 0,
                                marginBottom: 0,
                                borderRadius: "30px",
                                padding: "0 30px"
                            }}
                            placeholder="sujet"
                            options={options}
                        />
                        {teamData.Users && 
                        <VBox>
                        {teamData.Users.map((member, index) => {
                            return (
                                <UserNode key={index} editable={teamData.IdLeader === user.userId || user.role === "Administrateur"} member={member} setGlobalError={setGlobalError}/>
                            )
                        })}
                        </VBox>
                        }
                        {teamData.IdLeader === user.userId || user.role === "Administrateur" ? (
                            <div style={{display: "flex"}}>
                                <Link className="add-member" style={{marginLeft: "auto"}}>
                                    <BasicButton onPress={addMember}>Ajouter membre</BasicButton>
                                </Link>
                            </div>
                        ) : null}
                    </VBox>
                </SectionContainer>
                )}
            <HBox className="return" style={{justifyContent: "space-between", width: "100%"}}>    
                <Link to={routes.myDataChallenges}>
                    <BasicButton>Retour aux data challenges</BasicButton>
                </Link>
                {teamData && (teamData.IdLeader === user.userId || user.role === "Administrateur") &&
                <Link style={{marginLeft: "auto"}}>
                    <BasicButton className="delete" onPress={handleDelete}>supprimer l'équipe</BasicButton>
                </Link>}
            </HBox>
            {redirectMyEvent && <Navigate to={routes.myDataChallenges}/>}
            {redirectAllEvent && <Navigate to={routes.dataChallenge}/>}
        </StyledTeamView>
    );
}

export default TeamView;
