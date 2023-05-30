import styled from "styled-components";
import routes from "../../utils/routes";

import ButtonLink from "../ButtonLink";
import SectionContainer from "../../containers/SectionContainer";
import BasicButton from "../BasicButton";
import HBox from "../../containers/HBox";
import { Link } from "react-router-dom";

function DataChallengeItem({ id, title }) {
    return (
        <SectionContainer>
            <HBox style={{minWidth: "600px"}} gap="20px">
                <p style={{margin: 0}}>{title}</p>
                <Link to={`${routes.dataChallenge}/${id}`} style={{marginLeft: "auto"}}>
                    <BasicButton style={{height: "min-content", padding: "5px 20px"}}>infos</BasicButton>
                </Link>
            </HBox>
        </SectionContainer>
    );
}

export default DataChallengeItem;
