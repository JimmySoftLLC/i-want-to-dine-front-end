import React, { Fragment } from 'react';

const HelpItem2 = () => {
    return (
        <Fragment>
            <p className='p'>
                Select your food ingredients. One or several can be selected.
                The icons represent:
                </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                    <i className='icon-tbone'></i> Meat and other
                    </li>
                <li>
                    <i className='icon-ham'></i> Pork
                    </li>
                <li>
                    <i className="fas fa-feather"></i> Poultry
                    </li>
                <li>
                    <i className="fas fa-fish"></i> Fish
                    </li>
                <li>
                    <i className='icon-shell'></i> Shellfish
                    </li>
                <li>
                    <i className="fas fa-seedling"></i> Vegetarian
                    </li>
                <li>
                    <i className="fas fa-cheese"></i> Cheese
                    </li>
                <li>
                    <i className="fas fa-shopping-bag"></i> Takeout or curbside delivery
                    </li>
            </ul>
        </Fragment>
    );
};

export default HelpItem2;