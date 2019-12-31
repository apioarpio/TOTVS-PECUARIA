import express from "express";
import bodyParser from "body-parser"
import routers from './src/routes';
import initDb from './src/db/config/init';
import MACAdress from './src/config/MACAddress';
import getMAC, {isMAC} from 'getmac';
import os from 'os';

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// console.log(os.networkInterfaces())
// console.log(getMAC('wi-fi'));
// console.log(getMAC('eth0'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
routers(app);
initDb()
    .then(result => {
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    })
    .catch(err => {
        console.log(err);
    });
