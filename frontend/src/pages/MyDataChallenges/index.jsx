import styled from "styled-components";
import routes from "../../utils/routes";
import Button from "../../components/Button";
import BasicButton from "../../components/BasicButton";
import NavbarOffset from "../../components/NavbarOffset";
import { Link } from "react-router-dom";
import VBox from "../../containers/VBox";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

const StyledMyDataChallenge = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 500px;
    margin: auto;

    .data-challenge {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .data-challenge-button {
        transform: scale(1.3);
    }
`;

function MyDataChallenges() {
    const [globalError, setGlobalError] = useState("");
    const [myEvent, setMyEvent] = useState(null);
    const {user} = useAuthContext();
    const {verifyAuth} = useVerifyAuth()

    useEffect(() => {
        const fetchEvenements = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getAllEventsByIdUser/?id=' + user.userId)
    
            try{
                await verifyAuth();
                const json = await response.json();
                if (!response.ok) {     
                    console.log(json.error) 
                    setGlobalError(json.error);
                }
        
                if (response.ok) {
                    console.log(json.Evenements)
                    setMyEvent(json.Evenements)
                }
            }catch{
                await verifyAuth()
                console.log("json is empty")
            }
        }
        fetchEvenements()
    }, [])

    return (
        <StyledMyDataChallenge>
            <h1>Mes data challenges</h1>
            {myEvent &&
            <VBox gap="0">
                {myEvent.map((e, index) => {
                    return (<Button key={index} className="data-challenge" style={{minWidth: "600px", width: "inherit"}}>
                        <h2>{e.Libele}</h2>
                        <Link to={routes.myDataChallenges + "/" + e.IdEquipe + "/" + e.IdProjet}>
                            <BasicButton className="data-challenge-button">
                                Dossier
                            </BasicButton>
                        </Link>
                    </Button>)
                })}
            </VBox>
            }
        </StyledMyDataChallenge>
    );
}

export default MyDataChallenges;
