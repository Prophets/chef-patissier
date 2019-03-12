import {
    MjmlSection,
    MjmlText,
    MjmlColumn,
    MjmlWrapper
} from 'mjml-react';

const SupHeader = () => (
    <MjmlWrapper mjClass="sup-header">
        <MjmlSection>
            <MjmlColumn>
                <MjmlText>sup header</MjmlText>
            </MjmlColumn>
        </MjmlSection>
    </MjmlWrapper>
);

export default SupHeader;
