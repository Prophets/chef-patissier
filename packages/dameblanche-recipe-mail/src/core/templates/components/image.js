import {
    MjmlImage,
    MjmlClass
} from 'mjml-react';
import MailContext from '../context/mail';

const Image = ({ src, srcset, ...otherProps }) => {
    return <MailContext.Consumer>
        {
            ({ data }) => (
                <MjmlImage
                    mjClass='image'
                    src={data.imagesDestination + '/' + src}
                    srcset={srcset && srcset.trim().split(',').filter(item => item.trim().length !== 0).map((item)=> {
                        const parts = item.trim().split(' ').filter(i => i !== '');
                        return `${data.imagesDestination}/${parts[0]} ${parts.slice(1).join(' ')}`;
                    })}
                    {...otherProps}
                />
            )
        }
    </MailContext.Consumer>;
};

const ImageStyle = (props) => <MjmlClass name="image" {...props} />;
Image.style = ImageStyle;

export default Image;
