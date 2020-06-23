import React, { Fragment } from 'react';

const HelpItem4 = () => {
    return (
        <Fragment>
            <p className='p'>
                Select your date by clicking on the <i className="far fa-calendar"></i> button.
                The icons represent:
                </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                    <i className="far fa-calendar"></i> Today
                    </li>
                <li>
                    <i className="far fa-calendar"></i> Tommorow
                    </li>
                <li>
                    <i className="far fa-calendar"></i> In 2 Days
                    </li>
                <li>
                    <i className="far fa-calendar"></i> In 3 Days
                    </li>
                <li>
                    <i className="far fa-calendar"></i> In 4 days
                    </li>
                <li>
                    <i className="far fa-calendar"></i> In 5 days
                    </li>
                <li>
                    <i className="far fa-calendar"></i> In 6 days
                    </li>
            </ul>
        </Fragment>
    );
};

export default HelpItem4;