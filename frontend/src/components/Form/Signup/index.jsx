import React, { useState } from "react";
import InputTextDefault from "../../Input/Text/Default";
import VBox from "../../../containers/VBox";
import SectionAuthContainer from "../../../containers/SectionAuthContainer";
import HBox from "../../../containers/HBox";
import CenterContainer from "../../../containers/CenterContainer";
import BasicButton from "../../BasicButton";
import styled from "styled-components";
import { useSignup } from "../../../hooks/auth/useSignup";
import MarginContainer from "../../../containers/MarginContainer";
import { Link } from "react-router-dom";
import routes from "../../../utils/routes";

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

    const {signup, globalError, emptyField, setEmptyField} = useSignup();
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [level, setLevel] = useState("ing1");
    const [phone, setPhone] = useState("");
    const [school, setSchool] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [numEtudiant, setNumEtudiant] = useState("");

    return (
        <SectionAuthContainer title="Créer Compte" onSubmit={() => signup(lastname, firstname, level, phone, school, city, email, password, numEtudiant )}>
            <CenterContainer>
                <HBox gap="10px">
                    <p style={styleDejaCompte}>Déjà un compte?</p>
                    <Link to={routes.login}><p style={styleCreerCompte}>Connectez-vous</p></Link>
                </HBox>
            </CenterContainer>

            <HBox gap="20px" style={styleOption}>
                <InputTextDefault
                    placeholder="Nom"
                    emptyField={emptyField}
                    style={{
                        marginBottom: "20px",
                    }}
                    name="lastname"
                    value={lastname}
                    setValue={setLastname}
                    setEmptyField={setEmptyField}
                />
                <InputTextDefault
                    placeholder="Prénom"
                    style={{ marginBottom: "20px" }}
                    name="firstname"
                    value={firstname}
                    setValue={setFirstname}
                />
            </HBox>

            <VBox style={{ display: "flex" }}>
                <InputTextDefault
                    placeholder="Email"
                    style={styleInputText}
                    type="email"
                    name="email"
                    value={email}
                    setValue={setEmail}
                />

                <HBox gap="20px" style={styleOption}>
                    <InputTextDefault
                        placeholder="Numéro étudiant"
                        name="numEtudiant"
                        value={numEtudiant}
                        setValue={setNumEtudiant}
                    />
                    <InputTextDefault
                        placeholder="Numéro de téléphone"
                        name="phone"
                        value={phone}
                        setValue={setPhone}
                    />
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
                <InputTextDefault
                    placeholder="École"
                    style={{ marginBottom: "20px" }}
                    name="school"
                    value={school}
                    setValue={setSchool}
                    
                />
                <InputTextDefault
                    placeholder="Ville"
                    style={{ marginBottom: "20px" }}
                    name="city"
                    value={city}
                    setValue={setCity}
                />
            </HBox>

            <VBox style={{ display: "flex" }}>
                <InputTextDefault
                    placeholder="Mot de passe" style={styleInputText}
                    type="password"
                    name="password"
                    value={password}
                    setValue={setPassword}
                />
                <InputTextDefault
                    placeholder="Confirmation mot de passe"
                    style={{...styleInputText, marginBottom : "20px"}}
                    type="password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                />
            </VBox>

            <VBox>
                <CenterContainer>
                    <BasicButton style={{ styleEndButton }}>
                        <h2 style={{ margin: "0" }}>S'enregistrer</h2>
                    </BasicButton>
                </CenterContainer>
                {globalError && <CenterContainer style={{color: "var(--error"}}>
                    {globalError}
                </CenterContainer>}
            </VBox>

        </SectionAuthContainer>
    )
}
export default SignupForm;