/**
 * "Repeat After Me" - Express.js Practical
 * 
 * Objective:
 * Create a simple REST API demonstrating the use of Express middleware (express.json())
 * and handling POST requests by echoing/mirroring the incoming JSON payload.
 */

// 1. Import the Express library
const express = require('express');

// 2. Initialize the Express application
const app = express();

// 3. Define the server port (using 3000 as per requirements)
const PORT = 3000;

/**
 * 4. Configure Middleware
 * 
 * express.json() is a built-in middleware function in Express.
 * - It parses incoming HTTP requests containing JSON payloads.
 * - It populates the 'req.body' object with the parsed data, making it easy to access.
 * - Without this line, 'req.body' would be 'undefined'.
 */
app.use(express.json());

/**
 * 5. Define the POST Route: /mirror
 * 
 * This endpoint accepts any valid JSON object from the client
 * and returns it back to the client.
 */
app.post('/mirror', (req, res) => {
    
    // Check if the request body is empty.
    // If req.body is undefined, null, or is an empty object like {}, we consider it empty.
    if (!req.body || Object.keys(req.body).length === 0) {
        
        // Return HTTP 400 (Bad Request) along with the required error JSON structure
        return res.status(400).json({
            "error": "Request body cannot be empty."
        });
    }

    // If the body is not empty, mirror the exact same JSON object back to the client.
    // res.json() sends a JSON response with the correct headers (application/json)
    res.json(req.body);
});

/**
 * 6. Define a GET Route for the Root URL (/)
 * 
 * This is a friendly landing page for anyone visiting http://localhost:3000 in a browser.
 */
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #4A90E2;">🔄 Repeat After Me API</h1>
            <p>Your Express.js server is up and running successfully!</p>
            <p>Use an API testing client (Postman, Thunder Client, or curl) to send a <strong>POST</strong> request to:</p>
            <code style="background: #f4f4f4; padding: 5px 10px; border-radius: 4px; font-size: 1.1em;">
                http://localhost:${PORT}/mirror
            </code>
        </div>
    `);
});

// 7. Start the Server
app.listen(PORT, () => {
    console.log(`===========================================================`);
    console.log(`🚀 Server is successfully running on http://localhost:${PORT}`);
    console.log(`👉 Send GET requests to: http://localhost:${PORT}`);
    console.log(`👉 Send POST requests to: http://localhost:${PORT}/mirror`);
    console.log(`===========================================================`);
});
