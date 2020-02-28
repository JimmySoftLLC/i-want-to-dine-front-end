import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const RestaurantItemCard = ({ restuarantItem, myStates }) => {
    let showIt = myStates['restuarant']
    let myPhoneLink = "tel:" + restuarantItem.phoneNumber
    return (
        showIt && <div className='card'>
            <h3>{restuarantItem.name}
                <IconButton aria-label=""
                    href={restuarantItem.url}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i className="fas fa-external-link-alt"></i>
                </IconButton>
            </h3>
            <h4>{restuarantItem.street}{' - '}{restuarantItem.city}</h4>
            <h4 href={myPhoneLink}>{restuarantItem.phoneNumber}
                <IconButton aria-label=""
                    href={myPhoneLink}
                    color={"primary"}>
                    <i className="fas fa-phone"></i>
                </IconButton></h4>
            <p>{restuarantItem.description}</p>
        </div>
    );
};

export default RestaurantItemCard;