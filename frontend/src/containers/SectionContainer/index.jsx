import React from "react";

const SectionContainer = ({children, style}) => {
    const styleSection = {
        backgroundColor: "var(--background-color)",
        borderRadius: "30px",
        padding: "30px",
        ...style
    }

    return (
        <div style={styleSection}>
            {children}
        </div>
    )
}

export default SectionContainer;