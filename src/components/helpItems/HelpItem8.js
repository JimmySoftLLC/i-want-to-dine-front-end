import React, { Fragment } from 'react';
import {
    websiteName,
} from '../../api/apiConstants';

const HelpItem8 = () => {
    return (
        <Fragment>
            <p className='p'>
                When you select the help and information page you can find infomation and help about this web app {websiteName}:
            </p>
        </Fragment>
    );
};

export default HelpItem8;