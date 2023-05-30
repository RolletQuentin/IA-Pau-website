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
import Select from "../../Input/Select";

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



const SignupForm = ({
    title = "Créer Compte",
    icon = true,
    buttonText = "S'enregistrer",
    firstAuth = true,
}) => {

    const {signup, globalError, setGlobalError, emptyField, setEmptyField} = useSignup();
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [level, setLevel] = useState("");
    const [phone, setPhone] = useState("");
    const [school, setSchool] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [numEtudiant, setNumEtudiant] = useState("");

    const handleSubmit = () => {
        if (confirmPassword !== password){
            setEmptyField(['confirmPassword']);
            setGlobalError('les mots de passe ne correspondent pas')

        }else{
            signup(lastname, firstname, level, phone, school, city, email, password, numEtudiant )
        }
    }

    const handlePatch = () => {
        console.log("le J c'est le Q")
    }

    return (
        <SectionAuthContainer title={title} icon={icon} onSubmit={firstAuth ? handleSubmit : handlePatch}>
            {firstAuth && <CenterContainer>
                <HBox gap="10px">
                    <p style={styleDejaCompte}>Déjà un compte?</p>
                    <Link to={routes.login}><p style={styleCreerCompte}>Connectez-vous</p></Link>
                </HBox>
            </CenterContainer>}

            <HBox gap="20px" style={styleOption}>
                <InputTextDefault
                    placeholder="Nom"
                    style={{
                        marginBottom: "20px",
                    }}
                    name="lastname"
                    value={lastname}
                    setValue={setLastname}
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
                />
                <InputTextDefault
                    placeholder="Prénom"
                    style={{ marginBottom: "20px" }}
                    name="firstname"
                    value={firstname}
                    setValue={setFirstname}
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
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
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
                />

                <HBox gap="20px" style={styleOption}>
                    <InputTextDefault
                        placeholder="Numéro étudiant"
                        name="numEtudiant"
                        value={numEtudiant}
                        setValue={setNumEtudiant}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />
                    <InputTextDefault
                        placeholder="Numéro de téléphone"
                        name="phone"
                        value={phone}
                        setValue={setPhone}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />
                </HBox>

                <Select
                    style={{flexGrow: 1}}
                    options={["L1", "L2", "L3", "M1", "M2", "D", "BTS"]}
                    name="level"
                    value={level}
                    setValue={setLevel}
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
                />
            </VBox>

            <HBox gap="20px" style={styleOption}>
                <InputTextDefault
                    placeholder="École"
                    style={{ marginBottom: "20px" }}
                    name="school"
                    value={school}
                    setValue={setSchool}
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
                />
                <InputTextDefault
                    placeholder="Ville"
                    style={{ marginBottom: "20px" }}
                    name="city"
                    value={city}
                    setValue={setCity}
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
                />
            </HBox>

            <VBox style={{ display: "flex" }}>
                <InputTextDefault
                    placeholder="Mot de passe" style={styleInputText}
                    type="password"
                    name="password"
                    value={password}
                    setValue={setPassword}
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
                />
                <InputTextDefault
                    placeholder="Confirmation mot de passe"
                    style={{...styleInputText, marginBottom : "20px"}}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
                />
            </VBox>

            <VBox>
                <CenterContainer>
                    <BasicButton style={{ styleEndButton }}>
                        <h2 style={{ margin: "0" }}>{buttonText}</h2>
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