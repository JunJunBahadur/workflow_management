const express = require('express');
const cors = require('cors');
const app = express();

const lookup = require('mime-types').lookup;
const { exec } = require("child_process");

function runUserRegister(user) {
    exec('echo "registerUser.js ' + user +'"', (error, stdout, stderr) => {
        if (error) {
            console.log(`error: `+error.message);
            return;
        }
        if (stderr) {
            console.log(`stderr: `+stderr);
            return;
        }
        console.log(`stdout: `+stdout);
    });
}

function runAddDoc(user) {
    exec("node addDocByFile.js " + user + " test.txt", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: `+error.message);
            return;
        }
        if (stderr) {
            console.log(`stderr: `+stderr);
            return;
        }
        console.log(`stdout: `+stdout);
    });
}

function runNextSign(user) {
    exec("node nextSignOnFile.js " + user + " test.txt", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: `+error.message);
            return;
        }
        if (stderr) {
            console.log(`stderr: `+stderr);
            return;
        }
        console.log(`stdout: `+stdout);
    });
}

app.use(cors());
app.use(express.json());

app.get('/message', (req,res) => {
    res.json({message: "Hello from server!"});
});

app.post('/payment', (req, res) => {
    const body = req.body;
    console.log(body['name']);
    runUserRegister(body['email'])
    res.send('ok');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});