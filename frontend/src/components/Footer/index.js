import React from "react";
import HBox from "../../containers/HBox";
import VBox from "../../containers/VBox";
import Logofacebook from "../../assets/Logofacebook.png"
import LogoInsta from "../../assets/logoInsta.png"
import LogoTwitter from "../../assets/LogoTwitter.png"
import CenterContainer from "../../containers/CenterContainer";
import MarginContainer from "../../containers/MarginContainer";

const Footer = () => {
    const imgStyle = {
        height: "25px",
    }

    return (
        <div style={{backgroundColor: "var(--light-color)", marginTop: "auto"}}>
            <MarginContainer margin="5px">
                <CenterContainer >
                    <VBox gap="5px">
                        <CenterContainer>
                            <HBox gap="35px">
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img src={Logofacebook} style={imgStyle} alt="logoFacebook"/></a>
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img src={LogoInsta} style={imgStyle} alt="logoInsta"/></a>
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img src={LogoTwitter} style={imgStyle} alt="logoTwitter"/></a>
                            </HBox>
                        </CenterContainer>
                        <HBox gap="50px">
                            <a href="https://iapau.org/contact/">Nous contacter</a>
                            <a href="https://iapau.org/lassociation-ia-pau/">L'association</a>
                        </HBox>
                        <CenterContainer>
                            <small>L'équipe 11 &copy; 2023</small>
                        </CenterContainer>
                    </VBox>
                </CenterContainer>
            </MarginContainer>
        </div>
    )
}

export default Footer;