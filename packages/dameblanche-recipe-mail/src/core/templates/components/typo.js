import {
    MjmlText,
    MjmlClass
} from 'mjml-react';
import keys from 'lodash/keys';

export const H = ({ size, mjClass, cssClass, ...otherProps }) => (
    <MjmlText mjClass={`${mjClass || ''} h${size}`} cssClass={`${cssClass || ''} h${size}`} {...otherProps} />
);

export const H1 = (props) => <H {...props} size='1' />;
export const H2 = (props) => <H {...props} size='2' />;
export const H3 = (props) => <H {...props} size='3' />;
export const H4 = (props) => <H {...props} size='4' />;

export const P = ({ mjClass, cssClass, ...otherProps }) => (
    <MjmlText mjClass={`${mjClass || ''} p`} cssClass={`${cssClass || ''} p`} {...otherProps} />
);

const allTypo = { H1, H2, H3, H4, P };

keys(allTypo).forEach((name) => {
    const Item = allTypo[name];
    const TypoStyle = (props) => <MjmlClass name={name.toLowerCase()} {...props}/>;
    Item.style = TypoStyle;
});
