import React, { useContext } from 'react';
import MenuItemCardPublicFacing from './MenuItemCardPublicFacing';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';
import menuItemsWithCategories from '../../model/menuItem/menuItemsWithCategories'

const MenuItemsPublicFacing = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        menuItems,
        myStates,
        restaurants,
        loading,
    } = dataAndMethodsContext;

    let myCategories = menuItemsWithCategories(menuItems, myStates)

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div>
                {(myStates.specials && myCategories.specials.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-tag"></i>{' - '}Daily specials</h3>}
                {myStates.specials && (myCategories.specials.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.soup && myCategories.soup.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-soup"></i>{' - '}Soup</h3>}
                {myStates.soup && (myCategories.soup.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.salad && myCategories.salad.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-salad"></i>{' - '}Salad</h3>}
                {myStates.salad && (myCategories.salad.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.appetizers && myCategories.appetizers.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-appetizer"></i>{' - '}Appetizers</h3>}
                {myStates.appetizers && (myCategories.appetizers.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.sandwich && myCategories.sandwich.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-hamburger"></i>{' - '}Sandwiches</h3>}
                {myStates.sandwich && (myCategories.sandwich.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.pizza && myCategories.pizza.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-pizza-slice"></i>{' - '}Pizza</h3>}
                {myStates.pizza && (myCategories.pizza.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.pasta && myCategories.pasta.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-spaghetti"></i>{' - '}Pasta</h3>}
                {myStates.pasta && (myCategories.pasta.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.entree && myCategories.entree.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-concierge-bell"></i>{' - '}Entrees</h3>}
                {myStates.entree && (myCategories.entree.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.dessert && myCategories.dessert.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-birthday-cake"></i>{' - '}Dessert</h3>}
                {myStates.dessert && (myCategories.dessert.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.drinks && myCategories.drinks.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-cocktail"></i>{' - '}Drinks</h3>}
                {myStates.drinks && (myCategories.drinks.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.kids && myCategories.kids.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-child"></i>{' - '}Kids menu</h3>}
                {myStates.kids && (myCategories.kids.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {(myStates.notCatgorized && myCategories.notCatgorized.length > 0) && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Not categorized</h3>}
                {myStates.notCatgorized && (myCategories.notCatgorized.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
            </div>
        );
    }
};

export default MenuItemsPublicFacing;

