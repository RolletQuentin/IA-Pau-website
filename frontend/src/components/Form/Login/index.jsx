import React from "react";
import SectionContainer from "../../../containers/SectionContainer";
import InputTextDefault from "../../Input/Text/Default";
import VBox from "../../../containers/VBox";
import CenterContainer from "../../../containers/CenterContainer";
import HBox from "../../../containers/HBox";
import CheckBox from "../../Input/CheckBox";

const LoginForm = () => {

    const styleOption = {
        justifyContent: "space-between"
    }

    const styleInputText = {
        flexGrow: 1
    }

    const styleCheckBox = {
        display: "flex",
        alignItems: "center"
    }

    const styleCreerCompte = {
        textDecoration: "underline",
        color: "var(--dark-primary)",
        cursor: "pointer",
        margin: 0
    }

    const styleIconAccount = {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100px",
        fill: true
    }



    return (
        <form>
            <SectionContainer style={{position: "relative"}}>
                <img style={styleIconAccount} src="https://fonts.gstatic.com/s/i/short-term/release/materialsymbolssharp/account_circle/fill1/48px.svg" alt="Account Circle Icon" />
                <CenterContainer>
                    <h1>Connexion</h1>
                </CenterContainer>
                <VBox style={{display: "flex"}}>
                    <InputTextDefault placeholder="Email" style={styleInputText}/>
                    <InputTextDefault placeholder="Password" style={styleInputText} type="password"/>
                </VBox>
                <HBox style={styleOption}>
                    <HBox>
                        <CheckBox style={styleCheckBox} />                    
                        <p>Remember me</p>
                    </HBox>
                    <p>Mot de passe oublié ?</p>
                </HBox>
                <CenterContainer>
                    <VBox gap={0}>
                        <p style={{marginBottom: 0}}>Pas encore de compte ?</p>
                        <h2 style={styleCreerCompte}>Crée un compte</h2>
                    </VBox>
                </CenterContainer>
            </SectionContainer>
        </form>
    )
}

export default LoginForm;