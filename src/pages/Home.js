import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import AlertDialogContext from '../context/alertDialog/alertDialogContext';
import About from '../pages/about';
import MenuItemsPublicFacing from '../components/menuItemsPublicFacing/MenuItemsPublicFacing';
import MenuItemsInventory from '../components/menuItemInventory/MenuItemsInventory';
import MenuDays from '../components/menuDay/MenuDays';
import BotNavBar from '../components/BotNavBar';
import RestaurantItems from '../components/restaurantItems/RestaurantItems';
import MenuItemDialog from '../components/dialogs/MenuItemDialog';
import RestaurantDialog from '../components/dialogs/RestaurantDialog';
import AssociateDialog from '../components/dialogs/AssociateDialog';
import MenuDayDialog from '../components/dialogs/MenuDayDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../components/dialogs/SignInRegDialog';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import scanDynamoDB from '../api/scanDynamoDB';
import getRestaurantsMenuItems from '../model/restaurant/getRestaurantsMenuItems';
import sortMenuItems from '../model/menuItem/sortMenuItems';
import getRestaurantsAssociates from '../model/restaurant/getRestaurantsAssociates';
import sortAssociates from '../model/associate/sortAssociates';

import {
    restaurantsTableName,
} from '../api/apiConstants';
import Associates from '../components/associate/Associates';

const Home = () => {
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const myRestaurants = await scanDynamoDB(restaurantsTableName);
            myRestaurants.err ? setDialog(true, myRestaurants.payload, 'Error', '', 'OK', '') : setRestaurants(myRestaurants.payload)
            let myMenuItems = await getRestaurantsMenuItems(myRestaurants.payload);
            myMenuItems = await sortMenuItems(myMenuItems, 'sortPrice');
            let myAssociates = await getRestaurantsAssociates(myRestaurants.payload);
            myAssociates = await sortAssociates(myAssociates, null);
            console.log(myAssociates);
            setLoading(false);
            setMenuItems(myMenuItems);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const alertDialogContext = useContext(AlertDialogContext);

    const { myStates, logInType, setMenuItems, setRestaurants, setLoading } = dataAndMethodsContext
    const { setDialog } = alertDialogContext

    let showRestaurants = false;
    myStates['restaurant'] && !myStates['restaurantDetail'] && logInType === 'default' ? showRestaurants = true : showRestaurants = false

    let showRestaurantDetail = false;
    myStates['restaurant'] && myStates['restaurantDetail'] && logInType === 'default' ? showRestaurantDetail = true : showRestaurantDetail = false

    return (
        <Fragment>
            <AlertDialog />
            <DeleteConfirmDialog />
            <SignInRegDialog />
            <TopNavBar />
            {logInType === 'default' && <div className='container home-page-top-margin'>
                {myStates.info && <About />}
                {showRestaurants && <RestaurantItems />}
                {showRestaurantDetail && <RestaurantCard />}
                <MenuItemsPublicFacing />
                <p className='p home-page-bottom-margin'></p>
            </div>}
            {logInType === 'signedIn' && <div className='container associate-page-top-margin'>
                {myStates['menuSettings'] && <MenuItemsInventory />}
                {myStates['menuDaySettings'] && <MenuDays />}
                {myStates['associateSettings'] && <Associates />}
                <MenuItemDialog />
                <RestaurantDialog />
                <AssociateDialog />
                <MenuDayDialog />
                <p className='p associate-page-bottom-margin'></p>
            </div>}
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
