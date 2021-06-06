import React, { useContext } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import MultipleParagraphs from '../multipleParagraphs/MultipleParagraphs';
import Link from '@material-ui/core/Link';
import findIndexOfAssociateInRestaurant from '../../model/associate/findIndexOfAssociateInRestaurant';
import getMenuItemsForRestaurant from '../../model/menuItem/getMenuItemsForRestaurant';
import getEntertainmentItemsForRestaurant from '../../model/entertainmentItem/getEntertainmentItemsForRestaurant';
import getAssociatesForRestaurant from '../../model/associate/getAssociatesForRestaurant';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const AssociatesDetailCard = ({ associate }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurants,
        menuItems,
        associates,
        menuDays,
        setRestaurantDetail,
        setMyState,
        entertainmentItems,
    } = dataAndMethodsContext;

    const imageStyle = {
        marginTop: "1rem",
        marginBottom: "1rem",
        width: '13.0rem',
        height: '13.0rem',
        borderRadius: "0.3rem",
    };

    const expStyle = {
        marginTop: ".5rem",
    };

    let myRestaurants = [];
    let myCount = 0
    for (let j = 0; j < restaurants.length; j++) {
        myCount++;
        let myIndex = findIndexOfAssociateInRestaurant(restaurants[j], associate.id)
        if (myIndex !== -1) {
            myRestaurants.push(restaurants[j]);
            myRestaurants[myRestaurants.length - 1].associateId = associate.id + myCount;
            myRestaurants[myRestaurants.length - 1].associateIdLink = associate.id + myCount + "dude";
        }
    }

    const restaurantClick = (restaurantId: any) => {
        let myRestaurant = getRestaurantById(restaurants, restaurantId)
        myRestaurant.menuItems = getMenuItemsForRestaurant(myRestaurant, menuItems)
        myRestaurant.entertainmentItems = getEntertainmentItemsForRestaurant(myRestaurant, entertainmentItems)
        myRestaurant.associates = getAssociatesForRestaurant(myRestaurant, associates)
        myRestaurant.menuDays = menuDays;
        setRestaurantDetail(myRestaurant);
        setMyState('restaurantDetail')
    }

    return (
        <div className='card-associate'>
            <h4><i className="fas fa-user"></i>{' '}{associate.firstName}{' '}{associate.lastName}{' - '}{associate.jobTitle}</h4>
            {myRestaurants.map(restaurant => <div key={restaurant.associateId}><Link onClick={() => restaurantClick(restaurant.id)}
                key={restaurant.associateIdLink}>{restaurant.restaurantName}</Link></div>)}
            {associate.imageUrl !== undefined && <img
                src={associate.imageUrl}
                alt=''
                className='round-img all-center'
                style={imageStyle}
            />}
            {associate.isIn && <h4 className='all-center' style={{ marginTop: '-49px', marginBottom: '0px', paddingLeft: '184px' }}>
                <svg height="40" width="40">
                    <circle cx="20" cy="20" r="15" stroke="white" strokeWidth="5" fill="green"
                    />
                </svg></h4>}
            <ExpansionPanel style={expStyle}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header2"
                >
                    <Typography>Bio</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid item xs={12}>
                        <MultipleParagraphs myText={associate.bio} />
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

export default AssociatesDetailCard;