import styled from "styled-components";

import DataChallengeItem from "../../components/DataChallengeItem";
import NavbarOffset from "../../components/NavbarOffset";

const StyledHome = styled.div`
    border: 1px solid red;
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
    return (
        <StyledHome>
            <NavbarOffset />
            <h2>Data Challenges</h2>

            <DataChallengeItem title="Data Challenge 1" id="1" />
            <DataChallengeItem title="Data Challenge 2" id="2" />
            <DataChallengeItem title="Data Challenge 3" id="3" />
        </StyledHome>
    );
}

export default Home;
