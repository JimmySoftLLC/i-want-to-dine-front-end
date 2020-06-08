import React, { useContext, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import HelpItem0 from '../helpItems/HelpItem0';
import HelpItem1 from '../helpItems/HelpItem1';
import HelpItem2 from '../helpItems/HelpItem2';
import HelpItem3 from '../helpItems/HelpItem3';
import HelpItem4 from '../helpItems/HelpItem4';
import HelpItem5 from '../helpItems/HelpItem5';
import HelpItem6 from '../helpItems/HelpItem6';
import HelpItem7 from '../helpItems/HelpItem7';
import HelpItem8 from '../helpItems/HelpItem8';

import {
    websiteName,
} from '../../api/apiConstants';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const HelpDialog = () => {
    const classes = useStyles();

    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const {
        setMyStates,
    } = dataAndMethodsContext;

    const { helpDialogStage,
        helpDialogOpen,
    } = dataAndMethodsContext.myStates;

    const closeDialogClick = () => {
        let myNewStateChoices = JSON.parse(JSON.stringify(dataAndMethodsContext.myStates))
        myNewStateChoices.helpDialogStage = 0;
        myNewStateChoices.helpDialogActive = false;
        myNewStateChoices.helpDialogOpen = false;
        window.localStorage.setItem("iWantToDine.myStates", JSON.stringify(myNewStateChoices));
        setMyStates(myNewStateChoices);
    };

    const tryItClick = () => {
        let myNewStateChoices = JSON.parse(JSON.stringify(dataAndMethodsContext.myStates))
        myNewStateChoices.helpDialogActive = true;
        myNewStateChoices.helpDialogOpen = false;
        switch (myNewStateChoices.helpDialogStage) {
            case 1:
                resetPages(myNewStateChoices)
                break;
            case 2:
                resetPages(myNewStateChoices)
                myNewStateChoices['menuItems'] = true;
                break;
            case 3:
                resetPages(myNewStateChoices)
                myNewStateChoices['menuItems'] = true;
                break;
            case 4:
                resetPages(myNewStateChoices)
                myNewStateChoices['menuItems'] = true;
                break;
            case 5:
                resetPages(myNewStateChoices)
                myNewStateChoices['restaurants'] = true;
                myNewStateChoices.helpDialogActive = false;
                break;
            case 6:
                resetPages(myNewStateChoices)
                myNewStateChoices['associates'] = true;
                myNewStateChoices.helpDialogActive = false;
                break;
            case 7:
                resetPages(myNewStateChoices)
                myNewStateChoices['entertainmentItems'] = true;
                myNewStateChoices.helpDialogActive = false;
                break;
            case 8:
                resetPages(myNewStateChoices)
                myNewStateChoices['photoGallery'] = true;
                myNewStateChoices.helpDialogActive = false;
                break;
            case 9:
                resetPages(myNewStateChoices)
                myNewStateChoices['info'] = true;
                myNewStateChoices.helpDialogActive = false;
                break;
            default:
                break;
        }
        window.localStorage.setItem("iWantToDine.myStates", JSON.stringify(myNewStateChoices));
        setMyStates(myNewStateChoices);
    };

    const resetPages = (myNewStateChoices) => {
        myNewStateChoices['restaurants'] = false;
        myNewStateChoices['menuItems'] = false;
        myNewStateChoices['associates'] = false;
        myNewStateChoices['info'] = false;
        myNewStateChoices['restaurantDetail'] = false;
        myNewStateChoices['entertainmentItems'] = false;
        myNewStateChoices['photoGallery'] = false;
    }

    const prevClick = () => {
        let myNewStateChoices = JSON.parse(JSON.stringify(dataAndMethodsContext.myStates))
        myNewStateChoices.helpDialogStage--;
        window.localStorage.setItem("iWantToDine.myStates", JSON.stringify(myNewStateChoices));
        setMyStates(myNewStateChoices);
    };

    const nextClick = () => {
        let myNewStateChoices = JSON.parse(JSON.stringify(dataAndMethodsContext.myStates))
        myNewStateChoices.helpDialogStage++;
        window.localStorage.setItem("iWantToDine.myStates", JSON.stringify(myNewStateChoices));
        setMyStates(myNewStateChoices);
    };

    return (
        <Fragment>
            <Dialog className={classes.root} open={helpDialogOpen} onClose={closeDialogClick} aria-labelledby="form-dialog-title">
                {helpDialogStage === 0 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Welcome to {websiteName}</DialogTitle>
                    <DialogContent>
                        <p className='p'>
                            If you want to learn how to use {websiteName} click FIRST HELP TOPIC.
                        </p>
                        <p className='p'>
                            If you just want to dive in click END HELP.
                        </p>
                        <p className='p'>
                            You can always start this tutorial again under the help and information page <i className="fas fa-question"></i>.
                        </p>
                        <p className='p'>
                            Enjoy!
                        </p>
                    </DialogContent>
                </Fragment>}
                {helpDialogStage === 1 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Main pages</DialogTitle>
                    <DialogContent>
                        <HelpItem0 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 2 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Menu Categories</DialogTitle>
                    <DialogContent>
                        <HelpItem1 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 3 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Food Categories</DialogTitle>
                    <DialogContent>
                        <HelpItem2 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 4 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Price Range</DialogTitle>
                    <DialogContent>
                        <HelpItem3 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 5 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Restaurant listings</DialogTitle>
                    <DialogContent>
                        <HelpItem4 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 6 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Restaurant associates</DialogTitle>
                    <DialogContent>
                        <HelpItem5 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 7 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Entertainment Categories</DialogTitle>
                    <DialogContent>
                        <HelpItem6 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 8 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Photo Wall</DialogTitle>
                    <DialogContent>
                        <HelpItem7 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 9 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Help and Information</DialogTitle>
                    <DialogContent>
                        <HelpItem8 />
                    </DialogContent>
                </Fragment>}

                <DialogActions>
                    {helpDialogStage === 0 && <Button onClick={() => nextClick()} color="primary">
                        First help topic
                    </Button>}
                    {(helpDialogStage > 1 && helpDialogStage < 10) && <Button onClick={() => prevClick()} color="primary">
                        Prev
                    </Button>}
                    {(helpDialogStage < 9 && helpDialogStage !== 0) && <Button onClick={() => nextClick()} color="primary">
                        Next
                    </Button>}
                    {(helpDialogStage > 0 && helpDialogStage < 10) && <Button onClick={() => tryItClick()} color="primary">
                        Try it
                    </Button>}
                </DialogActions>
                <DialogActions>
                    <Button onClick={() => closeDialogClick()} color="default">
                        End help
                    </Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    );
}

export default HelpDialog;