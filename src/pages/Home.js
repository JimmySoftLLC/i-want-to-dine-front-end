import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import AlertDialogContext from '../context/alertDialog/alertDialogContext';
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
import scanDynamoDB from '../api/scanDynamoDB';
import {
    tableName,
    restaurantTableName,
    associatesTableName,
} from '../api/apiConstants';

const Home = () => {
    useEffect(() => {
        async function fetchData() {
            const myMenuItems = await scanDynamoDB(tableName);
            myMenuItems.err ? setDialog(true, myMenuItems.payload, 'Error', '', 'OK', '') : setMenuItems(myMenuItems.payload)
            const myRestaurants = await scanDynamoDB(restaurantTableName);
            myRestaurants.err ? setDialog(true, myRestaurants.payload, 'Error', '', 'OK', '') : setRestaurants(myRestaurants.payload)
            // eslint-disable-next-line
        }
        fetchData();
    }, []);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const alertDialogContext = useContext(AlertDialogContext);

    const { myStates, logInType, setMenuItems, setRestaurants } = dataAndMethodsContext
    const { setDialog } = alertDialogContext

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
                <MenuItemDialog />
                <RestaurantItemDialog />
            </div>
            <p className='p page-bottom-margin'></p>
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
