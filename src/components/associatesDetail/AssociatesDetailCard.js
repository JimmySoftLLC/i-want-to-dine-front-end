import React, { useContext } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import MultipleParagraphs from '../multipleParagraphs/MultipleParagraphs';
import Link from '@material-ui/core/Link';
import findIndexOfAssociateInRestaurant from '../../model/associate/findIndexOfAssociateInRestaurant'
import getMenuItemsForRestaurant from '../../model/menuItem/getMenuItemsForRestaurant'
import getAssociatesForRestaurant from '../../model/associate/getAssociatesForRestaurant'
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const AssociatesDetailCard = ({ associate }) => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurants,
        menuItems,
        associates,
        menuDays,
        setRestaurantDetail,
        setMyState,
    } = dataAndMethodsContext;

    const imageStyle = {
        marginTop: "1rem",
        marginBottom: "1rem",
        width: '13rem',
        height: '13rem',
        borderRadius: "0.3rem",
    };

    const expStyle = {
        marginTop: ".5rem",
    };

    let myRestaurant = {};

    for (let j = 0; j < restaurants.length; j++) {
        let myIndex = findIndexOfAssociateInRestaurant(restaurants[j], associate.id)
        if (myIndex !== -1) {
            myRestaurant = restaurants[j];
            break;
        }
    }

    const restaurantClick = () => {
        myRestaurant.menuItems = getMenuItemsForRestaurant(myRestaurant, menuItems)
        myRestaurant.associates = getAssociatesForRestaurant(myRestaurant, associates)
        myRestaurant.menuDays = menuDays;
        setRestaurantDetail(myRestaurant);
        setMyState('restaurantDetail')
    }

    return (
        <div className='card'>
            <h4><i className="fas fa-user"></i>{' '}{associate.firstName}{' '}{associate.lastName}{' - '}{associate.jobTitle}            </h4>
            <Link onClick={() => restaurantClick()}>{myRestaurant.restaurantName}</Link>

            {associate.imageUrl !== undefined && <img
                src={associate.imageUrl}
                alt=''
                className='round-img all-center'
                style={imageStyle}
            />}
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