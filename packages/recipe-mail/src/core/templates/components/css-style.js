import {
    MjmlStyle
} from 'mjml-react';
import fs from 'fs';

const CssStyle = ({ src, inline, folder }) => {
    let css = '';
    try {
        css = fs.readFileSync(`${__dirname}/../../../../public/${ folder }/sass/${src}`);
    } catch (e) {}
    return <MjmlStyle inline={inline}>
        { css }
    </MjmlStyle>;
};

export default CssStyle;
