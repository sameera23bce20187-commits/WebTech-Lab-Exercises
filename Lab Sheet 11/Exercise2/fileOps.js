// Import File System module
const fs = require('fs');

// File name
const fileName = 'sample.txt';

// 1. Create and write to file
fs.writeFile(fileName, 'Hello, this is the initial content.\n', (err) => {
    if (err) {
        console.error("Error creating file:", err);
        return;
    }
    console.log("File created and data written successfully.");

    // 2. Read file content
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        console.log("\nFile Content after write:");
        console.log(data);

        // 3. Append data to file
        fs.appendFile(fileName, 'This is appended content.\n', (err) => {
            if (err) {
                console.error("Error appending file:", err);
                return;
            }
            console.log("\nData appended successfully.");

            // 4. Read file again
            fs.readFile(fileName, 'utf8', (err, updatedData) => {
                if (err) {
                    console.error("Error reading updated file:", err);
                    return;
                }
                console.log("\nFile Content after append:");
                console.log(updatedData);

                // 5. Delete file
                fs.unlink(fileName, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                        return;
                    }
                    console.log("\nFile deleted successfully.");
                });
            });
        });
    });
});