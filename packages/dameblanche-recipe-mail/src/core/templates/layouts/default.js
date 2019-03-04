import {
    Mjml,
    MjmlHead,
    MjmlTitle,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlImage,
    MjmlFont
} from 'mjml-react';
import SupHeader from '../partials/supheader';
import Footer from '../partials/footer';
import CssStyle from '../components/css-style';
import MjssStyle from '../components/mjss-style';
import MailContext from '../context/mail';
import Grid from '../components/grid';
import Article from '../partials/article';
import { H1, H2, P } from '../components/typo';

const DefaultHead = ({ content, core, folder }) => (
    <>
        <MjmlTitle>{ content.title }</MjmlTitle>

        <MjssStyle folder={folder} src={'mjss.css'} />

        { (core.fonts || []).map(({ name, href }, key) => (
            <MjmlFont key={key} href={href} name={name}/>
        )) }
        <CssStyle folder={folder} src={'styles.css'} inline={true} />
        <CssStyle folder={folder} src={'queries.css'} inline={false} />
    </>
);

const DefaultLayout = (props) => {
    const Head = props.head ? props.head(DefaultHead) : DefaultHead;

    return <MailContext.Provider value={{ data: props }}>
        <Mjml>
            <MjmlHead>
                <Head {...props} />
            </MjmlHead>
            <MjmlBody>
                <SupHeader />
                {
                    props.content.blocks.map(({ type, data }, key) => {
                        const Block = require(`../partials/${type}`).default;
                        return <Block key={key} {...data} />;
                    })
                }

                <MjmlSection>
                    <MjmlColumn>
                        <H1>The grid component</H1>
                        <P>
                            <strong>Props</strong>
                            <pre style={{ maxWidth: '80vw', overflow: 'auto', margin: 0, padding: 10, border: '1px solid #eee' }}>{
                                `- columns
    default: 2
    type: int
- gutter
    default: 10
    type: Number
    description:
        results in a gutter width of
        10/maxWidth * 100%
- children
    required
    type: [MjmlColumn]
- justifyContent
    default: 'left'
    type: String
    options: 'left', 'right', 'center', 'stretch'
- responsive
    default: true
    type: Boolean
    description:
        When true the columns will
        be stacked verticaly on mobile.
        When false the columns will
        be distributed horizontaly on mobile.
- maxWidth
    default: 600
    type: Number
    description:
        The maximum width in pixels should
        only change if you are nesting
        a grid in a column
- verticalAlign
    default: 'top'
    options: 'top', 'bottom', 'middle'`
                            }</pre>
                        </P>
                    </MjmlColumn>
                </MjmlSection>
                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns:3, justify:left</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid justifyContent="left">
                    {
                        props.content.articles.map((article, key) => (
                            <MjmlColumn key={key}>
                                <Article { ...article }/>
                            </MjmlColumn>
                        ))
                    }
                </Grid>
                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns:4, justify:right</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="4" justifyContent="right">
                    {
                        props.content.articles.map((article, key) => (
                            <MjmlColumn key={key}>
                                <Article { ...article }/>
                            </MjmlColumn>
                        ))
                    }
                </Grid>
                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns:3, justify:stretch</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="3" justifyContent="stretch">
                    {
                        props.content.articles.map((article, key) => (
                            <MjmlColumn key={key}>
                                <Article { ...article }/>
                            </MjmlColumn>
                        ))
                    }
                </Grid>
                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns:2, justify:center, gutter:30</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="2" gutter="30" justifyContent="center">
                    {
                        props.content.articles.map((article, key) => (
                            <MjmlColumn key={key}>
                                <Article { ...article }/>
                            </MjmlColumn>
                        ))
                    }
                </Grid>

                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns:3, justifyContent:center, verticalAlign:middle, responsive:false</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="3" width="300" responsive={false} justifyContent="center" verticalAlign="middle">
                    {
                        props.content.logos.map((logo, key) => (
                            <MjmlColumn key={key}>
                                <MjmlImage src={logo.src} />
                            </MjmlColumn>
                        ))
                    }
                </Grid>
                { props.children }
                <Footer />
            </MjmlBody>
        </Mjml>
    </MailContext.Provider>;
};

export default DefaultLayout;
