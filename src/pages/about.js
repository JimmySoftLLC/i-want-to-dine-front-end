import React, { Fragment } from 'react';

const About = () => {
    return (
        <Fragment>
            <div className='container'>
                <h2 className='page-top-margin'>About iWantToDine</h2>
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
                    There is no app today that gives you that experience. This will be exciting! Our target launch date is by the summer tourist
                    season.
                        </p>
                <p className='p page-bottom-margin'></p>
            </div>
        </Fragment>
    );
};

export default About;