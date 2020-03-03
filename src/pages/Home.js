import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import About from '../pages/about';
import MenuItems from '../components/menuItems/MenuItems';
import BotNavBar from '../components/BotNavBar';
import RestaurantItems from '../components/restaurantItems/RestaurantItems';
import MenuItemDialog from '../components/dialogs/MenuItemDialog';

// import AlertDialog from '../layout/AlertDialog';

const Home = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    useEffect(() => {
        dataAndMethodsContext.scanDynamoDB(dataAndMethodsContext.tableName);
        dataAndMethodsContext.scanDynamoDB(dataAndMethodsContext.restaurantTableName);
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <TopNavBar />
            <div className='container page-top-margin'>
                {dataAndMethodsContext.myStates['info'] && <About />}
                <RestaurantItems />
                <MenuItems />
                <MenuItemDialog />
            </div>
            <p className='p page-bottom-margin'></p>
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
