const express = require('express');
const app = express();
const cors = require("cors");;
//const router = require('./routes/videoRoute');

const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
app.use(express.json());
app.use(cors());
//app.use("/api", router);
app.use('/videos', express.static('uploads'));


app.use(bodyParser.raw({ type: 'video/mp4', limit: '100mb' }));

// Directory to save video files
const videoDirectory = path.join(__dirname, 'videos');

// Create the videos directory if it doesn't exist
if (!fs.existsSync(videoDirectory)) {
    fs.mkdirSync(videoDirectory);
}

// Route to receive a new video ID
app.post('/new-video', (req, res) => {
    const { videoId } = req.body;
    const videoFilePath = path.join(videoDirectory, `${videoId}.mp4`);

    // Create an empty video file with the video ID as the filename
    fs.writeFileSync(videoFilePath, '');

    res.status(200).json({ videoId: "Video file with id has been created." });
});

// Route to receive video chunks and append them to the video file
app.post('/upload/:videoId', (req, res) => {
    const base64Data = req.body.data;
    const videoId = req.params.videoId || uuidv4();
    const videoFilePath = path.join(videoDirectory, `${videoId}.mp4`);

    // Decode the base64 data to binary
    const binaryData = Buffer.from(base64Data, 'base64');

    // Append the decoded data to the video file
    fs.appendFile(videoFilePath, binaryData, (err) => {
        if (err) {
            console.error('Error appending data to video file:', err);
            res.status(500).send('Error appending data to video file.');
        } else {
            res.status(200).send('Chunk received and appended to the video file.');
        }
    });
});


app.get('/videos/:filename', (req, res) => {
    const fileName = req.params.filename;
    const videoFilePath = path.join(videoDirectory, `${videoId}.mp4`);;
})
app.get('/home', (req, res) => {
    res.json({ message: 'Homepage' });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);




