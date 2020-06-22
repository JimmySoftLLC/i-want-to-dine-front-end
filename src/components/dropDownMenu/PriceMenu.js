import React, { Fragment, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const PriceMenu = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;
    const [anchorPriceMenu, setAnchorPriceMenu] = React.useState(null);

    const closePriceMenu = () => {
        setAnchorPriceMenu(null);
    };

    const priceMenuClick = (event) => {
        setAnchorPriceMenu(event.currentTarget);
    };

    const handlePriceClick = (myState) => {
        setMyState(myState)
        if (myStates.helpDialogStage === 4 && myStates.helpDialogActive) { closePriceMenu() }
    }

    return (
        <Fragment>
            {myStates.menuItems && <Tooltip title="Set price points">
                <IconButton aria-controls="simple-menu" aria-haspopup="true"
                    color="inherit"
                    onClick={priceMenuClick}>
                    <i className="fas icon-dollar_1"></i>
                </IconButton>
            </Tooltip>}
            <Menu
                id="price-menu"
                anchorEl={anchorPriceMenu}
                keepMounted
                open={Boolean(anchorPriceMenu)}
                onClose={closePriceMenu}
            >
                <MenuItem onClick={closePriceMenu}>
                    <IconButton aria-label=""
                        color={"primary"}
                    >
                        <i className="fas fa-times"></i>
                    </IconButton>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="0-20 dollars">
                        <IconButton aria-label=""
                            color={myStates['dollar_1'] ? "secondary" : "default"}
                            onClick={() => handlePriceClick('dollar_1')}>
                            <i className="icon-dollar_1"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="20-35 dollars">
                        <IconButton aria-label=""
                            color={myStates['dollar_2'] ? "secondary" : "default"}
                            onClick={() => handlePriceClick('dollar_2')}>
                            <i className="icon-dollar_2"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem>
                    <Tooltip title="35 and up dollars">
                        <IconButton aria-label=""
                            color={myStates['dollar_3'] ? "secondary" : "default"}
                            onClick={() => handlePriceClick('dollar_3')}>
                            <i className="icon-dollar_3"></i>
                        </IconButton>
                    </Tooltip>
                </MenuItem>
            </Menu>

        </Fragment>
    );
}

export default PriceMenu;