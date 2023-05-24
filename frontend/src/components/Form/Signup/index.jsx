import React from "react";
import InputTextDefault from "../../Input/Text/Default";
import VBox from "../../../containers/VBox";
import SectionAuthContainer from "../../../containers/SectionAuthContainer";
import HBox from "../../../containers/HBox";
import CenterContainer from "../../../containers/CenterContainer";
import BasicButton from "../../BasicButton";
import styled from "styled-components";

const styleInputText = {
    flexGrow: 1
}


const StyledSelect = styled.select`
    flex-grow: 1;
    border-radius: 10px;
    padding-bottom: 20px;
    background-color: var(--primary);
    padding: 10px;
    border : none;
    color : rgb(117,117,117);
`;



const styleOption = {
    justifyContent: "space-between"

}

const styleCreerCompte = {
    textDecoration: "underline",
    color: "var(--dark-primary)",
    cursor: "pointer",
    marginBottom: 20
}

const styleDejaCompte = {
    color: "var(--dark-primary)",
    cursor: "pointer",
    marginBottom: 20
}

const styleEndButton = {
    padding: "20px",
    width: "100%",
    borderRadius: "20px"
}



const SignupForm = () => {
    return (
        <SectionAuthContainer title="Créer Compte">
            <CenterContainer>
                <HBox>
                    <p style={styleDejaCompte}>Déjà un compte?</p>
                    <p style={styleCreerCompte}>Connectez-vous</p>
                </HBox>
            </CenterContainer>

            <HBox gap="20px" style={styleOption}>
                <InputTextDefault placeholder="Nom" style={{ marginBottom: "20px" }} />
                <InputTextDefault placeholder="Prénom" style={{ marginBottom: "20px" }} />
            </HBox>

            

            <VBox style={{ display: "flex" }}>
                <InputTextDefault placeholder="Email" style={styleInputText} />

                <HBox gap="20px" style={styleOption}>
                <InputTextDefault placeholder="Numéro étudiant"/>
                <InputTextDefault placeholder="Numéro de téléphone"/>
                </HBox>
                <StyledSelect style = {{marginBottom : "20px"}}>
                    <option >Niveau d'étude</option>
                    <option >L1</option>
                    <option >L2</option>
                    <option >L3</option>
                    <option >M1</option>
                    <option >M2</option>
                    <option >Doctorat</option>
                </StyledSelect>
            </VBox>

            <HBox gap="20px" style={styleOption}>
                <InputTextDefault placeholder="École" style={{ marginBottom: "20px" }} />
                <InputTextDefault placeholder="Ville" style={{ marginBottom: "20px" }} />
            </HBox>
            <VBox style={{ display: "flex" }}>
                <InputTextDefault placeholder="Mot de passe" style={styleInputText} type="password" />
                <InputTextDefault placeholder="Confirmation mot de passe" style={{...styleInputText, marginBottom : "20px"}} type="password" />
            </VBox>
            <CenterContainer>
                <BasicButton style={{ styleEndButton }}>
                    <h2 style={{ margin: "0" }}>S'enregistrer</h2>
                </BasicButton>
            </CenterContainer>

        </SectionAuthContainer>
    )
}
export default SignupForm;