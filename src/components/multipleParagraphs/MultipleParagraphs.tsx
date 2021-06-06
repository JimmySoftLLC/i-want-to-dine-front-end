import React from 'react';
import MultipleParagraph from './MultipleParagraph';
import { v4 as uuidv4 } from 'uuid';

const MultipleParagraphs = (textWithMulitpleParagraphs: any) => {
    let mulitplePargraphs = textWithMulitpleParagraphs.myText.split("\n");
    return mulitplePargraphs.map((mulitplePargraph: any) => <MultipleParagraph
        mulitplePargraph={mulitplePargraph}
        key={uuidv4()} />);
};

export default MultipleParagraphs;