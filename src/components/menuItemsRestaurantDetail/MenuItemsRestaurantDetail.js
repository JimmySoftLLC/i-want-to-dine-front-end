import React, { useContext } from 'react';
import MenuItemRestaurantDetailCard from './MenuItemRestaurantDetailCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';
import menuItemsWithCategories from '../../model/menuItem/menuItemsWithCategories'

const MenuItemsRestaurantDetail = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        loading,
        restaurantDetail,
    } = dataAndMethodsContext;

    let myCategories = menuItemsWithCategories(restaurantDetail.menuItems)

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return <div>
            {
                myCategories.specials.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-tag"></i>{' - '}Daily Specials</h3>
            }
            {
                myCategories.specials.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {
                myCategories.soup.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-soup"></i>{' - '}Soup</h3>
            }
            {
                myCategories.soup.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}

                    key={menuItem.id}
                />)
            }
            {
                myCategories.salad.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-salad"></i>{' - '}Salad</h3>
            }
            {
                myCategories.salad.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}

                    key={menuItem.id}
                />)
            }
            {
                myCategories.appetizers.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-appetizer"></i>{' - '}Appetizers</h3>
            }
            {
                myCategories.appetizers.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {
                myCategories.sandwich.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-hamburger"></i>{' - '}Sandwiches</h3>
            }
            {
                myCategories.sandwich.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {
                myCategories.pizza.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-pizza-slice"></i>{' - '}Pizza</h3>
            }
            {
                myCategories.pizza.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {
                myCategories.pasta.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-spaghetti"></i>{' - '}Pasta</h3>
            }
            {
                myCategories.pasta.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {
                myCategories.entree.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-concierge-bell"></i>{' - '}Entrees</h3>
            }
            {
                myCategories.entree.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {
                myCategories.dessert.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-birthday-cake"></i>{' - '}Dessert</h3>
            }
            {
                myCategories.dessert.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {
                myCategories.drinks.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-cocktail"></i>{' - '}Drinks</h3>
            }
            {
                myCategories.drinks.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {
                myCategories.kids.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-child"></i>{' - '}Kids</h3>
            }
            {
                myCategories.kids.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
            {myCategories.notCatgorized.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Not categorized</h3>}
            {
                myCategories.notCatgorized.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
                    key={menuItem.id}
                />)
            }
        </div>;
    }
};

export default MenuItemsRestaurantDetail;


