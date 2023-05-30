import styled from "styled-components";

import DataChallengeItem from "../../components/DataChallengeItem";
import NavbarOffset from "../../components/NavbarOffset";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../utils/Atoms";
import VBox from "../../containers/VBox";

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
    const { data, isLoading } = useFetch(
        process.env.REACT_APP_PROXY + "api/event/"
    );
    return (
        <StyledHome>
            <NavbarOffset />
            <h2>Data Challenges</h2>
            <VBox>
                <DataChallengeItem title="Data Challenge 1" id="1" />
                <DataChallengeItem title="Data Challenge 2" id="2" />
                <DataChallengeItem title="Data Challenge 3" id="3" />
            </VBox>
        </StyledHome>
    );
}

export default Home;
