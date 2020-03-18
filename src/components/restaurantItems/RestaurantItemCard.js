import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const RestaurantItemCard = ({ restaurantItem, handleClickRestaurantEdit, handleClickRestaurantCopy, handleClickRestaurantDelete }) => {
    let showIt = true;
    let myPhoneLink = "tel:" + restaurantItem.phoneNumber

    if (!restaurantItem.approved) { showIt = false };

    return (
        showIt && <div className='card'>
            <h3>{restaurantItem.restaurantName}
                <IconButton aria-label=""
                    href={restaurantItem.urlLink}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i className="fas fa-external-link-alt"></i>
                </IconButton>
            </h3>
            <h4>{restaurantItem.street}{' - '}{restaurantItem.city}</h4>
            <h4 href={myPhoneLink}>{restaurantItem.phoneNumber}
                <IconButton aria-label=""
                    href={myPhoneLink}
                    color={"primary"}>
                    <i className="fas fa-phone"></i>
                </IconButton></h4>
            <p>{restaurantItem.description}</p>
        </div>
    );
};

export default RestaurantItemCard;