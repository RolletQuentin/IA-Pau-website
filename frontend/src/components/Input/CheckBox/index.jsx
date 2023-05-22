import React, { useEffect, useState } from "react";

const CheckBox = ({
    checkedIcon = "check_box",
    uncheckedIcon = "check_box_outline_blank",
    defaultState = true,
    checkedIconName = "defaultCheckedIconName",
    style
}) => {

    const styleCheckBox = {
        cursor: "pointer",
        userSelect: "none",
        ...style
    }

    const [isCheck, setIsCheck] = useState(defaultState);
    const [checkBoxIcon, setCheckBoxIcon] = useState(defaultState ? checkedIcon : uncheckedIcon);

    useEffect(() => {
        setCheckBoxIcon(isCheck ? checkedIcon : uncheckedIcon)
    }, [isCheck, checkedIcon, uncheckedIcon])

    const toggleChecked = () => {
        setIsCheck(!isCheck);
    }

    return (
        <div style={styleCheckBox}>
            <input type="checkbox" name={checkedIconName} style={{display: "none"}}></input>
            <span class="material-symbols-outlined" onClick={toggleChecked}>{checkBoxIcon}</span>
        </div>
    )
}

export default CheckBox;