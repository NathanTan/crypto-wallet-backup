// Import the express in typescript file
import express from 'express';

import multer from 'multer';
import fs from 'fs';
import path from 'path'

const fileUpload = require('express-fileupload');
 
// Initialize the express engine
const app = express();

 
// Take a port 3000 for running server.
const port: number = 3000;

const upload = multer({dest: 'tmp/test/csv'});
 

app.use(fileUpload());
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join( __dirname + "/../client", "/index.htm" ));
})

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/../client/" + "index.htm" );
 })
 

app.post('/test', upload.single('file'), async ( req, res, next ) => {
    const fileContents: any[] = await readFile((req as any).file.path);
    res.json(fileContents);
});


app.post('/file_upload', (req: any, res) => {
    console.log("attempting to upload a file")
    console.log(req)
    if (req.files) {
        const file = req.files.file
        const fileName = file.name
        file.mv(`${__dirname}/store/${fileName}`, (err: any) => {
            if (err) {
                console.log(err)
                res.send('There is error')
            } else {
                res.send('uploaded successfully')
            }
        })
    } else {
        res.send('There are no files')
    }
})

const readFile = (fileName: string ) => new Promise<any[]>((resolve, reject) => {
    const stream: any = [];
     
    fs.createReadStream(fileName)
      .on('data', (data: any) => stream.push(data))
      .on('end', () => {
         resolve(stream)
    });
});

// app.post('/file_upload', function (req, res) {
//     console.log(req.files.file.name);
//     console.log(req.files.file.path);
//     console.log(req.files.file.type);
//     var file = __dirname + "/" + req.files.file.name;
    
//     fs.readFile( req.files.file.path, function (err, data) {
//        fs.writeFile(file, data, function (err) {
//           if( err ) {
//              console.log( err );
//              } else {
//                 response = {
//                    message:'File uploaded successfully',
//                    filename:req.files.file.name
//                 };
//              }
          
//           console.log( response );
//           res.end( JSON.stringify( response ) );
//        });
//     });
//  })

 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});