import React, { useReducer } from 'react';
import DeleteConfirmContext from './deleteConfirmDialogContext';
import DeleteConfirmReducer from './deleteConfirmDialogReducer';
import { SET_DIALOG, CLOSE_DIALOG } from '../types';

const DeleteConfirmDialogState = props => {
    const initialState = {
        dialogOpen: false,
        message: '',
        title: '',
        index: 0,
    };

    const [state, dispatch] = useReducer(DeleteConfirmReducer, initialState);

    const setDialog = (dialogOpen, message, title, index, myDeleteFunction) => {
        dispatch({
            type: SET_DIALOG,
            payload: {
                dialogOpen,
                message,
                title,
                index,
                myDeleteFunction: myDeleteFunction,
            },
        });
    };

    const closeDialog = () => {
        dispatch({ type: CLOSE_DIALOG });
    };

    const deleteItem = (index) => {
        state.myDeleteFunction(index);
        dispatch({ type: CLOSE_DIALOG });
    };

    return (
        <DeleteConfirmContext.Provider
            value={{
                deleteConfirmDialog: state,
                setDialog,
                closeDialog,
                deleteItem,
            }}
        >
            {props.children}
        </DeleteConfirmContext.Provider>
    );
};

export default DeleteConfirmDialogState;
