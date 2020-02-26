import React, { Fragment } from 'react';

const About = () => {
    return (
        <Fragment>
            <h2 >About iWantToDine</h2>
            <p className='p'>
                When you are on vacation you want to get something to eat, but don't know what. So you walk around and look
                at menus that are posted outside resturants. You go online and look but all you find is a mishmash of bias reviews.
                        </p>
            <p className='p'>
                What if there was an app that did the walking and searching for you. Let's say you want a steak. You press the steak
                button and all the steak entrees in town are listed. You press fish and all the fish options show up. You press specials
                and all the specials show up.
                        </p>
            <p className='p'>
                This is the inspiration for iWantToDine.com. A website that only contains curated information submitted by the resturant
                owners. This is personal, just like the server was handing you the menu and telling you todays specials.
                        </p>
            <p className='p'>
                There is no app today that gives you that experience. This will be exciting! The current test market is Rehoboth Beach Delaware.  Our target launch date is by the summer tourist
                season.
                </p>
            <h2 >How to use</h2>
            <p className='p'>
                Select the foods you are interested by clicking the food icons.  The selected ones will darken.
                Menu items with those foods will show up in the list.  The icons are defined as follows:
                </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                    <i className='icon-steak'></i> Meat
                    </li>
                <li>
                    <i className="fas fa-feather"></i> Poultry
                    </li>
                <li>
                    <i className='icon-pasta'></i> Pasta
                    </li>
                <li>
                    <i className="fas fa-hamburger"></i> Sandwiches
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
                    <i className="fas fa-cheese"></i> Dessert
                    </li>

            </ul>
            <p className='p'>
                Set the price by clicking on the $ buttons, when active they will be blue.
                You can select one or many price categories.  For example if you want prices
                from 0 to 35 press both the $ and $$.
                </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                    <i className='icon-dollar_1'></i> 0-20 dollars
                    </li>
                <li>
                    <i className="icon-dollar_2"></i> 20-35 dollars
                    </li>
                <li>
                    <i className='icon-dollar_3'></i> 35 and up dollars
                    </li>
            </ul>
        </Fragment >
    );
};

export default About;