import React, { Fragment } from 'react';

const MultipleParagraph = ({ mulitplePargraph }) => {
    let myStyle = {
        paddingBottom: "0.5rem"
    }
    return (
        <Fragment>
            <p style={myStyle}>{mulitplePargraph}</p>
        </Fragment>
    );
};

export default MultipleParagraph;