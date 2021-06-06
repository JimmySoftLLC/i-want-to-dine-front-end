import React, { Fragment, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const DateMenu = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { myStates, setMyState, getDataByDate, todaysDate, setSelectedDate } = dataAndMethodsContext;
    const [anchorDateMenu, setAnchorDateMenu] = React.useState(null);

    const closeDateMenu = () => {
        setAnchorDateMenu(null);
    };

    const dateMenuClick = (event: any) => {
        setAnchorDateMenu(event.currentTarget);
    };

    const handleDateClick = (myState: any) => {
        setMyState(myState)
        closeDateMenu()
        let addDays = parseInt(myState.charAt(5));
        let mySelectedDate = new Date(todaysDate)
        mySelectedDate.setDate(mySelectedDate.getDate() + addDays);
        getDataByDate(mySelectedDate)
        setSelectedDate(mySelectedDate)
        if (myStates.helpDialogStage === 5 && myStates.helpDialogActive) { closeDateMenu() }
    }

    let dateStringForMenu = []
    let dateForMenu = new Date(todaysDate)
    dateStringForMenu[0] = dateForMenu.toString()
    for (let i = 0; i < 7; i++) {
        let myDateString = dateForMenu.toString()
        dateStringForMenu[i] = myDateString.substring(0, 10)
        dateForMenu.setDate(dateForMenu.getDate() + 1);
    }

    return (
        <Fragment>
            {(myStates.menuItems || myStates.restaurantDetail || myStates.entertainmentItems) && <Tooltip title="Set date">
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
                    <Tooltip title={dateStringForMenu[0]}>
                        <IconButton aria-label=""
                            color={myStates['date_0'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_0')}>
                            <i className="far fa-calendar"></i>
                            <i className="mx-1">{dateStringForMenu[0]}</i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title={dateStringForMenu[1]}>
                        <IconButton aria-label=""
                            color={myStates['date_1'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_1')}>
                            <i className="far fa-calendar"></i>
                            <i className="mx-1">{dateStringForMenu[1]}</i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title={dateStringForMenu[2]}>
                        <IconButton aria-label=""
                            color={myStates['date_2'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_2')}>
                            <i className="far fa-calendar"></i>
                            <i className="mx-1">{dateStringForMenu[2]}</i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title={dateStringForMenu[3]}>
                        <IconButton aria-label=""
                            color={myStates['date_3'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_3')}>
                            <i className="far fa-calendar"></i>
                            <i className="mx-1">{dateStringForMenu[3]}</i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title={dateStringForMenu[4]}>
                        <IconButton aria-label=""
                            color={myStates['date_4'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_4')}>
                            <i className="far fa-calendar"></i>
                            <i className="mx-1">{dateStringForMenu[4]}</i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title={dateStringForMenu[5]}>
                        <IconButton aria-label=""
                            color={myStates['date_5'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_5')}>
                            <i className="far fa-calendar"></i>
                            <i className="mx-1">{dateStringForMenu[5]}</i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title={dateStringForMenu[6]}>
                        <IconButton aria-label=""
                            color={myStates['date_6'] ? "secondary" : "default"}
                            onClick={() => handleDateClick('date_6')}>
                            <i className="far fa-calendar"></i>
                            <i className="mx-1">{dateStringForMenu[6]}</i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
            </Menu>
        </Fragment>
    );
}

export default DateMenu;