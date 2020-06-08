import React, { Fragment, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import HelpItem0 from '../components/helpItems/HelpItem0';
import HelpItem1 from '../components/helpItems/HelpItem1';
import HelpItem2 from '../components/helpItems/HelpItem2';
import HelpItem3 from '../components/helpItems/HelpItem3';
import HelpItem4 from '../components/helpItems/HelpItem4';
import HelpItem5 from '../components/helpItems/HelpItem5';
import HelpItem6 from '../components/helpItems/HelpItem6';
import HelpItem7 from '../components/helpItems/HelpItem7';

import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';

import {
    websiteName,
} from '../api/apiConstants';

const About = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const {
        setMyStates,
    } = dataAndMethodsContext;

    const onLineWizard = () => {
        let myNewStateChoices = JSON.parse(JSON.stringify(dataAndMethodsContext.myStates))
        myNewStateChoices.helpDialogActive = true;
        myNewStateChoices.helpDialogOpen = true;
        window.localStorage.setItem("iWantToDine.myStates", JSON.stringify(myNewStateChoices));
        setMyStates(myNewStateChoices);
    }

    return (
        <Fragment>
            <h2 >How to use</h2>
            <Link className='p' onClick={() => onLineWizard()} download>Step by Step Help</Link>
            <HelpItem0 />
            <HelpItem1 />
            <HelpItem2 />
            <HelpItem3 />
            <HelpItem4 />
            <HelpItem5 />
            <HelpItem6 />
            <HelpItem7 />
            <h2 >JimmySoft LLC <IconButton aria-label=""
                href="https://jimmysoftllc.com"
                rel="noopener noreferrer" target="_blank"
                color={"primary"}>
                <i className="fas fa-external-link-alt"></i>
            </IconButton></h2>
            <p className='p'>
                This program was created by JimmySoft LLC.  JimmySoft LLC specialises in DIY, scientific and customer apps.
                </p>
            <h2 >Why use {websiteName}?</h2>
            <p className='p'>
                The main reason to use {websiteName} is to find fine dining options quickly.  Instead of walking around looking at menus use {}
                {websiteName}.com to do the searching for you.
                </p>
            <p className='p'>
                Let's say you want a beef entree. You press the beef
                button and all the beef options in town are listed. You press fish and all the fish options show up. You press specials
                and all the specials show up.
                        </p>
            <p className='p'>
                This is the inspiration for {websiteName}.com. A website that only contains curated information submitted by the Restaurant
                owners. This is personal, just like the server was handing you the menu and telling you todays specials.
                        </p>
            <p className='p'>
                There is no app today that gives you that experience. The current test market is Rehoboth Beach Delaware.
                </p>
            <h2 >A message to our Restaurant clients</h2>
            <p className='p'>
                We want to help your buisiness succeed by giving you the tools to get your message out.
                It is your responsibility to craft menus and a message that is compelling to the public.  We believe this will
                benifit the dining going public and invigorate the dining experience in Rehoboth.
                </p>
            <p className='p'>
                We do not accept advertisements or reviews.  Our service is paid for by our Restaurant clients to run
                the the service.  Its main vision is to get unbiased information to the Restaurant going public.
                </p>
            <h2 >User manual</h2>
            <p className='p'>
                Download our restaurants user manual to learn how to add your restaurant, menu items, associates and entertainment.
                </p>
            <Link className='p' href="https://iwanttodine.com/manuals/user-manual.pdf" target="_blank" rel="noopener noreferrer" download><i className="fas fa-file-download"></i> Download User Manual</Link>
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
                    We also have an entertainment section.  You can highlight your band, karaokes, show, etc...
                    </li>
            </ul>
        </Fragment >
    );
};

export default About;

