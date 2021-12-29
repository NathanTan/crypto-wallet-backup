import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path'
import SecurityManager from './securityManager'
import 'dotenv/config'

const fileUpload = require('express-fileupload');

const bodyParser = require("body-parser")

// Initialize the express engine
const app = express();

const securityManager = new SecurityManager()

// Allow server to send static js files
app.use('/', express.static('./public'));

// Take a port 3000 for running server.
const port: number = 3000;

let status = {
    "error": false,
    "message": ""
}

app.use(
    rateLimit({
        windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
        max: 5000,
        message: "You exceeded 5 requests in 12 hour limit!",
        headers: true,
    })
);

app.use(bodyParser.json());
//configures body parser to parse JSON
app.use(bodyParser.urlencoded({ extended: false }));
//configures body parser to parse url encoded data


app.use(fileUpload());
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../client", "/index.htm"));
})

app.get('/index.htm', function (req, res) {
    res.sendFile(path.resolve("/client/index.htm"));
})

app.get('/status', (req, res) => {
    res.send(status)
})


app.post('/file_upload', (req: any, res) => {
    console.log("attempting to upload a file")

    if (!securityManager.validateRequest(req)) {
        res.send({
            ok: false,
            message: "Username or password incorrect"
        })
    }

    console.log("----00---")

    console.log(req.iv)
    console.log(req.body)

    if (req.files) {
        const file = req.files.file
        const fileName = file.name
        const filePath = `${__dirname}/store/${fileName}`
        console.log(`Saving file to ${filePath}`)
        file.mv(filePath, (err: any) => {
            if (err) {
                console.log(err)
                status.error = true
                status.message = err + " " + filePath + " " + getFormattedTime()
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