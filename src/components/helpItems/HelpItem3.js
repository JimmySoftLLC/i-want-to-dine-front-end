import React, { Fragment } from 'react';

const HelpItem3 = () => {
    return (
        <Fragment>
            <p className='p'>
                Select your price points, one or several by clicking on the $ button.
                The icons represent:
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
        </Fragment>
    );
};

export default HelpItem3;