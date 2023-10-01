// services/videoService.js
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const uploadDirectory = path.join(__dirname, '../uploads');

function saveVideo(stream, callback) {
    const fileName = `${Date.now()}.webm`;
    const filePath = path.join(uploadDirectory, fileName);

    const writeStream = fs.createWriteStream(filePath);

    stream.on('data', (data) => {
        writeStream.write(data);
        console.log('Recieving!!')
    });

    stream.on('end', () => {
        writeStream.end();
        console.log(`Video saved as ${fileName}`);
        callback(null, fileName);
    });

    stream.on('error', (error) => {
        console.error('Error receiving video stream:', error);
        callback(error, null);
    });
}

function extractAudio(videoFileName, callback) {
    const videoPath = path.join(uploadDirectory, videoFileName);
    const audioFileName = videoFileName.replace('.webm', '.mp3');
    const audioPath = path.join(uploadDirectory, audioFileName);

    ffmpeg()
        .input(videoPath)
        .audioCodec('libmp3lame')
        .audioBitrate(128)
        .toFormat('mp3')
        .on('end', () => {
            console.log(`Audio extracted as ${audioFileName}`);
            callback(null, audioFileName);
        })
        .on('error', (error) => {
            console.error('Error extracting audio:', error);
            callback(error, null);
        })
        .save(audioPath);
}

module.exports = { saveVideo, extractAudio };
const streamVideo = (req, res) => {
    const { filename } = req.params;

    // Set proper content type for the response
    res.setHeader('Content-Type', 'video/mp4');

    // Create a readable stream from the video file
    const videoStream = fs.createReadStream(`uploads/${filename}`);

    // Pipe the video stream to the response
    videoStream.pipe(res);
};

const uploadVideo = (req, res) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('stream', (stream) => {
            // Save the video stream to a file
            videoService.saveVideo(stream, (error, videoFileName) => {
                if (error) {
                    // Handle the error
                    console.error('Error saving video:', error);
                    return res.status(500).json({ error: 'Video stream upload failed' });
                }

                // Extract audio from the saved video file
                videoService.extractAudio(videoFileName, (audioError, audioFileName) => {
                    if (audioError) {
                        // Handle the audio extraction error
                        console.error('Error extracting audio:', audioError);
                        return res.status(500).json({ error: 'Audio extraction failed' });
                    }

                    // Now you can access the saved video and extracted audio files
                    console.log(`Video saved as ${videoFileName}`);
                    console.log(`Audio extracted as ${audioFileName}`);

                    // Send a success response
                    res.status(200).json({ message: 'Video stream uploaded and audio extracted successfully' });
                });
            });
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
