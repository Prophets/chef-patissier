import {
    MjmlSection,
    MjmlColumn
} from 'mjml-react';
import Image from '../components/image';

const Header = ({ img }) => (
    <MjmlSection mjClass="padding-y-0">
        <MjmlColumn>
            <Image src={img.desktop} srcset={`
                ${`${img.desktop}`} 600w,
                ${`${img.mobile}`}  300w,
            `} />
        </MjmlColumn>
    </MjmlSection>
);

export default Header;
