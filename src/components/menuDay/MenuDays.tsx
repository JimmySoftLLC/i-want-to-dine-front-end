import React, { useContext } from 'react';
import MenuDayCard from './MenuDayCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const MenuDaysInventory = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurantMenuDays,
        myStates,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return restaurantMenuDays.map((menuDay: { id: React.Key | null | undefined; }) => <MenuDayCard menuDay={menuDay}
            myStates={myStates}
            key={menuDay.id} />);
    }
};

export default MenuDaysInventory;