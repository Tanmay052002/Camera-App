# Camera App

A web-based Camera App that enables users to record videos, capture images, apply filters, zoom in/out, and manage a gallery of media files. The app is built using HTML, CSS, and JavaScript, with IndexedDB for local storage of media files.

---

## Features

- **Video Recording**: Record videos directly from your webcam.
- **Image Capture**: Capture high-quality images from the video feed.
- **Filters**: Apply a variety of filters to enhance the video feed or captured images.
- **Zoom Controls**: Adjust the zoom level of the video feed with intuitive controls.
- **Gallery Management**: View, download, and delete saved media files (images and videos).
- **Local Storage**: Media files are stored locally using IndexedDB, ensuring offline accessibility.

---

## Project Structure

- **`index.html`**: The main page of the app with video recording and image capture functionality.
- **`gallery.html`**: The gallery page to view, download, and delete saved media files.
- **`style.css`**: Styles for the main app interface.
- **`gallery.css`**: Styles for the gallery page.
- **`script.js`**: JavaScript logic for video recording, image capture, filters, and zoom controls.
- **`dbScript.js`**: Handles IndexedDB operations for storing and retrieving media files.

---

## How to Use

1. Open the `index.html` file in a browser.
2. Allow access to your webcam and microphone when prompted.
3. Use the following controls:
   - **Record Button**: Start or stop video recording.
   - **Capture Button**: Capture an image from the video feed.
   - **Filters**: Click on a filter to apply it to the video feed or captured image.
   - **Zoom In/Out**: Use the zoom controls to adjust the video feed zoom level.
   - **Gallery Button**: Navigate to the gallery to view saved media files.
4. In the gallery:
   - **Download**: Download saved images or videos to your device.
   - **Delete**: Remove media files from the gallery.

---

## Technologies Used

- **HTML5**: For structuring the app.
- **CSS3**: For styling the app.
- **JavaScript**: For implementing functionality and interactivity.
- **IndexedDB**: For local storage of media files, enabling offline functionality.

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>