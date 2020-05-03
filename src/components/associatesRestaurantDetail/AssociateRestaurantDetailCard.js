import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import MultipleParagraphs from '../multipleParagraphs/MultipleParagraphs';

const AssociateRestaurantDetailCard = ({ associate }) => {

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

    return (
        <div className='card'>
            <h4><i className="fas fa-user"></i>{' '}{associate.firstName}{' '}{associate.lastName}{' - '}{associate.jobTitle}
            </h4>
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

export default AssociateRestaurantDetailCard;