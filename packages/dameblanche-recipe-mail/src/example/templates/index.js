import DefaultLayout from '../../core/templates/layouts/default.js';

const overrideHead = (DefaultHead) => {
    const Head = (props) => (
        <>
            <DefaultHead {...props}/>
        </>
    );
    return Head;
};

const Index = (props) => (
    <DefaultLayout {...props} head={overrideHead}>

    </DefaultLayout>
);

export default Index;
