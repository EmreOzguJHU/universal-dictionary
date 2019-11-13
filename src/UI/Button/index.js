import React from "react";
import './index.css'

const Button = (props) => {
    const {onClick, disabled, image} = props;
    return (
        <div className={"button " + (disabled ? "disabled" : "")}>
            <img src={image} alt="button"
                 onClick={() => !disabled ? onClick() : {}}/>
        </div>
    );
};
Button.defaultProps = {
    disabled: false,
};
export default Button;