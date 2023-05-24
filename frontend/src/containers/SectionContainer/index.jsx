import React from "react";

const SectionContainer = ({ children, style }) => {
    const styleSection = {
        backgroundColor: "var(--background-color)",
        borderRadius: "30px",
        padding: "30px",
        boxShadow: "1px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        ...style,
    };

    return <div style={styleSection}>{children}</div>;
};

export default SectionContainer;
