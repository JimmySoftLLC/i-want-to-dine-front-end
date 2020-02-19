import React, { useReducer } from 'react';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import {
    SET_FOOD_CHOICES,
} from '../types';

const DataAndMethodsState = props => {
    const initialState = {
        myStates: {
            steak: false,
            pork: false,
            pork1: false,
            drumstick: false,
            hamburger: false,
            fish: false,
            shell: false,
            seedling: false,
            info: false
        }
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);

    //set food choices
    const setFoodChoice = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewFoodChoices[key] ? myNewFoodChoices[key] = false : myNewFoodChoices[key] = true;
        setFoodChoices(myNewFoodChoices);
    };

    const setFoodChoices = (myStates) => { dispatch({ type: SET_FOOD_CHOICES, payload: myStates }) }

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                setFoodChoice,
                setFoodChoices
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;