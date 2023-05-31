import styled from "styled-components";
import routes from "../../utils/routes";
import Button from "../../components/Button";
import BasicButton from "../../components/BasicButton";
import NavbarOffset from "../../components/NavbarOffset";
import { Link } from "react-router-dom";
import VBox from "../../containers/VBox";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

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

    useEffect(() => {
        const fetchEvenements = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getAllEventsByIdUser/?id=' + user.userId)
    
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                console.log(json.Evenements)
                setMyEvent(json.Evenements)
            }
        }
        fetchEvenements()
    }, [])

    return (
        <StyledMyDataChallenge>
            <NavbarOffset />
            <h1>Mes data challenges</h1>
            {myEvent &&
            <VBox>
                {myEvent.map((e, index) => {
                    return (<Button key={index} className="data-challenge" style={{minWidth: "600px"}}>
                        <h2>{e.Libele}</h2>
                        <Link to={routes.myDataChallenges + "/" + 3 + "/" + e.IdEvenement}>
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
