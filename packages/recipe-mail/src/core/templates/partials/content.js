import {
    MjmlSection,
    MjmlButton,
    MjmlColumn
} from 'mjml-react';
import { H1, P, H2 } from '../components/typo';


const Content = ({ intro, button, outro }) => (
    <MjmlSection>
        <MjmlColumn>
            <H1>H1 title</H1>
            <P>{intro}</P>
            <H2>H2 title</H2>
            <P>{intro}</P>
            {
                button &&
                <MjmlButton href={button.url}>{button.txt}</MjmlButton>
            }
            <P>{outro}</P>
        </MjmlColumn>
    </MjmlSection>
);

export default Content;
