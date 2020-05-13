import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import MenuItemsRestaurantDetail from '../menuItemsRestaurantDetail/MenuItemsRestaurantDetail';
import EntertainmentItemsRestaurantDetail from '../entertainmentItemsRestaurantDetail/EntertainmentItemsRestaurantDetail';
import AssociatesRestaurantDetail from '../associatesRestaurantDetail/AssociatesRestaurantDetail';
import MultipleParagraphs from '../multipleParagraphs/MultipleParagraphs';

const RestaurantCard = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantDetail,
    } = dataAndMethodsContext;

    let showIt = true;
    let myPhoneLink = "tel:" + restaurantDetail.phoneNumbers

    if (!restaurantDetail.approved) { showIt = false };

    let myTempAssociateIds = [];

    for (let i = 0; i < restaurantDetail.menuDayIdsJSON.length; i++) {
        let myIndex = restaurantDetail.menuDays.findIndex(x => x.id === restaurantDetail.menuDayIdsJSON[i]);
        if (myIndex !== -1) {
            for (let j = 0; j < restaurantDetail.menuDays[myIndex].associatesJSON.length; j++) {
                let isInArray = myTempAssociateIds.findIndex(x => x === restaurantDetail.menuDays[myIndex].associatesJSON[j]);
                if (isInArray === -1) {
                    myTempAssociateIds.push(restaurantDetail.menuDays[myIndex].associatesJSON[j])
                }
            }
        }
    }

    let myTempAssociates = [];

    for (let i = 0; i < myTempAssociateIds.length; i++) {
        let myIndex = restaurantDetail.associates.findIndex(x => x.id === myTempAssociateIds[i]);
        if (myIndex !== -1) {
            myTempAssociates.push(restaurantDetail.associates[myIndex])
        }
    }

    return (
        showIt && <div className='card'>
            <h3>{restaurantDetail.restaurantName}
                <IconButton aria-label=""
                    href={restaurantDetail.urlLink}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i className="fas fa-external-link-alt"></i>
                </IconButton>
            </h3>
            <h4>{restaurantDetail.street}{' - '}{restaurantDetail.city}</h4>
            <h4 href={myPhoneLink}>{restaurantDetail.phoneNumber}
                <IconButton aria-label=""
                    href={myPhoneLink}
                    color={"primary"}>
                    <i className="fas fa-phone"></i>
                </IconButton></h4>
            <MultipleParagraphs myText={restaurantDetail.description} />
            {restaurantDetail.menuItems.length > 0 && < h3 style={{ marginTop: "1rem", textAlign: "center" }}>Menu</h3>}
            <MenuItemsRestaurantDetail />
            {restaurantDetail.entertainmentItems.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Entertainment</h3>}
            <EntertainmentItemsRestaurantDetail />
            {myTempAssociates.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Meet the team</h3>}
            <AssociatesRestaurantDetail />
        </div >
    );
};

export default RestaurantCard;

