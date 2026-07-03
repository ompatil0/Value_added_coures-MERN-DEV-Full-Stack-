# Repeat After Me

A beginner-friendly Node.js and Express.js project designed to demonstrate the fundamentals of Express middleware, request parsing, and handling POST requests.

---

## 📌 Project Overview
"Repeat After Me" is a simple REST API that implements a **mirror/echo** server. When you send a JSON payload in a POST request to the `/mirror` endpoint, the server returns the exact same JSON payload. If the payload is empty, the server returns an appropriate HTTP 400 Bad Request error.

This project is tailored for college practicals, workshops, or anyone learning the basics of backend development in Node.js and Express.

---

## ⚙️ Prerequisites
Before running this project, ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher is recommended)
*   An API testing client such as **Postman**, **Thunder Client** (VS Code Extension), or the **curl** command-line utility.

---

## 🚀 Installation & Setup Steps

1.  **Clone or navigate to the project directory:**
    ```bash
    cd Repeat_after_me_project
    ```

2.  **Install the dependencies:**
    This will install Express.js and its required packages defined in `package.json`.
    ```bash
    npm install
    ```

---

## 🏃 How to Run the Server

You can run the server in two modes:

### A. Development Mode (Auto-restarts on changes)
This uses the native Node.js watch mode (available in Node.js v18+) which automatically restarts the server when you modify code:
```bash
npm run dev
```

### B. Production Mode
Starts the server normally:
```bash
npm start
```

Once started, you will see a message in the terminal:
```text
===========================================================
🚀 Server is successfully running on http://localhost:3000
👉 Send GET requests to: http://localhost:3000
👉 Send POST requests to: http://localhost:3000/mirror
===========================================================
```

---

## 🔌 API Endpoint Details

### 1. Root Route
*   **URL:** `/`
*   **Method:** `GET`
*   **Description:** Displays a friendly HTML landing page indicating the server is running.

### 2. Mirror Route
*   **URL:** `/mirror`
*   **Method:** `POST`
*   **Headers:** `Content-Type: application/json`
*   **Description:** Accepts any JSON payload and returns the identical JSON object.

#### **Case 1: Successful Request**
*   **Request Body:**
    ```json
    {
      "text": "Hello MERN"
    }
    ```
*   **Response Status:** `200 OK`
*   **Response Body:**
    ```json
    {
      "text": "Hello MERN"
    }
    ```

#### **Case 2: Empty Request Body**
*   **Request Body:** *(Empty)*
*   **Response Status:** `400 Bad Request`
*   **Response Body:**
    ```json
    {
      "error": "Request body cannot be empty."
    }
    ```

---

## 🧪 Testing the API

Here is how you can test the `/mirror` endpoint using different popular tools:

### 1. Using curl (Terminal)
Open a new terminal window and run:

**Valid Request:**
```bash
curl -X POST http://localhost:3000/mirror \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello MERN"}'
```

**Empty Request:**
```bash
curl -X POST http://localhost:3000/mirror \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### 2. Using Postman
1.  Open **Postman** and create a new request tab.
2.  Set the HTTP method to **`POST`**.
3.  Enter the URL: `http://localhost:3000/mirror`.
4.  Navigate to the **Body** tab below the URL bar.
5.  Select the **raw** radio button and choose **JSON** from the dropdown menu.
6.  Paste your JSON payload in the editor:
    ```json
    {
      "message": "Testing Express API",
      "status": "Success"
    }
    ```
7.  Click the **Send** button. The response will mirror your JSON.

---

### 3. Using Thunder Client (VS Code Extension)
1.  Install the **Thunder Client** extension in VS Code.
2.  Open Thunder Client from the activity bar (lightning bolt icon).
3.  Click **New Request**.
4.  Set the method to **`POST`** and target URL to `http://localhost:3000/mirror`.
5.  Go to the **Body** tab, enter your JSON object.
6.  Click **Send**. Check the response tab to view the echoed response.

---

## 🧠 Key Conceptual Explanations

Here are the detailed answers to core concepts used in this project, which are highly helpful for viva/oral exams:

### 1. What is Express.js?
**Express.js** is a minimal and flexible Node.js web application framework. It provides a robust set of features to build single-page, multi-page, and hybrid web applications, as well as RESTful APIs. It simplifies the process of setting up servers, handling HTTP routes (like GET, POST, PUT, DELETE), and managing middleware.

### 2. What is Middleware?
In Express, **middleware** functions are functions that have access to the Request object (`req`), the Response object (`res`), and the `next` middleware function in the application's request-response cycle.
*   Middleware can execute code, make changes to the request and response objects, end the request-response cycle, or call the `next` middleware in the stack.
*   Think of it as a series of checks or processing pipelines that a request must pass through before it reaches the final route handler.

### 3. Why is `express.json()` required?
By default, Node.js and Express do not know how to parse or read raw JSON incoming data in the body of an HTTP request.
*   `express.json()` is a built-in middleware in Express that reads incoming HTTP request streams, parses the raw string data into a JavaScript object (if the `Content-Type` is `application/json`), and attaches it to the `req.body` property.
*   Without `express.json()`, accessing `req.body` in a POST route handler would result in `undefined` or an empty object.

### 4. What is `req.body`?
`req.body` is a property on the Express Request object (`req`) that contains key-value pairs of data submitted in the request body.
*   For JSON requests, it is populated by the `express.json()` middleware.
*   For example, if the client sends `{"name": "Alice"}`, `req.body.name` will yield `"Alice"`.

### 5. What is the difference between GET and POST requests?
| Feature | GET | POST |
| :--- | :--- | :--- |
| **Purpose** | Used to retrieve data from the server. | Used to send data to the server to create/update a resource. |
| **Request Body** | Does not have a request body. Data is sent via URL queries (e.g., `?id=5`). | Has a request body where the payload is sent. |
| **Security** | Less secure (parameters are visible in the URL bar and browser history). | More secure (payload is sent in the HTTP message body, not URL). |
| **Data Limit** | Limited length (restricted by URL character limit of browser/server). | No size restriction on the body payload. |
| **Caching** | Can be cached and bookmarked. | Cannot be cached or bookmarked. |

### 6. Why is `res.json()` used?
`res.json()` is a method on the Express Response object (`res`) used to send a JSON response back to the client.
*   It automatically takes a JavaScript object or array, converts it into a JSON string using `JSON.stringify()`, and sends it in the response body.
*   It also automatically sets the `Content-Type` HTTP response header to `application/json`, which informs the client's browser or testing tool that the data being returned is in JSON format.
