import express from 'express';
import path from 'path'

const fileUpload = require('express-fileupload');

// Initialize the express engine
const app = express();

// Take a port 3000 for running server.
const port: number = 3000;

let status = {
    "error": false,
    "message": ""
}

app.use(fileUpload());
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../client", "/index.htm"));
})

app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + "/../client/" + "index.htm");
})

app.get('/status', (req, res) => {
    res.send(status)
})


app.post('/file_upload', (req: any, res) => {
    console.log("attempting to upload a file")
    if (req.files) {
        const file = req.files.file
        const fileName = file.name
        file.mv(`${__dirname}/store/${fileName}`, (err: any) => {
            if (err) {
                console.log(err)
                status.error = true
                status.message = err + " " + `${__dirname}/store/${fileName}` + " " + getFormattedTime()
                res.send('There is error')
            } else {
                res.send(`Successful upload at ${getFormattedTime()}`)
            }
        })
    } else {
        res.send('There are no files')
    }
})

const getFormattedTime = () => {
    const date_ob = new Date(Date.now())
    const date = date_ob.getDate()
    const month = date_ob.getMonth() + 1
    const year = date_ob.getFullYear()

    // prints date & time in YYYY-MM-DD format
    return (year + "-" + month + "-" + date);
}

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});