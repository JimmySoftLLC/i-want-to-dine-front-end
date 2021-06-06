import React, { useContext } from 'react';
import MenuItemCardInventory from './MenuItemCardInventory';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';
import menuItemsWithCategories from '../../model/menuItem/menuItemsWithCategories';

const MenuItemsInventory = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurantMenuItems,
        myStates,
        restaurants,
        loading,
    } = dataAndMethodsContext;

    let myCategories: any = menuItemsWithCategories(restaurantMenuItems, null)

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div>
                {myCategories.specials.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-tag"></i>{' - '}Specials</h3>}
                {(myCategories.specials.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.soup.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-soup"></i>{' - '}Soup</h3>}
                {(myCategories.soup.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.salad.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-salad"></i>{' - '}Salad</h3>}
                {(myCategories.salad.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.appetizers.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-appetizer"></i>{' - '}Appetizers</h3>}
                {(myCategories.appetizers.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.sandwich.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-hamburger"></i>{' - '}Sandwich</h3>}
                {(myCategories.sandwich.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.pizza.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-pizza-slice"></i>{' - '}Pizza</h3>}
                {(myCategories.pizza.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.pasta.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-spaghetti"></i>{' - '}Pasta</h3>}
                {(myCategories.pasta.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.entree.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-concierge-bell"></i>{' - '}Entree</h3>}
                {(myCategories.entree.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.dessert.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-birthday-cake"></i>{' - '}Dessert</h3>}
                {(myCategories.dessert.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.drinks.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-cocktail"></i>{' - '}Drinks</h3>}
                {(myCategories.drinks.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.wine.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-wine-glass"></i>{' - '}Wine</h3>}
                {(myCategories.wine.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.beer.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-beer"></i>{' - '}Beer</h3>}
                {(myCategories.beer.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.coffee.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-coffee"></i>{' - '}Coffee</h3>}
                {(myCategories.coffee.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.kids.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-child"></i>{' - '}Kids menu</h3>}
                {(myCategories.kids.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
                {myCategories.notCatgorized.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Not categorized</h3>}
                {(myCategories.notCatgorized.map((menuItem: { id: any; }) => <MenuItemCardInventory menuItem={menuItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={menuItem.id}
                />))}
            </div>
        );
    }
};

export default MenuItemsInventory;

