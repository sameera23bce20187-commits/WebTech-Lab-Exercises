// Importing built-in http module
const http = require('http');

// Define port number
const PORT = 3000;

// Create server using createServer()
const server = http.createServer((req, res) => {

    // Log request info
    console.log(`Request received for: ${req.url}`);

    // Set response header
    res.setHeader('Content-Type', 'text/html');

    // Handle different routes
    if (req.url === '/') {
        res.write('<h1>Welcome to Node.js Server</h1>');
        res.write('<p>This is the home page.</p>');
    } 
    else if (req.url === '/about') {
        res.write('<h1>About Page</h1>');
        res.write('<p>This is a simple Node.js web server.</p>');
    } 
    else {
        res.write('<h1>404 Not Found</h1>');
    }

    // End response
    res.end();
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});