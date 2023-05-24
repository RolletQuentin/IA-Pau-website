import React from "react";

const CenterContainer = ({children, style, ...content}) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>
            <div style={{
                    margin: "auto",
                    ...style
                }}
                {...content}
            >
                {children}
            </div>
        </div>
    )
}

export default CenterContainer;