import React, { useReducer } from 'react';
import DeleteConfirmContext from './deleteConfirmDialogContext';
import DeleteConfirmReducer from './deleteConfirmDialogReducer';
import { SET_DIALOG, CLOSE_DIALOG } from '../types';

const DeleteConfirmDialogState = props => {
    const initialState = {
        dialogOpen: false,
        name: '',
        title: '',
        index: 0,
    };

    const [state, dispatch] = useReducer(DeleteConfirmReducer, initialState);

    const setDeleteConfirmDialog = (dialogOpen, name, title, index, deleteFunctionPassed) => {
        dispatch({
            type: SET_DIALOG,
            payload: {
                dialogOpen,
                name,
                title,
                index,
                deleteFunctionPassed,
            },
        });
    };

    const closeDialog = () => {
        dispatch({ type: CLOSE_DIALOG });
    };

    const deleteFunction = (index) => {
        state.deleteFunctionPassed(index);
        dispatch({ type: CLOSE_DIALOG });
    };

    return (
        <DeleteConfirmContext.Provider
            value={{
                deleteConfirmDialog: state,
                setDeleteConfirmDialog,
                closeDialog,
                deleteFunction,
            }}
        >
            {props.children}
        </DeleteConfirmContext.Provider>
    );
};

export default DeleteConfirmDialogState;
