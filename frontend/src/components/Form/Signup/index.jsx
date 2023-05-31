import React, { useEffect, useState } from "react";
import InputTextDefault from "../../Input/Text/Default";
import VBox from "../../../containers/VBox";
import SectionAuthContainer from "../../../containers/SectionAuthContainer";
import HBox from "../../../containers/HBox";
import CenterContainer from "../../../containers/CenterContainer";
import BasicButton from "../../BasicButton";
import styled from "styled-components";
import { useSignup } from "../../../hooks/auth/useSignup";
import MarginContainer from "../../../containers/MarginContainer";
import { Link, useParams } from "react-router-dom";
import routes from "../../../utils/routes";
import Select from "../../Input/Select";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { togglePatch } from "../../../toggles/togglePatch";
import { togglePost } from "../../../toggles/togglePost";

const styleInputText = {
    flexGrow: 1,
};

const StyledSelect = styled.select`
    flex-grow: 1;
    border-radius: 10px;
    padding-bottom: 20px;
    background-color: var(--primary);
    padding: 10px;
    border: none;
    color: rgb(117, 117, 117);
`;

const styleOption = {
    justifyContent: "space-between",
};

const styleCreerCompte = {
    textDecoration: "underline",
    color: "var(--dark-primary)",
    cursor: "pointer",
    marginBottom: 20,
};

const styleDejaCompte = {
    color: "var(--dark-primary)",
    cursor: "pointer",
    marginBottom: 20,
};

const styleEndButton = {
    padding: "20px",
    width: "100%",
    borderRadius: "20px",
};

const SignupForm = ({
    title = "Créer Compte",
    icon = true,
    buttonText = "S'enregistrer",
    firstAuth = true,
}) => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const { signup, globalError, setGlobalError, emptyField, setEmptyField } =
        useSignup();

    // for all users
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Etudiant");

    // for students
    const [level, setLevel] = useState("");
    const [school, setSchool] = useState("");
    const [numEtudiant, setNumEtudiant] = useState("");

    // for gestionnaires
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [company, setCompany] = useState("");

    // for gestionnaires & student
    const [city, setCity] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        console.log("start");
        console.log(firstAuth);
        console.log(id);
        console.log(user);
        if (!firstAuth && id !== undefined && user) {
            const fetchData = async () => {
                try {
                    console.log("ouiii");
                    const response = await fetch(
                        process.env.REACT_APP_PROXY + `/api/user/?id=${id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + user.jwt,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    setLastname(json.lastname);
                    setFirstname(json.firstname);
                    setEmail(json.email);
                    setPhone(json.phone);
                    setRole(json.role);

                    switch (role) {
                        case "Etudiant":
                            setLevel(json.level);
                            setSchool(json.school);
                            setCity(json.city);
                            setNumEtudiant(json.studentid);
                            break;

                        case "Gestionnaire":
                            setCity(json.city);
                            setStart(json.start);
                            setEnd(json.end);
                            setCompany(json.company);
                            break;

                        default:
                            break;
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstAuth, id, user]);

    const handleSubmit = () => {
        if (confirmPassword !== password) {
            setEmptyField(["confirmPassword"]);
            setGlobalError("les mots de passe ne correspondent pas");
        } else {
            signup(
                lastname,
                firstname,
                level,
                phone,
                school,
                city,
                email,
                password,
                numEtudiant
            );
        }
    };

    const handlePatch = () => {
        // user is not created
        if (user.role === "Administrateur" && id === undefined) {
            if (confirmPassword !== password) {
                setEmptyField(["confirmPassword"]);
                setGlobalError("les mots de passe ne correspondent pas");
            } else if (role === "Etudiant") {
                togglePost(
                    process.env.REACT_APP_PROXY + "/api/user/signup/",
                    user,
                    {
                        lastname,
                        firstname,
                        level,
                        phone,
                        school,
                        city,
                        email,
                        password,
                        numEtudiant,
                    }
                );
            } else {
                togglePost(
                    process.env.REACT_APP_PROXY +
                        "/api/user/createGestionnaire/",
                    user,
                    {
                        lastname,
                        firstname,
                        phone,
                        company,
                        city,
                        email,
                        password,
                        start,
                        end,
                    }
                );
            }
        } else {
            togglePatch(
                process.env.REACT_APP_PROXY + `/api/user/?id=${id}`,
                user,
                {
                    lastname,
                    firstname,
                    level,
                    phone,
                    school,
                    city,
                    email,
                    numEtudiant,
                }
            );
        }
    };

    return (
        <SectionAuthContainer
            title={title}
            icon={icon}
            onSubmit={firstAuth ? handleSubmit : handlePatch}
        >
            {firstAuth && (
                <CenterContainer>
                    <HBox gap="10px">
                        <p style={styleDejaCompte}>Déjà un compte?</p>
                        <Link to={routes.login}>
                            <p style={styleCreerCompte}>Connectez-vous</p>
                        </Link>
                    </HBox>
                </CenterContainer>
            )}

            {!firstAuth && user && user.role === "Administrateur" && (
                <Select
                    style={{ flexGrow: 1 }}
                    options={["Etudiant", "Gestionnaire", "Administrateur"]}
                    name="level"
                    value={role}
                    setValue={setRole}
                    emptyField={emptyField}
                    setEmptyField={setEmptyField}
                />
            )}

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

                {role === "Etudiant" && (
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
                )}

                {role === "Etudiant" && (
                    <Select
                        style={{ flexGrow: 1 }}
                        options={["L1", "L2", "L3", "M1", "M2", "D", "BTS"]}
                        name="level"
                        value={level}
                        setValue={setLevel}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />
                )}
            </VBox>

            <HBox gap="20px" style={styleOption}>
                {role === "Etudiant" && (
                    <InputTextDefault
                        placeholder="École"
                        style={{ marginBottom: "20px" }}
                        name="school"
                        value={school}
                        setValue={setSchool}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />
                )}

                {role === "Gestionnaire" && (
                    <InputTextDefault
                        placeholder="Entreprise"
                        style={{ marginBottom: "20px" }}
                        name="company"
                        value={company}
                        setValue={setCompany}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />
                )}

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

            {role === "Gestionnaire" && (
                <HBox gap="20px" style={styleOption}>
                    <InputTextDefault
                        placeholder="Date de début"
                        style={{ marginBottom: "20px" }}
                        name="start"
                        value={start}
                        setValue={setStart}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />

                    <InputTextDefault
                        placeholder="Date de fin"
                        style={{ marginBottom: "20px" }}
                        name="end"
                        value={end}
                        setValue={setEnd}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />
                </HBox>
            )}

            {(firstAuth ||
                (user &&
                    user.role === "Administrateur" &&
                    id === undefined)) && (
                <VBox style={{ display: "flex" }}>
                    <InputTextDefault
                        placeholder="Mot de passe"
                        style={styleInputText}
                        type="password"
                        name="password"
                        value={password}
                        setValue={setPassword}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />
                    <InputTextDefault
                        placeholder="Confirmation mot de passe"
                        style={{ ...styleInputText, marginBottom: "20px" }}
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        emptyField={emptyField}
                        setEmptyField={setEmptyField}
                    />
                </VBox>
            )}

            <VBox>
                <CenterContainer>
                    <BasicButton style={{ styleEndButton }}>
                        <h2 style={{ margin: "0" }}>{buttonText}</h2>
                    </BasicButton>
                </CenterContainer>
                {globalError && (
                    <CenterContainer style={{ color: "var(--error" }}>
                        {globalError}
                    </CenterContainer>
                )}
            </VBox>
        </SectionAuthContainer>
    );
};
export default SignupForm;
