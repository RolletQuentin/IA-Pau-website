import styled from "styled-components";
import routes from "../../utils/routes";
import Button from "../../components/Button";
import BasicButton from "../../components/BasicButton";
import NavbarOffset from "../../components/NavbarOffset";
import { Link } from "react-router-dom";
import VBox from "../../containers/VBox";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        const fetchEvenements = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getAllEvenements/')
    
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                setMyEvent(json)
            }
        }
        fetchEvenements()
    }, [])

    return (
        <StyledMyDataChallenge>
            <NavbarOffset />
            <h1>Mes data challenges</h1>
            {myEvent && myEvent.Evenements &&
            <VBox>
                {myEvent.Evenements.map((e, index) => {
                    <Button className="data-challenge">
                        <h2>Titre du data challenge</h2>
                        <Link to={routes.teamView}>
                            <BasicButton className="data-challenge-button">
                                Créer équipe
                            </BasicButton>
                        </Link>
                    </Button>
                })}
            </VBox>
            }
        </StyledMyDataChallenge>
    );
}

export default MyDataChallenges;
