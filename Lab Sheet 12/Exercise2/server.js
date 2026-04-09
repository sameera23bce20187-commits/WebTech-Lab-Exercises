const express = require('express');
const app = express();

const PORT = 3000;


app.use((req, res, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`[LOG] ${req.method} ${req.url} at ${time}`);
    next(); // move to next middleware
});


app.use((req, res, next) => {
    console.log("[GLOBAL] Middleware 2 executed");
    next();
});


const checkAuth = (req, res, next) => {
    console.log("[ROUTE] Checking authentication...");
    
    
    const isAuthorized = true;

    if (isAuthorized) {
        next();
    } else {
        res.send("Access Denied");
    }
};


app.get('/', (req, res) => {
    res.send("Home Page");
});


app.get('/dashboard', checkAuth, (req, res) => {
    res.send("Welcome to Dashboard");
});


app.get('/multi',
    (req, res, next) => {
        console.log("[ROUTE] First middleware");
        next();
    },
    (req, res, next) => {
        console.log("[ROUTE] Second middleware");
        next();
    },
    (req, res) => {
        res.send("Multiple middleware executed");
    }
);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});