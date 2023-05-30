import SectionContainer from "../../containers/SectionContainer";
import NavbarOffset from "../../components/NavbarOffset";
import BasicButton from "../../components/BasicButton";
import VBox from "../../containers/VBox";
import CenterContainer from "../../containers/CenterContainer";
import { useEffect, useState } from "react";
import { Loader } from "../../utils/Atoms";
import MarginContainer from "../../containers/MarginContainer";

function DataChallengeDetail() {
    const [globalError, setGlobalError] = useState("")
    const [data_challenge, setDataChallenge] = useState(null);

    useEffect(() => {
        const fetchDataChallengeData = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getEvenement/?id=' + 1)
    
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                setDataChallenge(json)
            }
        }
        fetchDataChallengeData()
    }, [])

    return (
        <CenterContainer>
            <NavbarOffset/>
            {data_challenge ? 
            <VBox style={{
                width: "80vw",
            }}>
                <NavbarOffset />
                <CenterContainer>
                    <h1>{data_challenge.title}</h1>
                </CenterContainer>
                <SectionContainer>
                    <span>{data_challenge.content}</span>
                </SectionContainer>
                <div style={{display: "flex"}}>
                    <BasicButton style={{padding: "5px 20px", marginLeft: "auto"}}>Participer</BasicButton>
                </div>
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
