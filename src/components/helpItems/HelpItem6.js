import React, { Fragment } from 'react';

const HelpItem6 = () => {
    return (
        <Fragment>
            <p className='p'>
                When you select the entertainment page entertainment happening today will be listed.  The icons represent:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                    <i className='fas fa-theater-masks'></i> Theater
                </li>
                <li>
                    <i className="fas fa-music"></i> Music
                </li>
                <li>
                    <i className='fas fa-microphone'></i> Karaokes
                </li>
                <li>
                    <i className='icon-dancing'></i> Dancing
                </li>
                <li>
                    <i className='fas fa-laugh'></i> Comedy
                </li>
            </ul>
        </Fragment>
    );
};

export default HelpItem6;