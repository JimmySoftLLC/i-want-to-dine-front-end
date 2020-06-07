import React, { Fragment } from 'react';

const HelpItem0 = () => {
    return (
        <Fragment>
            <p className='p'>
                Select one of the following.  The icons represent:
                </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                    <i className="fas fa-book-open"></i> show menu items
                    </li>
                <li>
                    <i className="fas fa-store"></i> show restaurants
                    </li>
                <li>
                    <i className="fas fa-users"></i> show restaurant associates
                    </li>
                <li>
                    <i className="fas fa-music"></i> show entertainment
                    </li>
                <li>
                    <i className="fas fa-images"></i> show photo gallery
                    </li>
                <li>
                    <i className="fas fa-question"></i> help and information
                    </li>
            </ul>
        </Fragment>
    );
};

export default HelpItem0;