import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import About from '../pages/about';
import MenuItems from '../components/menuItems/MenuItems';
import BotNavBar from '../components/BotNavBar';
import RestaurantItems from '../components/restaurantItems/RestaurantItems';
import MenuItemDialog from '../components/dialogs/MenuItemDialog';
import RestaurantItemDialog from '../components/dialogs/RestaurantItemDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../auth/SignInRegDialog';


const Home = () => {
    useEffect(() => {
        dataAndMethodsContext.scanDynamoDB(dataAndMethodsContext.tableName);
        dataAndMethodsContext.scanDynamoDB(dataAndMethodsContext.restaurantTableName);
        // eslint-disable-next-line
    }, []);
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    return (
        <Fragment>
            <AlertDialog />
            <DeleteConfirmDialog />
            <SignInRegDialog />
            <TopNavBar />
            <div className='container page-top-margin'>
                {dataAndMethodsContext.myStates['info'] && <About />}
                <RestaurantItems />
                <MenuItems />
                <MenuItemDialog />
                <RestaurantItemDialog />
            </div>
            <p className='p page-bottom-margin'></p>
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
