import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import About from '../pages/about';
import MenuItems from '../components/menuItems/MenuItems';
import BotNavBar from '../components/BotNavBar';
import RestaurantItems from '../components/restaurantItems/RestaurantItems';
import AssociateRestaurantItems from '../components/restaurantItems/AssociateRestaurantItems';
import MenuItemDialog from '../components/dialogs/MenuItemDialog';
import RestaurantItemDialog from '../components/dialogs/RestaurantItemDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../components/dialogs/SignInRegDialog';

const Home = () => {
    useEffect(() => {
        dataAndMethodsContext.scanDynamoDB(dataAndMethodsContext.tableName);
        dataAndMethodsContext.scanDynamoDB(dataAndMethodsContext.restaurantTableName);
        // eslint-disable-next-line
    }, []);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const { myStates, logInType } = dataAndMethodsContext

    let showRestaurants = false;
    myStates['restaurant'] && logInType === 'default' ? showRestaurants = true : showRestaurants = false

    return (
        <Fragment>
            <AlertDialog />
            <DeleteConfirmDialog />
            <SignInRegDialog />
            <TopNavBar />
            <div className='container page-top-margin'>
                {myStates.info && <About />}
                {showRestaurants && <RestaurantItems />}
                {logInType === 'default' && <MenuItems />}
                {logInType === 'signedIn' && <AssociateRestaurantItems />}
                <MenuItemDialog />
                <RestaurantItemDialog />
            </div>
            <p className='p page-bottom-margin'></p>
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
