import React, { useEffect, useState } from "react";

const CheckBox = ({
    checkedIcon = "check_box",
    uncheckedIcon = "check_box_outline_blank",
    
    defaultState = true,
    setDefaultState = null,
    
    style,
}) => {
    const [isCheck, setIsCheck] = useState(defaultState);
    const [checkBoxIcon, setCheckBoxIcon] = useState(defaultState ? checkedIcon : uncheckedIcon);

    const styleCheckBox = {
        cursor: "pointer",
        userSelect: "none",
        ...style,
    };


    useEffect(() => {
        if (setDefaultState !== null){
            setCheckBoxIcon(defaultState ? checkedIcon : uncheckedIcon);
        }else{
            setCheckBoxIcon(isCheck ? checkedIcon : uncheckedIcon);
        }
    }, [defaultState, isCheck, checkedIcon, uncheckedIcon]);

    const toggleChecked = () => {
        if (setDefaultState !== null) {
            setDefaultState(!defaultState)
        } else{
            setIsCheck(!isCheck);
        }
    };

    return (
        <div style={styleCheckBox}>
            <span className="material-symbols-outlined" onClick={toggleChecked}>
                {checkBoxIcon}
            </span>
        </div>
    );
};

export default CheckBox;
