import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
// import UserSummaryCard from '../users/UserSummaryCard';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import About from '../pages/about';
import MenuItems from '../components/menuItems/MenuItems';

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
            <div className='container page-top-margin'>
                {dataAndMethodsContext.myStates['info'] && <About />}
                <MenuItems />
            </div>
            <p className='p page-bottom-margin'></p>
        </Fragment>
    );
};

export default Home;
