import {
    MjmlSection,
    MjmlColumn,
    MjmlText,
    MjmlWrapper
} from 'mjml-react';

const Footer = () => (
    <MjmlWrapper mjClass="footer">
        <MjmlSection>
            <MjmlColumn>
                <MjmlText mjClass="footer__text">FOOTER CONTENT</MjmlText>
            </MjmlColumn>
        </MjmlSection>
    </MjmlWrapper>
);

export default Footer;
