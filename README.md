

```markdown
# Help Me Out

This is a simple Express.js application for handling video uploads and storage. It allows you to receive video chunks, create video files, and serve them when requested.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MideGiwa/HelpMeOut
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Usage

### Uploading Videos

To upload videos, you can use the following endpoints:

- `POST /new-video`: Create a new video with a given video ID.
  - Request body: JSON object with `{ "videoId": "your-video-id" }`
  - Response: `{ "videoId": "Video file with id has been created." }`

- `POST /upload/:videoId`: Upload video chunks and append them to the video file.
  - Request body: Binary video data
  - Response: Success message

### Retrieving Videos

To retrieve videos, use the following endpoint:

- `GET /videos/:filename`: Retrieve a video by its filename.
  - Response: Video file in `video/mp4` format

## Endpoints

- `POST /new-video`: Create a new video.
- `POST /upload/:videoId`: Upload video chunks and append them.
- `GET /videos/:filename`: Retrieve a video by filename.

For more details on how to use these endpoints, refer to the [Usage](#usage) section.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
```
