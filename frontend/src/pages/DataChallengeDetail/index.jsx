import SectionContainer from "../../containers/SectionContainer";
import NavbarOffset from "../../components/NavbarOffset";
import BasicButton from "../../components/BasicButton";
import VBox from "../../containers/VBox";
import CenterContainer from "../../containers/CenterContainer";
import { useEffect, useState } from "react";
import { Loader } from "../../utils/Atoms";
import MarginContainer from "../../containers/MarginContainer";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import routes from "../../utils/routes";

function DataChallengeDetail() {
    const [globalError, setGlobalError] = useState("")
    const [hasProjet, setHasProjet] = useState(true)
    const [redirectToTeamView, setRedirectToTeamView] = useState(false)
    const [team, setTeam] = useState(null)
    const [data_challenge, setDataChallenge] = useState(null);
    const [projets, setProjets] = useState([])
    const {id} = useParams();
    const {user} = useAuthContext();

    const handleCreateTeam = () => {
        const fetchHasTeam = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/me/?IdEvent=' + id, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            })
            const json = await response.json();
            
            if (response.ok) {
                setTeam({...json, hasTeam: true});
                console.log(json)
            }else{
                console.log(json)
                setTeam({hasTeam: false})
            }
            
        }
        const fetchCreateTeam = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/create/', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application.json",
                },
                body: JSON.stringify({
                    Nom: "Mon Equipe",
                    IdProjet: projets[0].IdProjet
                })
            })
    
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                alert(json.error)
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                await fetchHasTeam()
                setRedirectToTeamView(true)
            }
        }
        fetchCreateTeam()
    }

    useEffect(() => {
        const fetchProjets = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getAllProjetsByEvent/?id=' + id)
    
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
                setHasProjet(false)
            }
            
        }
        const fetchDataChallengeData = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getEvenement/?id=' + id)
    
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                console.log(json)
                setDataChallenge(json)
            }
        }
        const fetchHasTeam = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/me/?IdEvent=' + id, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            })
            const json = await response.json();
            
            if (response.ok) {
                setTeam({...json, hasTeam: true});
                console.log(json)
            }else{
                console.log(json)
                setTeam({hasTeam: false})
            }
            
        }
        if (id){
            fetchDataChallengeData();
            fetchHasTeam();
            fetchProjets()
        }
    }, [])

    return (
        <CenterContainer>
            {data_challenge && team && projets ? 
            <VBox style={{
                width: "80vw",
            }}>
                <CenterContainer>
                    <h1>{data_challenge.Libele}</h1>
                </CenterContainer>
                <SectionContainer>
                    <h1>Description :</h1>
                    <span>{data_challenge.Description}</span>
                    <h1>Recompenses : </h1>
                    <span>{data_challenge.Recompenses}</span>
                    <h1>Projet : </h1>
                    <VBox gap="0">{projets.map((p, index) => {
                        return (
                            <p key={index} style={{margin: 0, marginLeft: "30px"}}>- {p.Libele}</p>
                        )
                    })}
                    </VBox>
                </SectionContainer>
                {hasProjet && <div style={{display: "flex"}}>
                    {(!user || (team && team.hasTeam && user)) ? 
                        <Link style={{marginLeft: "auto"}}
                        to={
                            user ?
                            (team.hasTeam ? `${routes.myDataChallenges}/${team.IdEquipe}/${team.IdProjet}` : `${routes.teamView}/${team.IdEquipe}`) : 
                            routes.login
                        }
                        >
                            <BasicButton style={{padding: "5px 20px"}}>{(!user ) ? "Participer" : "Dossier"}</BasicButton>
                        </Link>:
                        user.role !== "Administrateur" && <div style={{marginLeft: "auto"}}>
                            <BasicButton onPress={handleCreateTeam} style={{padding: "5px 20px"}}>Participer</BasicButton>
                        </div>
                    }
                </div>}
            </VBox> :
            <MarginContainer margin={"30px"}>
                {globalError ?
                <h2 style={{color: "var(--error)"}}>Erreur : [{globalError}]</h2>
                :
                <Loader/>
                }
            </MarginContainer>
            }
            {redirectToTeamView && <Navigate to={routes.teamView + "/" + team.IdEquipe}/>}
        </CenterContainer>
    );
}

export default DataChallengeDetail;
