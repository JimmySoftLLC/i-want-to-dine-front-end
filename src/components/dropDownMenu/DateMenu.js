import React, { Fragment, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const DateMenu = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;
    const [anchorDateMenu, setAnchorDateMenu] = React.useState(null);

    const closeDateMenu = () => {
        setAnchorDateMenu(null);
    };

    const dateMenuClick = (event) => {
        setAnchorDateMenu(event.currentTarget);
    };

    const handleDateClick = (myState) => {
        setMyState(myState)
        if (myStates.helpDialogStage === 4 && myStates.helpDialogActive) { closeDateMenu() }
    }

    return (
        <Fragment>
            {myStates.menuItems && <Tooltip title="Set date">
                <IconButton aria-controls="simple-menu" aria-haspopup="true"
                    color="inherit"
                    onClick={dateMenuClick}>
                    <i className="fas fa-calendar-day"></i>
                </IconButton>
            </Tooltip>}
            <Menu
                id="date-menu"
                anchorEl={anchorDateMenu}
                keepMounted
                open={Boolean(anchorDateMenu)}
                onClose={closeDateMenu}
            >
                <MenuItem onClick={closeDateMenu}>
                    <IconButton aria-label=""
                        color={"primary"}
                    >
                        <i className="fas fa-times"></i>
                    </IconButton>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="today">
                        <IconButton aria-label=""
                            color={myStates['date_1'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_1')}>
                            <i className="far fa-calendar"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="tommorow">
                        <IconButton aria-label=""
                            color={myStates['date_2'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_2')}>
                            <i className="far fa-calendar"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="2 days from now">
                        <IconButton aria-label=""
                            color={myStates['date_3'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_3')}>
                            <i className="far fa-calendar"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="3 days from now">
                        <IconButton aria-label=""
                            color={myStates['date_4'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_4')}>
                            <i className="far fa-calendar"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="4 days from now">
                        <IconButton aria-label=""
                            color={myStates['date_5'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_5')}>
                            <i className="far fa-calendar"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="5 days from now">
                        <IconButton aria-label=""
                            color={myStates['date_6'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_6')}>
                            <i className="far fa-calendar"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="5 days from now">
                        <IconButton aria-label=""
                            color={myStates['date_7'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_7')}>
                            <i className="far fa-calendar"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
            </Menu>
        </Fragment>
    );
}

export default DateMenu;