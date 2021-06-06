import React, { Fragment } from 'react';

const HelpItem1 = () => {
    return (
        <Fragment>
            <p className='p'>
                Select your menu categories, salad, entrees... by pressing the <i className="fas fa-list"></i> button.
                The icons represent:
                </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                    <i className="fas fa-tag"></i> Daily specials
                    </li>
                <li>
                    <i className="icon-soup"></i> Soup
                    </li>
                <li>
                    <i className="icon-salad"></i> Salad
                    </li>
                <li>
                    <i className="icon-appetizer"></i> Appetizers
                    </li>
                <li>
                    <i className="fas fa-hamburger"></i> Sandwiches
                    </li>
                <li>
                    <i className="fas fa-pizza-slice"></i> Pizza
                    </li>
                <li>
                    <i className='icon-spaghetti'></i> Pasta
                    </li>
                <li>
                    <i className='fas fa-concierge-bell'></i> Entrees
                    </li>
                <li>
                    <i className="fas fa-birthday-cake"></i> Dessert
                </li>
                <li>
                    <i className="fas fa-cocktail"></i> Drinks
                </li>
                <li>
                    <i className="fas fa-wine-glass"></i> Wine
                </li>
                <li>
                    <i className="fas fa-beer"></i> Beer
                </li>
                <li>
                    <i className="fas fa-coffee"></i> Coffee
                </li>
                <li>
                    <i className="fas fa-child"></i> Kids menu
                </li>
            </ul>
        </Fragment>
    );
};

export default HelpItem1;