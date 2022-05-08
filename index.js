const DiffService = require('./DiffService');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/diff', async (req, res) => {
    const file1 = req.body.file1,
        file2 = req.body.file2;

    let file1Name = 'file1.json',
        file2Name = 'file2.json';
    try {
        JSON.parse(file1);
    } catch (e) {
        file1Name = 'file1.yaml';
    }

    try {
        JSON.parse(file2);
    } catch (e) {
        file2Name = 'file2.yaml';
    }

    fs.writeFile(file1Name, file1, function (err) {
        if (err) throw err;
        console.log('Saved file 1!');
        fs.writeFile(file2Name, file2, function (err) {
            if (err) throw err;
            console.log('Saved file 2!');

            DiffService.getAPIDiff(file1Name, file2Name, (err, data) => {
                if (err) {
                    console.log('Error ', err);
                    res.send(err);
                }
                console.log(data);
                res.send(data);
            })
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})