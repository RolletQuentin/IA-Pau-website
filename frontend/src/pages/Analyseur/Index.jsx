import React, { useState } from "react";
import NavbarOffset from "../../components/NavbarOffset";
import BasicButton from "../../components/BasicButton";
import SectionContainer from "../../containers/SectionContainer";
import CenterContainer from "../../containers/CenterContainer";
import MarginContainer from "../../containers/MarginContainer";
import VBox from "../../containers/VBox";
import imageMoreInfo from "../../assets/moreInfoAnalyseur.jpg";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const Analyseur = () => {
    const [globalError, setGlobalError] = useState("");
    const [lines, setLines] = useState(null);
    const [responseJSON, setResponseJSON] = useState(null);
    const [responseSEARCH, setResponseSEARCH] = useState(null);

    const readLinesFromFile = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            const lines = [];

            fileReader.onload = (event) => {
                const fileContent = event.target.result;
                const allLines = fileContent.split(/\r\n|\n/);

                allLines.forEach((line) => {
                    lines.push(line);
                });

                resolve(lines);
            };

            fileReader.onerror = (event) => {
                reject(event.target.error);
            };

            fileReader.readAsText(file);
        });
    };

    // Usage
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            readLinesFromFile(selectedFile)
                .then((lines) => {
                    // Process the lines here
                    console.log(lines.join("\n"));
                    setLines(lines);
                })
                .catch((error) => {
                    console.error("Error reading file:", error);
                });
        }
    };

    const handleAnalyse = async () => {
        setGlobalError("");
        if (lines) {
            const response = await fetch(process.env.REACT_APP_JAVA_PATH + "/getdata/", {
                method: "POST",
                body: lines.join("\n"),
            });

            const json = await response.json();

            if (!response.ok) {
                setGlobalError(json.error);
            }

            if (response.ok) {
                console.log(json);
                setResponseJSON(json);
            }
        }
    };

    const handleSearch = async () => {
        setGlobalError("");
        const pattern = document.getElementById("searchBAR").value;
        if (lines && pattern !== "") {
            const response = await fetch(
                process.env.REACT_APP_JAVA_PATH + "/search/?search=" + pattern,
                {
                    method: "POST",
                    body: lines.join("\n"),
                }
            );

            const retour = await response.json();

            if (!response.ok) {
                setGlobalError(retour.error);
                setResponseSEARCH(null);
            }

            if (response.ok) {
                console.log(retour);
                setResponseSEARCH(retour);
            }
        }
    };

    const getSpaceBefore = (str) => {
        let nb = 0;
        let secur = 0;
        while (
            str !== null &&
            str !== "" &&
            str.startsWith(" ") &&
            secur < 30
        ) {
            nb += 10;
            secur++;
            str = str.replace(" ", "");
        }
        return nb;
    };

    return (
        <CenterContainer>
            <NavbarOffset />
            <MarginContainer margin="30px">
                <SectionContainer style={{ width: "80vw" }}>
                    <br></br>
                    <div>
                        <input
                            type="file"
                            id="fileSelector"
                            onChange={handleFileChange}
                            style={{ width: "16%", marginLeft: "42%" }}
                        />
                        {lines && (
                            <BasicButton onPress={handleAnalyse}>
                                Analyser
                            </BasicButton>
                        )}
                    </div>
                    <br></br>
                    <br></br>
                    {responseJSON && (
                        <div>
                            <h1 style={{ textAlign: "center" }}>
                                Rechercher un mot:
                            </h1>
                            <input
                                style={{ width: "10%", marginLeft: "42%" }}
                                id="searchBAR"
                                type="text"
                            />
                            <BasicButton onPress={handleSearch}>
                                Rechercher
                            </BasicButton>
                        </div>
                    )}
                    {responseSEARCH && (
                        <div>
                            <p style={{ textAlign: "center" }}>
                                Le mot <b>{responseSEARCH.Mot}</b> apparait{" "}
                                <b>{responseSEARCH.NbOccurence}</b> fois dans
                                votre fichier.
                            </p>
                        </div>
                    )}
                    {responseJSON && (
                        <div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    style={{ width: "30%" }}
                                    src={imageMoreInfo}
                                    alt="plus d informations"
                                ></img>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>

                            <table
                                style={{
                                    borderCollapse: "collapse",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                <tr>
                                    <td style={{ border: "none" }}>
                                        <h2>
                                            <u>Statistiques détaillées:</u>
                                        </h2>
                                        <div>
                                            <p>
                                                <b>
                                                    Nombre total de lignes:{" "}
                                                    {parseInt(
                                                        responseJSON.NbImport -
                                                            responseJSON.ImportInFonction
                                                    ) +
                                                        parseInt(
                                                            responseJSON.TotalLignesDansFonctions
                                                        ) +
                                                        parseInt(
                                                            responseJSON.NombreLigneCommentaire
                                                        ) +
                                                        parseInt(
                                                            responseJSON.LigneCodeHorsFonction
                                                        )}
                                                </b>
                                            </p>
                                            <p>
                                                -{" "}
                                                {
                                                    responseJSON.NombreLigneCommentaire
                                                }{" "}
                                                commentaires
                                            </p>
                                            <p>
                                                -{" "}
                                                {
                                                    responseJSON.TotalLignesDansFonctions
                                                }{" "}
                                                lignes dans des fonctions
                                            </p>
                                            <p>
                                                -{" "}
                                                {
                                                    responseJSON.LigneCodeHorsFonction
                                                }{" "}
                                                lignes hors fonctions
                                            </p>
                                            <p>
                                                -{" "}
                                                {responseJSON.NbImport -
                                                    responseJSON.ImportInFonction}{" "}
                                                librairies importées (+
                                                {
                                                    responseJSON.ImportInFonction
                                                }{" "}
                                                import dans des fonctions)
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        style={{ border: "none", width: "60%" }}
                                    >
                                        <Pie
                                            data={{
                                                labels: [
                                                    "Commentaires",
                                                    "Fonctions",
                                                    "Hors fonctions",
                                                    "Import",
                                                ],
                                                datasets: [
                                                    {
                                                        label: "Lignes",
                                                        data: [
                                                            responseJSON.NombreLigneCommentaire,
                                                            responseJSON.TotalLignesDansFonctions,
                                                            responseJSON.LigneCodeHorsFonction,
                                                            responseJSON.NbImport -
                                                                responseJSON.ImportInFonction,
                                                        ],
                                                        backgroundColor: [
                                                            "#FF6384",
                                                            "#36A2EB",
                                                            "#FFCE56",
                                                            "#A3AB56",
                                                        ],
                                                    },
                                                ],
                                            }}
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    )}
                    {responseJSON && responseJSON.NbFonctions > 0 && (
                        <div>
                            <table
                                style={{
                                    borderCollapse: "collapse",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                <tr>
                                    <td
                                        style={{ border: "none", width: "60%" }}
                                    >
                                        <Pie
                                            data={{
                                                labels: responseJSON.Fonctions.map(
                                                    (fonction) => fonction.Nom
                                                ),
                                                datasets: [
                                                    {
                                                        label: "Nombre de lignes",
                                                        data: responseJSON.Fonctions.map(
                                                            (fonction) =>
                                                                fonction.NbLignes
                                                        ),
                                                        backgroundColor: [
                                                            "#FF6384",
                                                            "#36A2EB",
                                                            "#FFCE56",
                                                            "#A3AB56",
                                                            "#B3AB56",
                                                            "#C3AB56",
                                                            "#D3AB56",
                                                            "#E3AB56",
                                                        ],
                                                    },
                                                ],
                                            }}
                                        />
                                    </td>
                                    <td style={{ border: "none" }}>
                                        <h2>
                                            <u>
                                                Fonctions créées - (lignes:{" "}
                                                {
                                                    responseJSON.TotalLignesDansFonctions
                                                }
                                                )
                                            </u>
                                        </h2>
                                        {responseJSON.Fonctions.map(
                                            (fonction, index) => (
                                                <div>
                                                    <p>
                                                        {index + 1}.{" "}
                                                        <b>{fonction.Nom}:</b> -
                                                        (lignes:{" "}
                                                        {fonction.NbLignes})
                                                    </p>
                                                </div>
                                            )
                                        )}
                                        <p>
                                            Longueur minimum:{" "}
                                            {responseJSON.MinLigneFonctions}
                                        </p>
                                        <p>
                                            Longueur maximum:{" "}
                                            {responseJSON.MaxLigneFonctions}
                                        </p>
                                        <p>
                                            Longueur moyenne:{" "}
                                            {Math.round(
                                                responseJSON.MoyLigneFonctions *
                                                    100
                                            ) / 100}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    )}
                    {responseJSON && responseJSON.NbImport > 0 && (
                        <div>
                            <br></br>
                            <br></br>
                            <h2>
                                <u>
                                    Librairies importées - (lignes:{" "}
                                    {responseJSON.NbImport})
                                </u>
                            </h2>
                            {responseJSON.Import.map((library, index) => (
                                <p>- {library} </p>
                            ))}
                        </div>
                    )}
                    {lines && (
                        <VBox>
                            <h1>
                                <u>Votre code:</u>
                            </h1>
                            <div
                                style={{
                                    backgroundColor: "#1515",
                                    borderStyle: "outset",
                                    borderColor: "gray",
                                    borderRadius: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        width: "94%",
                                        height: "94%",
                                        paddingLeft: "3%",
                                        paddingTop: "3%",
                                        paddingRight: "3%",
                                        paddingBottom: "3%",
                                    }}
                                >
                                    <code>
                                        {lines.map((line, index) => (
                                            <div
                                                style={{
                                                    paddingLeft:
                                                        getSpaceBefore(line) +
                                                        "px",
                                                }}
                                                key={index}
                                            >
                                                {line}
                                            </div>
                                        ))}
                                    </code>
                                </div>
                            </div>
                        </VBox>
                    )}
                </SectionContainer>
            </MarginContainer>
        </CenterContainer>
    );
};

export default Analyseur;
