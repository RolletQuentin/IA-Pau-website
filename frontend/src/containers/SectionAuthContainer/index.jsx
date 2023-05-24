import React from "react";
import MarginContainer from "../MarginContainer";
import SectionContainer from "../SectionContainer";
import CenterContainer from "../CenterContainer";

const SectionAuthContainer = ({
    children,
    onSubmit,
    title = "default",
    iconWidth = 100,
    style
}) => {

    const styleIconAccount = {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: iconWidth,
        fill: true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSubmit){
            onSubmit()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <MarginContainer margin="30px">
                <SectionContainer style={{position: "relative", marginTop: iconWidth / 2, ...style}}>
                    <img style={styleIconAccount} src="https://cdn.discordapp.com/attachments/1107599629882765374/1110304728212062208/abstract-user-icon-31.png" alt="Account Circle Icon" />
                    <CenterContainer>
                        <h1>{title}</h1>
                    </CenterContainer>
                    {children}
                </SectionContainer>
            </MarginContainer>
        </form>
    )
}

export default SectionAuthContainer;