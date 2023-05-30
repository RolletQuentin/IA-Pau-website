import React, { useEffect, useState } from "react";
import NavbarOffset from "../../components/NavbarOffset";
import BasicButton from "../../components/BasicButton";
import SectionContainer from "../../containers/SectionContainer";
import CenterContainer from "../../containers/CenterContainer";
import MarginContainer from "../../containers/MarginContainer";
import VBox from "../../containers/VBox";

const Analyseur = () => {
  const [globalError, setGlobalError] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        console.log("file change");
        setFileContent(e.target.result);
      };

      fileReader.readAsText(file);
    }
  }, [file]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyse = async () => {
    setGlobalError("");
    if (fileContent) {
      const response = await fetch("http://localhost:8000/getdata/", {
        method: "POST",
        body: JSON.stringify({ fileContent }),
      });

      const json = await response.json();

      if (!response.ok) {
        setGlobalError(json.error);
      }

      if (response.ok) {
        console.log(json);
      }
    }
  };

  return (
    <CenterContainer>
      <NavbarOffset />
      <MarginContainer margin="30px">
        <SectionContainer style={{ width: "80vw" }}>
          <h1>Analyseur</h1>
          <input type="file" onChange={handleFileChange} />
          {fileContent && <BasicButton onPress={handleAnalyse}>Analyser</BasicButton>}
          {fileContent && (
            <VBox>
              <h1>File :</h1>
              {fileContent}
            </VBox>
          )}
        </SectionContainer>
      </MarginContainer>
    </CenterContainer>
  );
};

export default Analyseur;
