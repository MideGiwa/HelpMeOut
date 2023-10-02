const fs = require("fs");
const { Deepgram } = require("@deepgram/sdk");
const { extractAudio } = require("./extractAudio");
require('dotenv').config()

const deepgramApiKey = process.env.deepgramApiKey;
const deepgram = new Deepgram(deepgramApiKey);

const transcribeAudio = async (inputFilePath, outputFilePath) => {

    const extractedAudio = await extractAudio(inputFilePath, outputFilePath, (error) => {
        if (error) {
            console.error('Extraction failed.');
        } else {
            console.log('Extraction successful.');

        }
    });

    const source = {
        buffer: fs.readFileSync(outputFilePath),
        mimetype: 'audio/mp3',
    };

    // Send the audio to Deepgram and get the response
    deepgram.transcription
        .preRecorded(source, {
            smart_format: true,
            model: "nova",
        })
        .then((response) => {
            // Write the response to the console
            console.dir(response, { depth: null });

            // Write only the transcript to the console
            //console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
        })
        .catch((err) => {
            console.log(err);
        });

}

module.exports = {
    transcribeAudio
}