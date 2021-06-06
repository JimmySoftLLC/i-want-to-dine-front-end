import { createWorker } from 'tesseract.js';

const detectText = async (myBlob) => {
    const worker = createWorker({
        logger: m => console.log(m)
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(myBlob);
    await worker.terminate();
    return text;
}

export default detectText;