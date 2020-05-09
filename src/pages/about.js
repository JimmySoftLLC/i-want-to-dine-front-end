import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';

const About = () => {
    return (
        <Fragment>
            <p className='p'>
                <strong>Note: Due to COVID-19 the restaurants that remain open only offer take out and/or curb side service.  Please partonize
                these establishments during this difficult time.</strong>
            </p>
            <h2 >About iWantToDine</h2>

            <p className='p'>
                When you are on vacation you want to get something to eat, but don't know what. So you walk around and look
                at menus that are posted outside Restaurants. You go online and look but all you find is a mishmash of bias reviews.
                        </p>
            <p className='p'>
                What if there was an app that did the walking and searching for you. Let's say you want a steak. You press the steak
                button and all the steak entrees in town are listed. You press fish and all the fish options show up. You press specials
                and all the specials show up.
                        </p>
            <p className='p'>
                This is the inspiration for iWantToDine.com. A website that only contains curated information submitted by the Restaurant
                owners. This is personal, just like the server was handing you the menu and telling you todays specials.
                        </p>
            <p className='p'>
                There is no app today that gives you that experience. This will be exciting! The current test market is Rehoboth Beach Delaware.  Our target launch date is by the summer tourist
                season.
                </p>
            <h2 >How to use</h2>
            <p className='p'>
                Select one of the following
                </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                    <i className="fas fa-book-open"></i> show menu items
                    </li>
                <li>
                    <i className="icon-resturant"></i> show restaurants
                    </li>
                <li>
                    <i className="fas fa-users"></i> show restaurant associates
                    </li>
                <li>
                    <i className="fas fa-info"></i> information
                    </li>
            </ul>
            <p className='p'>
                Once you have selcted menu items you can then select the foods you are interested by clicking the food icons.  The selected ones will darken.
                Menu items with those foods will show up in the list.  The icons represent:
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
                    <i className='icon-spaghetti'></i> Pasta
                    </li>
                <li>
                    <i className="fas fa-hamburger"></i> Sandwiches
                    </li>
                <li>
                    <i className="fas fa-birthday-cake"></i> Dessert
                </li>
                <li>
                    <i className="fas fa-tag"></i> Daily specials
                    </li>
                <li>
                    <i className="fas fa-shopping-bag"></i> Takeout or curbside delivery
                    </li>
            </ul>
            <p className='p'>
                Set the price by clicking on the $ button, a menu will popup.  Then click the price points you are interested in.
                Blue indicates an active price point.
                You can select one or many price points.  For example if you want prices
                from 0 to 35 activate both the $ and $$.
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
            <h2 >JimmySoft LLC <IconButton aria-label=""
                href="https://jimmysoftllc.com"
                rel="noopener noreferrer" target="_blank"
                color={"primary"}>
                <i className="fas fa-external-link-alt"></i>
            </IconButton></h2>
            <p className='p'>
                This program was created by JimmySoft LLC.  JimmySoft LLC specialises in DIY, scientific and customer apps.
                </p>
            <h2 >A message to our Restaurant clients</h2>
            <p className='p'>
                We want to help your buisiness succeed.  We want to give you the tools to get your message out.
                It is your responsibility to craft menus and a message that is compelling to the public.  We believe this will
                benifit the dining going public and invigorate the dining experience in Rehoboth.
                </p>
            <p className='p'>
                We do not accept advertisements or reviews.  Our service is paid for by our Restaurant clients to run
                the the service.  Its main vision is to get unbiased information to the Restaurant going public.
                </p>
            <h2 >Features</h2>
            We are creating a full suite of tools to enhance the your use of the platform.  Some of them are as follows.
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li><i className="fas fa-check"></i>{'   '}
                    Data can be used by your website, so your website content can automatically update by accessing our database
                    </li>
                <li><i className="fas fa-check"></i>{'   '}
                    Expanded information for your Restaurant, about us, history, owners profiles, staff profiles.  Looking for input on this.
                    </li>
                <li><i className="fas fa-check"></i>{'   '}
                    Who is in, you can checkin.  So if you want customers to know what staff is in on a particular night they can know their
                    favorite bartender or server is in.
                    </li>
                <li><i className="fas fa-check"></i>{'   '}
                    Event services.  You can detail in a seperate area what event services you provide and menu of options.
                    </li>
                <li><i className="fas fa-check"></i>{'   '}
                    Entertainment.  We will be adding an entertainment section.  You can highlight your band, karokee, show.
                    </li>
            </ul>
        </Fragment >
    );
};

export default About;