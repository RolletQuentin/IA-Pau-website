import styled from "styled-components";

import DataChallengeItem from "../../components/DataChallengeItem";
import NavbarOffset from "../../components/NavbarOffset";
import VBox from "../../containers/VBox";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import BasicButton from "../../components/BasicButton";
import routes from "../../utils/routes";
import { Link } from "react-router-dom";


const StyledHome = styled.div`
    width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .data-challenge {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .data-challenge-button {
        transform: scale(1.3);
    }
`;

function Home() {
    const [globalError, setGlobalError] = useState("");
    const [evenements, setEvenements] = useState(null);

    useEffect(() => {
        const fetchEvenements = async () => {
            setGlobalError("");
            const response = await fetch(
                process.env.REACT_APP_PROXY +
                    "/api/evenements/getAllEvenements/"
            );

            const json = await response.json();
            if (!response.ok) {
                console.log(json.error);
                setGlobalError(json.error);
            }

            if (response.ok) {
                setEvenements(json);
            }
        };
        fetchEvenements();
    }, []);

    return (
        <StyledHome>
            <NavbarOffset />
            <h1>Data Challenges</h1>

            {evenements && evenements.Evenements && <VBox gap="0">
                {evenements.Evenements.map((e, index) => {
                    return (
                        <Button key={index} className="data-challenge" style={{minWidth: "600px"}}>
                        <h2>{e.Libele}</h2>
                        <Link to={`${routes.dataChallenge}/${e.IdEvenement}`}>
                            <BasicButton className="data-challenge-button">
                                Infos
                            </BasicButton>
                        </Link>
                    </Button>
                    )
                })}
            </VBox>}
        </StyledHome>
    );
}

export default Home;
