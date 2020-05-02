import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const MenuItemRestaurantDetailCard = ({ associate }) => {
    return (
        <div className='card'>
            <h4>{associate.firstName}{' '}{associate.lastName}{' - '}{associate.jobTitle}
            </h4>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header2"
                >
                    <Typography>Bio</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid item xs={12}>
                        <p>{associate.bio}</p>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

export default MenuItemRestaurantDetailCard;
