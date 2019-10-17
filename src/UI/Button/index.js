import React from "react";

const Button = (props) => {
    const {text, onClick, disabled} = props;
    return (
        <div {...props}>
            <button disabled={disabled}
                    onClick={onClick}>
                {text}
            </button>
        </div>
    );
};
Button.defaultProps = {
    disabled: false,
    text: 'Click Me!'
};
export default Button;