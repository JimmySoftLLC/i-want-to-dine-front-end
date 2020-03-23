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
import getRestaurantsMenuItems from '../model/getRestaurantsMenuItems';
import {
    menuItemsTableName,
    restaurantsTableName,
    // associatesTableName,
} from '../api/apiConstants';

const Home = () => {
    useEffect(() => {
        async function fetchData() {
            const myRestaurants = await scanDynamoDB(restaurantsTableName);
            myRestaurants.err ? setDialog(true, myRestaurants.payload, 'Error', '', 'OK', '') : setRestaurants(myRestaurants.payload)
            const myMenuItems = await getRestaurantsMenuItems(myRestaurants.payload);
            setMenuItems(myMenuItems);
        }
        fetchData();
        // eslint-disable-next-line
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
            {logInType === 'default' && <div className='container home-page-top-margin'>
                {myStates.info && <About />}
                {showRestaurants && <RestaurantItems />}
                <MenuItemsPublicFacing />
                <p className='p home-page-bottom-margin'></p>
            </div>}
            {logInType === 'signedIn' && <div className='container associate-page-top-margin'>
                {myStates['menuSettngs'] && <MenuItemsInventory />}
                <MenuItemDialog />
                <RestaurantDialog />
                <AssociateDialog />
                <p className='p associate-page-bottom-margin'></p>
            </div>}
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
