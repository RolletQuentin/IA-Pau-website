import React, { useEffect } from "react";

const VBox = ({
    children,
    gap = "20px",
    style,
    ...content
}) => {
    useEffect(() => {
        console.log(children)
    }, [])
    return (
        <div 
            className="vBox"
            style={{
                display: "flex",
                flexDirection: "column",
                gap,
            }}
        >
            {children && children.map((child, index) => {
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