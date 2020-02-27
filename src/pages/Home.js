import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import About from '../pages/about';
import MenuItems from '../components/menuItems/MenuItems';
import BotNavBar from '../components/BotNavBar';
// import AlertDialog from '../layout/AlertDialog';

const Home = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    useEffect(() => {
        dataAndMethodsContext.scanDynamoDB(dataAndMethodsContext.tableName)
    }, []);

    return (
        <Fragment>
            <TopNavBar />
            <div className='container page-top-margin'>
                {dataAndMethodsContext.myStates['info'] && <About />}
                <MenuItems />
            </div>
            <p className='p page-bottom-margin'></p>
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
