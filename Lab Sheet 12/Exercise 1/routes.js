

const express = require('express');
const router = express.Router();


let users = [
    { id: 1, name: "Chaitanya" },
    { id: 2, name: "Sai" }
];


router.get('/users', (req, res) => {
    res.json(users);
});


router.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});


router.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.json(newUser);
});


router.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send("User not found");

    user.name = req.body.name;
    res.json(user);
});


router.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.send("User deleted successfully");
});

module.exports = router;