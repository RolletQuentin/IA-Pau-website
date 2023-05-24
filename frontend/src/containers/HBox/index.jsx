import React from "react";

const HBox = ({children, style, ...content}) => {
    return (
        <div style={{
                ...style,
                display:"flex",
            }}
            {...content}
        >
            {children}
        </div>
    )
}

export default HBox;