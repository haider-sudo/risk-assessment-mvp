# Risk Assessment Request MVP

This project is a simple web-based prototype that allows users to submit a request for a workplace risk assessment.

## Technology Overview

* **Frontend:** React (using Create React App)
* **Backend:** Node.js / Express
* **Data Storage:** A simple `db.json` file on the server.
* **PDF Generation:** `pdfkit`

## Technical Summary

This application follows a simple client-server model.
1.  The `client` (React) provides the UI.
2.  The `server` (Express) provides a REST API with 3 endpoints:
    * `POST /api/submit`: Receives form data, adds a unique ID/timestamp, and saves it to `db.json`.
    * `GET /api/report/:id`: Finds a submission by its ID and generates a PDF confirmation.
    * `GET /api/requests`: (For Admin) Returns all submissions from `db.json`.

## Local Setup Instructions

1.  Clone the repository: `git clone ...`
2.  **Start the Server:**
    ```bash
    cd server
    npm install
    node index.js
    # Server will be running on http://localhost:3001
    ```
3.  **Start the Client (in a new terminal):**
    ```bash
    cd client
    npm install
    npm start
    # App will be running on http://localhost:3000
    ```