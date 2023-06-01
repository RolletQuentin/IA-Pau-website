import NavbarOffset from "../../components/NavbarOffset";
import Messagerie from "../../components/Messagerie";
import styled from "styled-components";
import Button from "../../components/Button";
import Project from "../../components/Project";
import Ressource from "../../components/Ressources";
import Team from "../../components/Team";
import Questionnaire from "../../components/Questionnaire";

const StyledDataChallengeRendu = styled.div`
    width: 900px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .main {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 20px;
    }

    & .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
        height: 100%;
    }

    & .left > div {
        margin-bottom: 20px;
    }

    & .messagerie {
        flex: 1;
        height: 100%;
    }
`;

function DataChallengeRendu() {
    return (
        <StyledDataChallengeRendu>
            <div className="main">
                <div className="left">
                    <Project />
                    <Ressource />
                    <Team />
                    <Questionnaire />
                </div>
                <Messagerie className="messagerie" />
            </div>
        </StyledDataChallengeRendu>
    );
}

export default DataChallengeRendu;
