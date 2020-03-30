import React, { useContext } from 'react';
import MenuDayCard from './MenuDayCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuDaysInventory = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuDays,
        myStates,
        handleClickMenuDayEdit,
        handleClickMenuDayCopy,
        handleClickMenuDayDelete,
    } = dataAndMethodsContext;

    return restaurantMenuDays.map(menuDay => <MenuDayCard menuDay={menuDay}
        myStates={myStates}
        handleClickMenuDayEdit={handleClickMenuDayEdit}
        handleClickMenuDayCopy={handleClickMenuDayCopy}
        handleClickMenuDayDelete={handleClickMenuDayDelete}
        key={menuDay.id} />);
};

export default MenuDaysInventory;