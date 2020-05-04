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
import AssociatesDetail from '../components/associatesDetail/AssociatesDetail';
import RestaurantDialog from '../components/dialogs/RestaurantDialog';
import AssociateDialog from '../components/dialogs/AssociateDialog';
import MenuDayDialog from '../components/dialogs/MenuDayDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../components/dialogs/SignInRegDialog';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import scanDynamoDB from '../api/scanDynamoDB';
import getTodaysMenuItems from '../model/menuItem/getTodaysMenuItems';
import sortMenuItems from '../model/menuItem/sortMenuItems';
import getTodaysAssociates from '../model/associate/getTodaysAssociates';
import getTodaysMenuDays from '../model/menuDay/getTodaysMenuDays';
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
            let myMenuDays = await getTodaysMenuDays(myRestaurants.payload)
            let myMenuItems = await getTodaysMenuItems(myMenuDays);
            myMenuItems = await sortMenuItems(myMenuItems, 'sortPrice');
            let myAssociates = await getTodaysAssociates(myRestaurants.payload, myMenuDays);
            myAssociates = await sortAssociates(myAssociates, null);
            setLoading(false);
            setMenuDays(myMenuDays);
            setMenuItems(myMenuItems);
            setAssociates(myAssociates);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const alertDialogContext = useContext(AlertDialogContext);

    const { myStates, logInType, setMenuItems, setRestaurants, setLoading, setAssociates, setMenuDays } = dataAndMethodsContext
    const { setDialog } = alertDialogContext

    return (
        <Fragment>
            <AlertDialog />
            <DeleteConfirmDialog />
            <SignInRegDialog />
            <TopNavBar />
            {logInType === 'default' && <div className='container '>
                {myStates.menuItems && <p className='p home-page-top-margin'></p>}
                {myStates.restaurants && <p className='p home-page-top-margin-normal'></p>}
                {myStates.restaurantDetail && <p className='p home-page-top-margin-normal'></p>}
                {myStates.associates && <p className='p home-page-top-margin-normal'></p>}
                {myStates.info && <p className='p home-page-top-margin-normal'></p>}
                {myStates.info && <About />}
                {myStates.menuItems && <MenuItemsPublicFacing />}
                {myStates.restaurants && <RestaurantItems />}
                {myStates.restaurantDetail && <RestaurantCard />}
                {myStates.associates && <AssociatesDetail />}
                <p className='p home-page-bottom-margin'></p>
            </div>}
            {logInType === 'signedIn' && <div className='container associate-page-top-margin'>
                {myStates.menuSettings && <MenuItemsInventory />}
                {myStates.menuDaySettings && <MenuDays />}
                {myStates.associateSettings && <Associates />}
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
