import React from "react";

const HBox = ({children, style,gap="0px", ...content}) => {
    return (
        <div style={{
                ...style,
                display:"flex",
                gap,
            }}
            {...content}
        >
            {children}
        </div>
    )
}

export default HBox;