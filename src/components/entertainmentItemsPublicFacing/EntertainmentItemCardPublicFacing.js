import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import dateString from '../../model/dateString';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import getMenuItemsForRestaurant from '../../model/menuItem/getMenuItemsForRestaurant';
import getEntertainmentItemsForRestaurant from '../../model/entertainmentItem/getEntertainmentItemsForRestaurant';
import getAssociatesForRestaurant from '../../model/associate/getAssociatesForRestaurant';

const EntertainmentItemCardPublicFacing = ({ entertainmentItem, restaurants }) => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        setRestaurantDetail,
        setMyState,
        menuItems,
        associates,
        menuDays,
        entertainmentItems,
    } = dataAndMethodsContext;

    const items = []
    for (let i = 0; i < entertainmentItem.categoryJSON.length; i++) {
        switch (entertainmentItem.categoryJSON[i]) {
            case 'theater':
                items.push(<i className='fas fa-theater-masks' key={entertainmentItem.id + "_theater"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'music':
                items.push(<i className='fas fa-music' key={entertainmentItem.id + "_music"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'karaokes':
                items.push(<i className='fas fa-microphone' key={entertainmentItem.id + "_karaokes"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'dancing':
                items.push(<i className='icon-dancing' key={entertainmentItem.id + "_dancing"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'comedy':
                items.push(<i className='fas fa-laugh' key={entertainmentItem.id + "_comedy"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    // format dates for display
    let myTimeFrom = dateString(entertainmentItem.timeFrom, null, 'displayTime')
    let myTimeTo = dateString(entertainmentItem.timeTo, null, 'displayTime')

    let showIt = true;
    let myRestaurant = getRestaurantById(restaurants, entertainmentItem.restaurantId)

    if (!myRestaurant.approved) { showIt = false };
    let myPhoneLink = "tel:" + myRestaurant.phoneNumber
    let myPhoneNumber = myRestaurant.phoneNumber

    var myStyle = {
        marginLeft: '1rem',
    };

    const restaurantClick = () => {
        myRestaurant.menuItems = getMenuItemsForRestaurant(myRestaurant, menuItems)
        myRestaurant.entertainmentItems = getEntertainmentItemsForRestaurant(myRestaurant, entertainmentItems)
        myRestaurant.associates = getAssociatesForRestaurant(myRestaurant, associates)
        myRestaurant.menuDays = menuDays;
        setRestaurantDetail(myRestaurant);
        setMyState('restaurantDetail')
    }

    return (
        showIt && <div className='card'>
            <h4>{items}{' - '}{entertainmentItem.title}
            </h4>
            <h5>{myTimeFrom}{' to '}{myTimeTo}
            </h5>
            <Link onClick={() => restaurantClick()}>{myRestaurant.restaurantName}</Link>
            <span style={myStyle}>{myPhoneNumber}
                <IconButton aria-label=""
                    href={myPhoneLink}
                    color={"primary"}>
                    <i className="fas fa-phone"></i>
                </IconButton></span>
        </div>
    );
};

export default EntertainmentItemCardPublicFacing;