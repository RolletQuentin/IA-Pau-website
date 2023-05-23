import React from "react";

const MarginContainer = ({children, margin, style, ...content}) => {
    return (
        <div style={{
                ...style,
                padding: margin,
            }}
            {...content}
        >
            {children}
        </div>
    )
}

export default MarginContainer;