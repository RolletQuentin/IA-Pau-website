import React from "react";

const VBox = ({
    children,
    gap = "20px",
    style,
    ...content
}) => {
    return (
        <div 
            className="vBox"
            style={{
                display: "flex",
                flexDirection: "column",
                gap,
            }}
        >
            {children.map((child, index) => {
                return (
                    <div style={{...style}} key={index}>
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

export default VBox;