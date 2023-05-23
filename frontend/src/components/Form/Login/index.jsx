import React from "react";
import SectionContainer from "../../../containers/SectionContainer";
import InputTextDefault from "../../Input/Text/Default";
import VBox from "../../../containers/VBox";
import CenterContainer from "../../../containers/CenterContainer";
import HBox from "../../../containers/HBox";
import CheckBox from "../../Input/CheckBox";
import MarginContainer from "../../../containers/MarginContainer";
import BasicButton from "../../BasicButton";

const LoginForm = ({
    iconWidth = 100
}) => {

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
        width: iconWidth,
        fill: true
    }



    return (
        <form>
            <MarginContainer margin="30px">
                <SectionContainer style={{position: "relative", marginTop: iconWidth / 2}}>
                    <img style={styleIconAccount} src="https://cdn.discordapp.com/attachments/1107599629882765374/1110304728212062208/abstract-user-icon-31.png" alt="Account Circle Icon" />
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
                    <BasicButton style={{
                        padding: "20px",
                        width: "100%",
                        borderRadius: "20px"
                    }}>
                        <h1 style={{margin: "0"}}>Connexion</h1>
                    </BasicButton>
                    <CenterContainer>
                        <VBox gap={0}>
                            <p style={{marginBottom: 0}}>Pas encore de compte ?</p>
                            <h2 style={styleCreerCompte}>Crée un compte</h2>
                        </VBox>
                    </CenterContainer>
                </SectionContainer>
            </MarginContainer>
        </form>
    )
}

export default LoginForm;