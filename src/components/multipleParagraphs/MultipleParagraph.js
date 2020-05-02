import React, { Fragment } from 'react';

const MultipleParagraph = ({ mytext: mytext }) => {
    let myStyle = {
        paddingBottom: "0.5rem"
    }
    return (
        <Fragment>
            <p style={myStyle}>{mytext}</p>
        </Fragment>
    );
};

export default MultipleParagraph;