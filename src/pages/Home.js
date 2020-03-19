import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import AlertDialogContext from '../context/alertDialog/alertDialogContext';
import About from '../pages/about';
import MenuItemsPublicFacing from '../components/menuItemsPublicFacing/MenuItemsPublicFacing';
import MenuItemsInventory from '../components/menuItemInventory/MenuItemsInventory';
import BotNavBar from '../components/BotNavBar';
import RestaurantItems from '../components/restaurantItems/RestaurantItems';
// import AssociateRestaurantItems from '../components/restaurantItems/AssociateRestaurantItems';
import MenuItemDialog from '../components/dialogs/MenuItemDialog';
import RestaurantDialog from '../components/dialogs/RestaurantDialog';
import AssociateDialog from '../components/dialogs/AssociateDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../components/dialogs/SignInRegDialog';
import scanDynamoDB from '../api/scanDynamoDB';
import {
    menuItemsTableName,
    restaurantsTableName,
    // associatesTableName,
} from '../api/apiConstants';

const Home = () => {
    useEffect(() => {
        async function fetchData() {
            const myMenuItems = await scanDynamoDB(menuItemsTableName);
            myMenuItems.err ? setDialog(true, myMenuItems.payload, 'Error', '', 'OK', '') : setMenuItems(myMenuItems.payload)
            setResturantMenuItems(myMenuItems.payload)
            const myRestaurants = await scanDynamoDB(restaurantsTableName);
            myRestaurants.err ? setDialog(true, myRestaurants.payload, 'Error', '', 'OK', '') : setRestaurants(myRestaurants.payload)
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const alertDialogContext = useContext(AlertDialogContext);

    const { myStates, logInType, setMenuItems, setRestaurants, setResturantMenuItems } = dataAndMethodsContext
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
                {logInType === 'default' && <MenuItemsPublicFacing />}
                {logInType === 'signedIn' && <MenuItemsInventory />}
                <MenuItemDialog />
                <RestaurantDialog />
                <AssociateDialog />
            </div>
            <p className='p page-bottom-margin'></p>
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
