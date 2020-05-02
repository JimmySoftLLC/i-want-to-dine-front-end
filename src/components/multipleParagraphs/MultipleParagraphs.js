import React from 'react';
import MultipleParagraph from './MultipleParagraph';
import { v4 as uuidv4 } from 'uuid';

const MultipleParagraphs = (myText) => {
    let mulitplePargraphs = myText.myText.split("\n");
    return mulitplePargraphs.map(mulitplePargraph => <MultipleParagraph
        mytext={mulitplePargraph}
        key={uuidv4()} />);
};

export default MultipleParagraphs;