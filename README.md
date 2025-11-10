Risk Assessment Request MVP

This project is a complete full-stack web application that allows users to submit a request for a workplace risk assessment. It features a React frontend, a Node.js/Express backend, and JSON file storage, and is built to be deployed and run in a modern DevOps environment.

Technology Overview

This project uses a modern, lightweight, and efficient stack suitable for an MVP.

Frontend:

React: Used for building the entire user interface.

Tailwind CSS: For all utility-first styling.

Axios: For making asynchronous API requests from the client to the server.

Backend:

Node.js: As the server-side runtime environment.

Express: As the web server framework for handling routes and middleware.

db.json: A simple JSON file acts as our database for data persistence.

pdfkit: A lightweight, native Node.js library for efficient, on-the-fly PDF generation.

dotenv: For managing environment variables (like PORT) on the server.

Local Setup Instructions

This project requires two terminals to run: one for the backend server and one for the frontend client.

1. Backend Server (server)

First, set up and run the Node.js server.

# Navigate to the server directory
cd server

# Install all required npm packages
npm install

# Create the environment file
# Create a new file named .env in the /server folder and add the port:
# --- server/.env ---
PORT=3001
# --- End of file ---

# Run the server
node index.js

# Your backend API is now running at http://localhost:3001


2. Frontend Client (client)

In a new terminal window, set up and run the React app.

# Navigate to the client directory
cd client

# Install all required npm packages
npm install

# Create the environment file
# Create a new file named .env in the /client folder and add the API URLs:
# --- client/.env ---
REACT_APP_LOCAL_API_URL=http://localhost:3001
REACT_APP_LIVE_API_URL=https://YOUR_LIVE_RENDER_API_URL.onrender.com
# --- End of file ---

# Run the client
npm start

# Your React app will open in your browser at http://localhost:3000


Technical Summary & Architecture

This project is built as a client-server monorepo, with a clear separation of concerns between the frontend (client) and backend (server).

Backend Architecture

The Node.js server is heavily refactored from a single file into a professional, maintainable structure that follows the Single Responsibility Principle:

index.js: The main server file. Its only job is to load environment variables, configure middleware (like cors and express.json), import the routes, and start listening on the specified PORT.

routes/api.js: The router file. It handles all API endpoint definitions (/submit, /requests, /report/:id). It manages the request and response flow and calls services for business logic.

services/pdfService.js: A service file. Its only job is to perform the complex business logic of building a PDF. It is called by the router, which keeps the api.js file clean and readable.

Design Decisions

Several key technical decisions were made during development:

State-based Navigation (Client): We intentionally use React's useState (e.g., pageState) to manage which component (LandingPage, RequestForm, AdminPage) is visible. This approach was chosen over react-router-dom to ensure 100% reliability and avoid complex build/context errors in a streamlined environment.

Efficient PDF Generation: We chose pdfkit over puppeteer for PDF generation. pdfkit is a native, lightweight Node.js library that is fast, memory-efficient, and runs perfectly on free server tiers. puppeteer is a heavyweight (100MB+) headless browser and would be inefficient and costly for this task.

Duplicate Entry Validation: The POST /submit endpoint is idempotent. It checks the db.json file for existing entries (based on companyName and location) before saving a new one, returning a 409 Conflict error to the client if a duplicate is found.

Deployment-Ready URLs: The React app uses .env files and process.env.NODE_ENV to automatically determine whether to use the REACT_APP_LOCAL_API_URL (for npm start) or the REACT_APP_LIVE_API_URL (for a production build). This makes the CI/CD pipeline seamless.