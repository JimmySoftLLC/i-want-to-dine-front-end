import React, { useReducer } from 'react';
import AlertDialogContext from './alertDialogContext';
import AlertDialogReducer from './alertDialogReducer';
import { SET_ALERT_DIALOG, CLOSE_ALERT_DIALOG } from '../types';

const AlertDialogState = props => {
  const initialState = {
    alertOpen: false,
    alertMessage: 'dude',
    alertTitle: 'error',
  };

  const [state, dispatch] = useReducer(AlertDialogReducer, initialState);

  const setAlertDialog = (alertOpen, alertMessage, alertTitle) => {
    dispatch({
      type: SET_ALERT_DIALOG,
      payload: {
        alertOpen,
        alertMessage,
        alertTitle,
      },
    });
  };

  const closeAlertDialog = () => {
    dispatch({ type: CLOSE_ALERT_DIALOG });
  };

  return (
    <AlertDialogContext.Provider
      value={{
        alertDialog: state,
        setAlertDialog,
        closeAlertDialog,
      }}
    >
      {props.children}
    </AlertDialogContext.Provider>
  );
};

export default AlertDialogState;
