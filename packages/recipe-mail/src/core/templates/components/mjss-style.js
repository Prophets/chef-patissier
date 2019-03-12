import * as Mjml from 'mjml-react';
import css from 'css';
import fs from 'fs';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import * as components from './';

const MjssStyle = ({ children, folder, src }) => {
    let styles = children;
    try {
        styles = String(fs.readFileSync(`${__dirname}/../../../../public/${ folder }/sass/${ src }`));
    } catch (e) {}
    return <Mjml.MjmlAttributes>
        {
            css.parse(styles).stylesheet.rules.map( (style) => {
                if (style.selectors === undefined && style.media) {
                    throw new Error(`MjssValidationError: @media ${style.media} - media queries are not allowed in <MjssStyle>`);
                }
                if (style.selectors) {
                    return style.selectors.map((selector) => {
                        let isMjmlComponent = true;
                        if (selector[0] === '#') {
                            throw new Error(`MjssValidationError:\n'${selector}' { ... } - Id's are not allowed in <MjssStyle>`);
                        }
                        if (selector.split(' ').length > 1) {
                            throw new Error(`MjssValidationError:\n'${selector}' { ... } - Nesting is not allowed in <MjssStyle>`);
                        }

                        const selectorFirstChar = selector[0];
                        const types = {
                            '.': Mjml.MjmlClass,
                            '*': Mjml.MjmlAll,
                        };

                        let Type = types[selectorFirstChar];

                        if (Type === undefined) {
                            const MjmlTag = Mjml[upperFirst(camelCase(selector))];
                            Type = MjmlTag;
                        }

                        if (Type === undefined) {
                            const Component = components[upperFirst(camelCase(selector))];
                            if (Component && Component.style) {
                                isMjmlComponent = false;
                                Type = Component;
                            }
                        }

                        const props = {};

                        if (selectorFirstChar === '.') {
                            props.name = selector.slice(1);
                        }

                        style.declarations.forEach((styleRule) => {
                            props[camelCase(styleRule.property)] = styleRule.value;
                        });

                        if (isMjmlComponent) {
                            return <Type {...props}>{' '}</Type>;
                        }

                        return Type.style(props);
                    });
                }
                return undefined;
            })
        }
    </Mjml.MjmlAttributes>;
};

export default MjssStyle;
