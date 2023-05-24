import React from "react";
import InputTextDefault from "../../Input/Text/Default";
import VBox from "../../../containers/VBox";
import CenterContainer from "../../../containers/CenterContainer";
import HBox from "../../../containers/HBox";
import CheckBox from "../../Input/CheckBox";
import BasicButton from "../../BasicButton";
import SectionAuthContainer from "../../../containers/SectionAuthContainer";
import routes from "../../../utils/routes";
import { useLogin } from "../../../hooks/auth/useLogin";
import { Link } from "react-router-dom";

const LoginForm = () => {

    const {login} = useLogin();

    const styleOption = {
        justifyContent: "space-between",
    };

    const styleInputText = {
        flexGrow: 1,
    };

    const styleCheckBox = {
        display: "flex",
        alignItems: "center",
    };

    const styleCreerCompte = {
        textDecoration: "underline",
        color: "var(--dark-primary)",
        cursor: "pointer",

        margin: "auto",
        fontSize: "1.75em",
    };

    return (
        <SectionAuthContainer title="Connexion" onSubmit={login}>
            <VBox style={{ display: "flex" }}>
                <InputTextDefault placeholder="Email" style={styleInputText} />
                <InputTextDefault
                    placeholder="Password"
                    style={styleInputText}
                    type="password"
                />
            </VBox>
            <HBox style={styleOption}>
                <HBox>
                    <CheckBox style={styleCheckBox} />
                    <p>Remember me</p>
                </HBox>
                <p>Mot de passe oublié ?</p>
            </HBox>
            <BasicButton
                style={{
                    padding: "20px",
                    width: "100%",
                    borderRadius: "20px",
                }}
            >
                <h1 style={{ margin: "0" }}>Connexion</h1>
            </BasicButton>
            <CenterContainer>
                <VBox gap={0} style={{ alignSelf: "center" }}>
                    <p style={{ marginBottom: 0 }}>Pas encore de compte ?</p>
                    <Link to={routes.signup} style={styleCreerCompte} >
                        Crée un compte
                    </Link>
                </VBox>
            </CenterContainer>
        </SectionAuthContainer>
    );
};

export default LoginForm;
