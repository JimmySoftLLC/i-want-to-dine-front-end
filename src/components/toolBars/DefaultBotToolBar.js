import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

const DefaultBotToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;

    return (
        <Fragment>
            <Toolbar showLabel="false" color="primary">

                <Tooltip title="Menu items">
                    <IconButton aria-label=""
                        color={myStates['menuItems'] ? "secondary" : "primary"}
                        onClick={() => setMyState('menuItems')}>
                        <i className="fas fa-book-open"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restaurants">
                    <IconButton aria-label=""
                        color={myStates['restaurants'] ? "secondary" : "primary"}
                        onClick={() => setMyState('restaurants')}>
                        <i className="fas fa-store"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restaurant associates">
                    <IconButton aria-label=""
                        color={myStates['associates'] ? "secondary" : "primary"}
                        onClick={() => setMyState('associates')}>
                        <i className="fas fa-users"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Entertainment">
                    <IconButton aria-label="" color={myStates['entertainmentSettings'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setMyState('entertainmentSettings')}
                    >
                        <i className="fas fa-music"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Information">
                    <IconButton aria-label="" color={myStates['info'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setMyState('info')}
                    >
                        <i className="fas fa-info"></i>
                    </IconButton>
                </Tooltip>
                {/* {(myStates.restaurants) && <Tooltip title="Map restaurant">
                    <IconButton aria-label=""
                        color="primary">
                        <i className="icon-map-marker-restaurant"></i>
                    </IconButton>
                </Tooltip>} */}
            </Toolbar>
        </Fragment>
    );
}

export default DefaultBotToolBar;
