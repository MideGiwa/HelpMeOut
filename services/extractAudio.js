
const ffmpeg = require('fluent-ffmpeg');

function extractAudio(inputFile, outputFile, callback) {
    ffmpeg()
        .input(inputFile)
        .noVideo()
        .audioCodec('copy')
        .on('end', () => {
            console.log(`Audio extracted to ${outputFile}`);
            callback(null);
        })
        .on('error', (err) => {
            console.error(`Error extracting audio: ${err.message}`);
            callback(err);
        })
        .output(outputFile)
        .run();
}

module.exports = {
    extractAudio
}