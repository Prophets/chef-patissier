import { MjmlButton } from 'mjml-react';

const Button = ({ children, ...otherProps }) => {
    return <MjmlButton
        padding="40px"
        backgroundColor="#CCC"
        { ...otherProps }
    >
        { children }
    </MjmlButton>;
};

export default Button;
