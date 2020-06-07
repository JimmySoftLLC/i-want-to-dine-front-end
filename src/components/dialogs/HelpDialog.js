import React, { useContext, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import HelpItem0 from '../../components/helpItems/HelpItem0';
import HelpItem1 from '../../components/helpItems/HelpItem1';
import HelpItem2 from '../../components/helpItems/HelpItem2';
import HelpItem3 from '../../components/helpItems/HelpItem3';
import HelpItem4 from '../../components/helpItems/HelpItem4';

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
        window.localStorage.setItem("iWantToDine.myStates", JSON.stringify(myNewStateChoices));
        setMyStates(myNewStateChoices);
    };

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
                        Main pages</DialogTitle>
                    <DialogContent>
                        <HelpItem0 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 1 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Menu Categories</DialogTitle>
                    <DialogContent>
                        <HelpItem1 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 2 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Food Categories</DialogTitle>
                    <DialogContent>
                        <HelpItem2 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 3 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Price Range</DialogTitle>
                    <DialogContent>
                        <HelpItem3 />
                    </DialogContent>
                </Fragment>}

                {helpDialogStage === 4 && <Fragment>
                    <DialogTitle id="form-dialog-title">
                        Entertainment Categories</DialogTitle>
                    <DialogContent>
                        <HelpItem4 />
                    </DialogContent>
                </Fragment>}

                <DialogActions>
                    {(helpDialogStage > 0 && helpDialogStage < 4) && <Button onClick={() => prevClick()} color="primary">
                        Prev
                    </Button>}
                    {helpDialogStage < 4 && <Button onClick={() => nextClick()} color="primary">
                        Next
                    </Button>}
                    <Button onClick={() => tryItClick()} color="primary">
                        Try it
                    </Button>
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