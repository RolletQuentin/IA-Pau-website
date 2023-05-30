import SectionContainer from "../../containers/SectionContainer";
import NavbarOffset from "../../components/NavbarOffset";
import BasicButton from "../../components/BasicButton";
import VBox from "../../containers/VBox";
import CenterContainer from "../../containers/CenterContainer";
import { useEffect, useState } from "react";
import { Loader } from "../../utils/Atoms";
import MarginContainer from "../../containers/MarginContainer";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import routes from "../../utils/routes";

function DataChallengeDetail() {
    const [globalError, setGlobalError] = useState("")
    const [team, setTeam] = useState(null)
    const [data_challenge, setDataChallenge] = useState(null);
    const {id} = useParams();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchDataChallengeData = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getEvenement/?id=' + id)
    
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                setDataChallenge(json)
            }
        }
        const fetchHasTeam = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/me/?IdEvent=' + id)
            const json = await response.json();

            if (response.ok) {
                setTeam({...json, hasTeam: true});
            }else{
                setTeam({hasTeam: false})
            }

        }
        fetchDataChallengeData();
        fetchHasTeam();
    }, [])

    return (
        <CenterContainer>
            <NavbarOffset/>
            {data_challenge ? 
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
                </SectionContainer>
                {(!user || (team && user)) && <div style={{display: "flex"}}>
                    <Link style={{marginLeft: "auto"}}
                        to={
                            user ?
                            (team.hasTeam ? `${routes.myDataChallenges}/${team.IdEquipe}/${team.IdProjet}` : `${routes.teamView}/${team.IdEquipe}`) : 
                            routes.login
                        }
                    >
                        <BasicButton style={{padding: "5px 20px"}}>{(!user || (user && !team.hasTeam)) ? "Participer" : "Dossier"}</BasicButton>
                    </Link>
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
        </CenterContainer>
    );
}

export default DataChallengeDetail;
