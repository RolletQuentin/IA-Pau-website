import React, { useState } from "react";
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
import MarginContainer from "../../../containers/MarginContainer";

const LoginForm = ({
    defaultRememberMe = false
}) => {
    const {login, globalError, setEmptyField, emptyField} = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [rememberMe, setRememberMe] = useState(defaultRememberMe);

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
        <SectionAuthContainer title="Connexion" onSubmit={() => login(email, password, rememberMe)}>
            <VBox style={{ display: "flex" }}>
                <InputTextDefault
                    placeholder="Email"
                    style={styleInputText}
                    type="email"
                    name="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputTextDefault
                    placeholder="Password"
                    style={styleInputText}
                    type="password"
                    name="password"
                    value={password}
                    setValue={setPassword}
                />
            </VBox>
            <HBox style={styleOption}>
                <HBox>
                    <CheckBox style={styleCheckBox} defaultState={rememberMe} setDefaultState={setRememberMe}/>
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
            {globalError && <CenterContainer style={{color: "var(--error"}}><MarginContainer margin={"30px"}>
                {globalError}
            </MarginContainer></CenterContainer>}
            <CenterContainer>
                <VBox gap={0} style={{ alignSelf: "center" }}>
                    <p style={{ margin: 0 }}>Pas encore de compte ?</p>
                    <Link to={routes.signup} style={styleCreerCompte} >
                        Crée un compte
                    </Link>
                </VBox>
            </CenterContainer>
        </SectionAuthContainer>
    );
};

export default LoginForm;
