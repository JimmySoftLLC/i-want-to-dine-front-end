import React, { useContext } from 'react';
import MenuDayCard from './MenuDayCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuDaysInventory = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuDays,
        myStates,
    } = dataAndMethodsContext;

    return restaurantMenuDays.map(menuDay => <MenuDayCard menuDay={menuDay}
        myStates={myStates}
        key={menuDay.id} />);
};

export default MenuDaysInventory;