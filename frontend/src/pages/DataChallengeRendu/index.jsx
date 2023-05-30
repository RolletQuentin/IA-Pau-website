import React, { useState } from "react";
import NavbarOffset from "../../components/NavbarOffset";
import CenterContainer from "../../containers/CenterContainer";
import SectionContainer from "../../containers/SectionContainer";
import VBox from "../../containers/VBox";
import HBox from "../../containers/HBox";
import BasicButton from "../../components/BasicButton";

function DataChallengeRendu() {
    const data_challenge = {
        id: 1,
        title: "Titre du data challenge",
        content: "Contenu du data challenge",
    };
    return (
        <>
            <NavbarOffset />
            <CenterContainer>
                <h2>{data_challenge.title}</h2>
                <SectionContainer style={{ marginBottom: "20px" }}>
                    <span>Ressources Projet</span>
                    <VBox style={{ marginLeft: "150px" }}>
                        <span>• description, données, consignes, conseils</span>
                        <span>• elements2</span>
                    </VBox>
                </SectionContainer>
                <SectionContainer style={{ marginBottom: "20px" }}>
                    <span>Elements que l'on peut remplir</span>
                    <VBox style={{ marginLeft: "150px" }}>
                        <span>
                            • titre projet, description equipe, lien gitHub
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
                                    style={{ backgroundColor: "#E85050" }}
                                >
                                    <a>Questionnaire 2</a>
                                </BasicButton>
                            </HBox>
                            <HBox gap="150px">
                                <BasicButton
                                    style={{ backgroundColor: "#E8BD50" }}
                                >
                                    <a>Questionnaire 3</a>
                                </BasicButton>

                                <BasicButton
                                    style={{ backgroundColor: "#829A94" }}
                                >
                                    <a>Questionnaire 4</a>
                                </BasicButton>
                            </HBox>
                        </VBox>
                    </CenterContainer>
                </SectionContainer>
            </CenterContainer>
        </>
    );
}

export default DataChallengeRendu;
