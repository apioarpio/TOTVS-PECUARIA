import * as bodyParser from 'body-parser'
import * as express from 'express'
import routers from './src/routes';
import initDb from './src/db/config/init';

const exp = express();
const hostname = '127.0.0.1';
const port = 3000;
exp.use(bodyParser.json({limit: '50mb'}));
exp.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
routers(exp);
initDb()
    .then(result => {
        exp.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    })
    .catch(err => {
        console.log(err);
    });
