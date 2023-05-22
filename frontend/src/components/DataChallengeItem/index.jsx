import styled from "styled-components";
import routes from "../../utils/routes";

import ButtonLink from "../ButtonLink";

const StyledDataChallengeItem = styled.div`
    width: 100%;
    margin: 20px 0px;
`;

function DataChallengeItem({ id, title }) {
    return (
        <StyledDataChallengeItem>
            <ButtonLink
                className="data-challenge"
                to={`${routes.dataChallenge}/${id}`}
            >
                {title}
            </ButtonLink>
        </StyledDataChallengeItem>
    );
}

export default DataChallengeItem;
