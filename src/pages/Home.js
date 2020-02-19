import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
// import UserSummaryCard from '../users/UserSummaryCard';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import About from '../pages/about';
// import Alert from '../layout/Alert';
// import AlertDialog from '../layout/AlertDialog';
// import MyTeamMenuAndButtons from '../layout/MyTeamMenuAndButtons';

const Home = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    useEffect(() => {
        // in place of component did mount
        // dataAndMethodsContext.setOnMyTeamPage(true);
        // dataAndMethodsContext.setRedirectTo(' ');
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <TopNavBar />
            {dataAndMethodsContext.myStates['info'] && <About />}
        </Fragment>
    );
};

export default Home;
