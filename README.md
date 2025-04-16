# AI Logo Generator App

This app generates logos based on user-entered prompts using OpenAI's DALL-E 2 model. The app allows users to create logos and view them within the app, and it stores the generated logos in Firestore for later access. The app's architecture integrates Firebase Functions and Firebase Firestore to handle image generation and storage.

## Features

- **Logo Generation**: Users can generate logos by entering a prompt. The AI model (DALL-E 2) generates the logo, and the image URL is displayed within the app.
- **Style Selection**: The app provides different styles for the generated logos (e.g., Monogram, Abstract, Mascot). Users can select a style before generating a logo.
- **Status Indicator**: A status indicator is displayed while the logo is being generated. Users can retry or surprise themselves with a random prompt.
- **Image Storage**: Generated logos are stored in Firestore for future access, with details like the image_url, prompt, user_id, and created_at timestamp.
- **Firebase Functions**: A Node.js Express API hosted on Firebase Functions handles image generation and health checks.

## Architecture

### Firebase Integration

The app integrates with Firebase Functions to interact with a Node.js API hosted on Firebase. The following endpoints are available:

#### Endpoints

1. **Generate Image**
   - URL: `https://us-central1-feraset-case-120ad.cloudfunctions.net/api/generate-image`
   - Method: POST
   - Request Body:
     ```json
     {
         "prompt": "A futuristic logo for a tech startup"
     }
     ```
   - Response:
     ```json
     {
         "image_url": "https://your-image-url.com",
         "prompt": "A futuristic logo for a tech startup",
         "user_id": "12345"
     }
     ```

2. **Health Check**
   - URL: `https://us-central1-feraset-case-120ad.cloudfunctions.net/api/`
   - Method: GET
   - Response:
     ```json
     {
         "message": "Hello from Firebase Functions 👋"
     }
     ```

### Firestore Data Structure

Generated images are saved in Firestore under the `images` collection with the following document structure:

```json
{
    "created_at": "April 16, 2025 at 1:09:53 PM UTC+3",
    "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/private/...",
    "prompt": "Minimalistic logo for a boutique hotel named Cosmos on the Aegean coast of Turkey, featuring ocean waves and terracotta accents.",
    "user_id": "12345"
}
```

### Extending the App

New AI features (e.g., different AI models or advanced logo customization) can be added under the `/features` folder. This allows for easy extension of the app's capabilities. Each new feature can be separated into its own module for clarity.

## User Authentication

Currently, the `user_id` is hardcoded for development purposes, but in the future, it can be replaced with:
- A unique device ID retrieved from the device
- A user ID from a registration or authentication system (e.g., Firebase Auth, custom user system)

## Development

### Firebase Functions Deployment

Firebase Functions are deployed and can be accessed through the following base URL:
```
https://us-central1-feraset-case-120ad.cloudfunctions.net/api
```

### Sample API Usage

1. **Generate Image Request**
   ```bash
   curl -X POST https://us-central1-feraset-case-120ad.cloudfunctions.net/api/generate-image \
   -H "Content-Type: application/json" \
   -d '{"prompt": "Minimalistic logo for a boutique hotel named Cosmos"}'
   ```

2. **Health Check Request**
   ```bash
   curl https://us-central1-feraset-case-120ad.cloudfunctions.net/api/
   ```

