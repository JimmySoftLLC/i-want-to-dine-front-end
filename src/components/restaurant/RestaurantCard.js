import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import MenuItemsRestaurantDetail from '../menuItemsRestaurantDetail/MenuItemsRestaurantDetail';
import AssociatesRestaurantDetail from '../associatesRestaurantDetail/AssociatesRestaurantDetail';
import MultipleParagraphs from '../multipleParagraphs/MultipleParagraphs';

const RestaurantCard = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantDetail,
    } = dataAndMethodsContext;

    let showIt = true;
    let myPhoneLink = "tel:" + restaurantDetail.phoneNumber

    if (!restaurantDetail.approved) { showIt = false };

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
            <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Menu</h3>
            <MenuItemsRestaurantDetail />
            <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Meet the team</h3>
            <AssociatesRestaurantDetail />
        </div>
    );
};

export default RestaurantCard;

