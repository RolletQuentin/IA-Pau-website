import styled from "styled-components";

import DataChallengeItem from "../../components/DataChallengeItem";
import NavbarOffset from "../../components/NavbarOffset";
import VBox from "../../containers/VBox";
import { useEffect, useState } from "react";

const StyledHome = styled.div`
    width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .data-challenge {
        background: red;
        margin: 10px 0px 10px 0px;
    }
`;

function Home() {

    const [globalError, setGlobalError] = useState("");
    const [evenements, setEvenements] = useState(null);

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
                setEvenements(json)
            }
        }
        fetchEvenements()
    }, [])

    return (
        <StyledHome>
            <NavbarOffset />
            <h2>Data Challenges</h2>
            {evenements && evenements.Evenements && <VBox>
                {evenements.Evenements.map((e, index) => {
                    return (
                        <DataChallengeItem key={index} title={e.Libele} id={e.IdEvenement} />
                    )
                })}
            </VBox>}
        </StyledHome>
    );
}

export default Home;
