import styled from "styled-components";
import routes from "../../utils/routes";
import Button from "../../components/Button";
import BasicButton from "../../components/BasicButton";
import NavbarOffset from "../../components/NavbarOffset";
import { Link } from "react-router-dom";

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
    return (
        <StyledMyDataChallenge>
            <NavbarOffset />
            <h1>Mes data challenges</h1>

            <Button className="data-challenge">
                <h2>Titre du data challenge</h2>
                <Link to={routes.teamView}>
                    <BasicButton className="data-challenge-button">
                        Créer équipe
                    </BasicButton>
                </Link>
            </Button>

            <Button className="data-challenge">
                <h2>Titre du data challenge</h2>
                <Link to={routes.dataChallenge}>
                    <BasicButton className="data-challenge-button">
                        Dossier
                    </BasicButton>
                </Link>
            </Button>
        </StyledMyDataChallenge>
    );
}

export default MyDataChallenges;
