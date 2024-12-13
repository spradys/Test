// Requiring modules
const express = require('express');
const app = express();
const mssql = require("mssql");

// Get request
app.get('/', function (req, res) {

    // Config your database credential
    const config = {
        user: 'nwe',
        password: '123',
        server: 'DESKTOP-VNK5O5G',
        database: 'TODO',
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    };

    // Connect to your database
    mssql.connect(config, function (err) {
if (err) {
    console.error('Database Connection Error:', err);
    return;
}
console.log('Database connected successfully.');
        // Create Request object to perform
        // query operation
        let request = new mssql.Request();

        // Query to the database and get the records
        request.query('select * from [dbo].[to]',
            function (err, records) {
console.log('2 ', records);
                if (err) console.log(err)

                // Send records as a responses
                // to browser   
                res.send(records);

            });
    });
});

let server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});
