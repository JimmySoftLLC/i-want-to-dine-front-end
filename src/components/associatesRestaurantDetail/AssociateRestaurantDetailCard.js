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
        <div className='card-associate'>
            <h4><i className="fas fa-user"></i>{' '}{associate.firstName}{' '}{associate.lastName}{' - '}{associate.jobTitle}
            </h4>
            {associate.imageUrl !== undefined && <img
                src={associate.imageUrl}
                alt=''
                className='all-center'
                style={imageStyle}
            />}
            {associate.isIn && <h4 className='all-center' style={{ marginTop: '-49px', marginBottom: '0px', paddingLeft: '185px' }}>
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


export default AssociateRestaurantDetailCard;