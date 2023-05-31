import React, { useState } from "react";
import NavbarOffset from "../../components/NavbarOffset";
import CenterContainer from "../../containers/CenterContainer";
import SectionContainer from "../../containers/SectionContainer";
import VBox from "../../containers/VBox";
import HBox from "../../containers/HBox";
import BasicButton from "../../components/BasicButton";
import Messagerie from "../../components/Messagerie";
import styled from "styled-components";

const StyledDataChallengeRendu = styled.div`
    & .messagerie {
        margin: 70px 20px 20px 20px;
    }
`;

function DataChallengeRendu() {
    const data_challenge = {
        id: 1,
        title: "Titre du data challenge",
        content: "Contenu du data challenge",
    };
    return (
        <StyledDataChallengeRendu>
            <NavbarOffset />
            <CenterContainer>
                <HBox>
                    <CenterContainer>
                        <h2>{data_challenge.title}</h2>
                        <SectionContainer style={{ marginBottom: "20px" }}>
                            <span>Ressources Projet</span>
                            <VBox style={{ marginLeft: "150px" }}>
                                <span>
                                    • description, données, consignes, conseils
                                </span>
                                <span>• elements2</span>
                            </VBox>
                        </SectionContainer>
                        <SectionContainer style={{ marginBottom: "20px" }}>
                            <span>Elements que l'on peut remplir</span>
                            <VBox style={{ marginLeft: "150px" }}>
                                <span>
                                    • titre projet, description equipe, lien
                                    gitHub
                                </span>
                                <span>• elements2</span>
                            </VBox>
                        </SectionContainer>
                        <SectionContainer>
                            <CenterContainer>
                                <VBox>
                                    <HBox gap="150px">
                                        <BasicButton>
                                            <a>Questionnaire 1</a>
                                        </BasicButton>

                                        <BasicButton
                                            style={{
                                                backgroundColor: "#E85050",
                                            }}
                                        >
                                            <a>Questionnaire 2</a>
                                        </BasicButton>
                                    </HBox>
                                    <HBox gap="150px">
                                        <BasicButton
                                            style={{
                                                backgroundColor: "#E8BD50",
                                            }}
                                        >
                                            <a>Questionnaire 3</a>
                                        </BasicButton>

                                        <BasicButton
                                            style={{
                                                backgroundColor: "#829A94",
                                            }}
                                        >
                                            <a>Questionnaire 4</a>
                                        </BasicButton>
                                    </HBox>
                                </VBox>
                            </CenterContainer>
                        </SectionContainer>
                    </CenterContainer>
                    <Messagerie className="messagerie" />
                </HBox>
            </CenterContainer>
        </StyledDataChallengeRendu>
    );
}

export default DataChallengeRendu;
