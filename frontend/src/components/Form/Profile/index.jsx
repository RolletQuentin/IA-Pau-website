import React from "react";
import InputTextDefault from "../../Input/Text/Default";
import VBox from "../../../containers/VBox";
import SectionAuthContainer from "../../../containers/SectionAuthContainer";
import HBox from "../../../containers/HBox";
import CenterContainer from "../../../containers/CenterContainer";
import BasicButton from "../../BasicButton";
import styled from "styled-components";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";


const StyledSelect = styled.select`
    flex-grow: 1;
    border-radius: 10px;
    padding-bottom: 20px;
    background-color: var(--primary);
    padding: 10px;
    border : none;
    color : rgb(117,117,117);
`;


const styleInputText = {
    flexGrow: 1
}

const styleOption = {
    justifyContent: "space-between"

}

const styleEndButton = {
    padding: "20px",
    width: "100%",
    borderRadius: "20px"
}


const ProfileForm = () => {
    const {user} = useAuthContext();

    return (
        
        <SectionAuthContainer title="Profil">
            <VBox style={{ display: "flex" }}>
                <InputTextDefault placeholder="Photo" style={styleInputText}/>
                <InputTextDefault placeholder="Description" style={{...styleInputText, marginBottom : "20px"}}/>
            </VBox>
            <HBox gap="20px" style={styleOption}>
                <InputTextDefault placeholder="Nom" style={{ marginBottom: "20px" }} />
                <InputTextDefault placeholder="Prénom" style={{ marginBottom: "20px" }} />
            </HBox>

            <VBox style={{ display: "flex" }}>
                <InputTextDefault placeholder="Email" style={styleInputText } />
               

                {user.role !== "Administrateur" && (
                <>
                    <StyledSelect style={{ marginBottom: "20px" }}>
                    <option>Niveau d'étude</option>
                    <option>L1</option>
                    <option>L2</option>
                    <option>L3</option>
                    <option>M1</option>
                    <option>M2</option>
                    <option>Doctorat</option>
                    </StyledSelect>
                </>
                )}

                {user.role === "Administrateur" && (
                    <InputTextDefault placeholder="Entreprise" style={{...styleInputText, marginBottom : "20px"}}/>
                )}


            </VBox>
            <HBox gap="20px" style={styleOption}>



            {user.role !== "Administrateur" && (
                <>
                <InputTextDefault placeholder="École" style={{ marginBottom: "20px" }} />
                </>
            )}

            <InputTextDefault placeholder="Ville" style={{ marginBottom: "20px" }} />
            </HBox>
            <VBox style={{ display: "flex" }}>
                <InputTextDefault placeholder="Numéro de téléphone" style={styleInputText}/>
                <InputTextDefault placeholder="Mot de passe" style={styleInputText} type="password"/>
                <InputTextDefault placeholder="Confirmer mot de passe" style={{...styleInputText, marginBottom : "20px"}} type="password"/>
            </VBox>

            <CenterContainer>
                <BasicButton style={{ styleEndButton }}>
                    <h2 style={{ margin: "0" }}>S'enregistrer</h2>
                </BasicButton>
            </CenterContainer>

     
        </SectionAuthContainer>
        
        

        
    )
}

export default ProfileForm;


  
