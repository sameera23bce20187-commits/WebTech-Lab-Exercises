// Import events module
const events = require('events');

// Create EventEmitter object
const eventEmitter = new events.EventEmitter();

// -------------------------------
// 1. First Listener
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! Welcome.`);
});

// 2. Second Listener (Same event)
eventEmitter.on('greet', (name) => {
    console.log(`How are you, ${name}?`);
});

// -------------------------------
// 3. Custom Event with multiple arguments
eventEmitter.on('userLogin', (username, time) => {
    console.log(`User ${username} logged in at ${time}`);
});

// -------------------------------
// 4. Asynchronous Event Listener
eventEmitter.on('asyncTask', () => {
    setTimeout(() => {
        console.log("Asynchronous task completed after 2 seconds.");
    }, 2000);
});

// -------------------------------
// Trigger Events using emit()

console.log("Triggering greet event...");
eventEmitter.emit('greet', 'Chaitanya');

console.log("\nTriggering userLogin event...");
eventEmitter.emit('userLogin', 'Chaitanya', new Date().toLocaleTimeString());

console.log("\nTriggering asyncTask event...");
eventEmitter.emit('asyncTask');

console.log("\nProgram continues execution while async task runs...");