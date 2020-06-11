import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import MenuItemsRestaurantDetail from '../menuItemsRestaurantDetail/MenuItemsRestaurantDetail';
import EntertainmentItemsRestaurantDetail from '../entertainmentItemsRestaurantDetail/EntertainmentItemsRestaurantDetail';
import AssociatesRestaurantDetail from '../associatesRestaurantDetail/AssociatesRestaurantDetail';
import MultipleParagraphs from '../multipleParagraphs/MultipleParagraphs';
import linkGoogleMaps from '../../model/linkGoogleMaps';
import Button from '@material-ui/core/Button';

const RestaurantCard = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantDetail,
    } = dataAndMethodsContext;

    let showIt = true;
    let myPhoneLink = "tel:" + restaurantDetail.phoneNumbers

    if (!restaurantDetail.approved) { showIt = false };

    const restaurantMapLink = linkGoogleMaps(restaurantDetail);

    return (
        showIt && <div className='card'>
            <h3>{restaurantDetail.restaurantName}
                <IconButton aria-label=""
                    href={restaurantDetail.urlLink}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i className="fas fa-external-link-alt"></i>
                </IconButton>
                {restaurantDetail.facebookUrlLink !== '' && <IconButton aria-label=""
                    href={restaurantDetail.facebookUrlLink}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i class="fab fa-facebook-f"></i>
                </IconButton>}
                {restaurantDetail.twitterUrlLink !== '' && <IconButton aria-label=""
                    href={restaurantDetail.twitterUrlLink}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i class="fab fa-twitter"></i>
                </IconButton>}
                {restaurantDetail.instagramUrlLink !== '' && <IconButton aria-label=""
                    href={restaurantDetail.instagramUrlLink}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i class="fab fa-instagram"></i>
                </IconButton>}
            </h3>
            <h4 >{restaurantDetail.street}{' - '}{restaurantDetail.city}
                <IconButton aria-label=""
                    href={restaurantMapLink}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i className="fas fa-map-marker-alt"></i>
                </IconButton></h4>
            <h4 href={myPhoneLink}>{restaurantDetail.phoneNumber}
                <IconButton aria-label=""
                    href={myPhoneLink}
                    color={"primary"}>
                    <i className="fas fa-phone"></i>
                </IconButton></h4>
            <MultipleParagraphs myText={restaurantDetail.description} />
            {restaurantDetail.menuItems.length > 0 && < h3 style={{ marginTop: "1rem", textAlign: "center" }}>Menu{'  '}
                {restaurantDetail.orderUrlLink !== "" && <Button color="primary" aria-label=""
                    href={restaurantDetail.orderUrlLink}
                    rel="noopener noreferrer" target="_blank">
                    <i className='fas fa-shopping-bag' style={{ paddingRight: '.25rem' }}></i>Order Online
                </Button>}
            </h3>}
            <MenuItemsRestaurantDetail />
            {restaurantDetail.entertainmentItems.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Entertainment</h3>}
            <EntertainmentItemsRestaurantDetail />
            {restaurantDetail.associates.length > 0 && <h3 style={{ marginTop: "1rem", marginBottom: ".7rem", textAlign: "center" }}>Meet the team</h3>}
            <AssociatesRestaurantDetail />
        </div >
    );
};

export default RestaurantCard;



