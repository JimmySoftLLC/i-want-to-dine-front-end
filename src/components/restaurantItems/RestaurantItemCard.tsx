import React, { RefObject, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import getMenuItemsForRestaurant from '../../model/menuItem/getMenuItemsForRestaurant';
import getEntertainmentItemsForRestaurant from '../../model/entertainmentItem/getEntertainmentItemsForRestaurant';
import getAssociatesForRestaurant from '../../model/associate/getAssociatesForRestaurant';
import MultipleParagraphs from '../multipleParagraphs/MultipleParagraphs';
import linkGoogleMaps from '../../model/linkGoogleMaps';

const RestaurantItemCard: any = ({ restaurantItem: myRestaurant }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        setRestaurantDetail,
        setMyState,
        menuItems,
        entertainmentItems,
        associates,
        menuDays,
    } = dataAndMethodsContext;

    let showIt = true;
    let myPhoneLink = "tel:" + myRestaurant.phoneNumber

    if (!myRestaurant.approved) { showIt = false };

    const restaurantClick = () => {
        myRestaurant.menuItems = getMenuItemsForRestaurant(myRestaurant, menuItems)
        myRestaurant.entertainmentItems = getEntertainmentItemsForRestaurant(myRestaurant, entertainmentItems)
        myRestaurant.associates = getAssociatesForRestaurant(myRestaurant, associates)
        myRestaurant.menuDays = menuDays;
        setRestaurantDetail(myRestaurant);
        setMyState('restaurantDetail');
    }

    const restaurantMapLink = linkGoogleMaps(myRestaurant)

    return (
        showIt && <div className='card'>
            <h3>
                <IconButton style={{ marginLeft: -10, fontSize: '1.2rem' }} aria-label=""
                    color={"primary"} onClick={() => restaurantClick()}>
                    {myRestaurant.restaurantName}
                </IconButton>
            </h3>
            <h4 >{myRestaurant.street}{' - '}{myRestaurant.city}
                <IconButton aria-label=""
                    href={restaurantMapLink}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i className="fas fa-map-marker-alt"></i>
                </IconButton></h4>
            <h4 ref={myPhoneLink}>{myRestaurant.phoneNumber}
                <IconButton aria-label=""
                    href={myPhoneLink}
                    color={"primary"}>
                    <i className="fas fa-phone"></i>
                </IconButton></h4>
            <MultipleParagraphs myText={myRestaurant.description} />
        </div>
    );
};

export default RestaurantItemCard;