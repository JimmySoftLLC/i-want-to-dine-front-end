import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import About from '../pages/about';
import MenuItemsPublicFacing from '../components/menuItemsPublicFacing/MenuItemsPublicFacing';
import EntertainmentItemsPublicFacing from '../components/entertainmentItemsPublicFacing/EntertainmentItemsPublicFacing';
import MenuItemsInventory from '../components/menuItemInventory/MenuItemsInventory';
import EntertainmentItemsInventory from '../components/entertainmentItemInventory/EntertainmentItemsInventory';
import MenuDays from '../components/menuDay/MenuDays';
import BotNavBar from '../components/BotNavBar';
import RestaurantItems from '../components/restaurantItems/RestaurantItems';
import MenuItemDialog from '../components/dialogs/MenuItemDialog';
import AssociatesDetail from '../components/associatesDetail/AssociatesDetail';
import RestaurantDialog from '../components/dialogs/RestaurantDialog';
import AssociateDialog from '../components/dialogs/AssociateDialog';
import EntertainmentItemDialog from '../components/dialogs/EntertainmentItemDialog';
import MenuDayDialog from '../components/dialogs/MenuDayDialog';
import PhotoDialog from '../components/dialogs/PhotoDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import HelpDialog from '../components/dialogs/HelpDialog';
import PhotosInventory from '../components/photoInventory/PhotosInventory';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../components/dialogs/SignInRegDialog';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import PhotoGallery from '../components/photoGalley/PhotoGallery';
import Associates from '../components/associate/Associates';

const Home = () => {
    useEffect(() => {
        async function fetchData() {
            let todaysDate = new Date()
            setTodaysDate(todaysDate);
            setSelectedDate(todaysDate);
            getDataByDate(todaysDate)
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { getDataByDate, myStates, logInType, setSelectedDate, selectedDate, setTodaysDate } = dataAndMethodsContext

    let myDate = ""
    if (selectedDate) {
        myDate = selectedDate.toString().substring(0, 10)
    }

    return (
        <Fragment>
            <AlertDialog />
            <DeleteConfirmDialog />
            <SignInRegDialog />
            <TopNavBar />
            {logInType === 'default' && <div className='container '>
                {myStates.menuItems && <p className='p home-page-top-margin'></p>}
                {myStates.entertainmentItems && <p className='p home-page-top-margin-normal'></p>}
                {myStates.restaurants && <p className='p home-page-top-margin-normal'></p>}
                {myStates.restaurantDetail && <p className='p home-page-top-margin-normal'></p>}
                {myStates.associates && <p className='p home-page-top-margin-normal'></p>}
                {myStates.info && <p className='p home-page-top-margin-normal'></p>}
                {myStates.photoGallery && <p className='p home-page-top-margin-normal'></p>}
                {myStates.photoGallery && <PhotoGallery />}
                {myStates.info && <About />}
                {myStates.menuItems && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>{myDate}{" - Menu Items"}</h3>}
                {myStates.menuItems && <MenuItemsPublicFacing />}
                {myStates.entertainmentItems && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>{myDate}{" - Entertainment"}</h3>}
                {myStates.entertainmentItems && <EntertainmentItemsPublicFacing />}
                {myStates.restaurants && <RestaurantItems />}
                {myStates.restaurantDetail && <RestaurantCard />}
                {myStates.associates && <AssociatesDetail />}
                <HelpDialog />
                <p className='p home-page-bottom-margin'></p>
            </div>}
            {logInType === 'signedIn' && <div className='container associate-page-top-margin'>
                {myStates.menuSettings && <MenuItemsInventory />}
                {myStates.entertainmentSettings && <EntertainmentItemsInventory />}
                {myStates.menuDaySettings && <MenuDays />}
                {myStates.associateSettings && <Associates />}
                {myStates.photoSettings && <PhotosInventory />}
                <MenuItemDialog />
                <RestaurantDialog />
                <AssociateDialog />
                <MenuDayDialog />
                <EntertainmentItemDialog />
                <PhotoDialog />
                <p className='p associate-page-bottom-margin'></p>
            </div>}
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
