import React, { useReducer } from 'react';
import AlertDialogContext from './alertDialogContext';
import AlertDialogReducer from './alertDialogReducer';
import { SET_DIALOG, CLOSE_DIALOG } from '../types';

const AlertDialogState: any = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  const initialState = {
    dialogOpen: false,
    message: '',
    title: '',
  };

  const [state, dispatch] = useReducer(AlertDialogReducer, initialState);

  const setDialog = (dialogOpen: any, message: any, title: any) => {
    dispatch({
      type: SET_DIALOG,
      payload: {
        dialogOpen,
        message,
        title,
      },
    });
  };

  const closeDialog = () => {
    dispatch({ type: CLOSE_DIALOG });
  };

  return (
    <AlertDialogContext.Provider
      value={{
        alertDialog: state,
        setDialog,
        closeDialog,
      }}
    >
      {props.children}
    </AlertDialogContext.Provider>
  );
};

export default AlertDialogState;
