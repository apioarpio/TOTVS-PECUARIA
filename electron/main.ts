import {app, BrowserWindow, ipcRenderer, ipcMain} from 'electron';
import * as bodyParser from 'body-parser'
import * as path from 'path';
import * as url from 'url';
import * as express from 'express'
import routers from './src/routes';
import initDb from './src/db/config/init';
import appUpdater from "./src/auto-updater/update";

let win: BrowserWindow;

app.on('ready', () => {
  appUpdater(null, null, null)
    .then(result => {
      console.log();
      createWindow();
    })
    .catch(err => {
      console.log();
      createWindow();
    });
});

app.on('activate', () => {
  if (win === null) {
    // createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  console.log(event);
  console.log(app.getVersion());
});

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });

  win.loadURL(
    url.format({
      // pathname: path.join(__dirname, `../../dist/totvs-gestao-pecuaria/index.html`),
      pathname: path.join(__dirname, `../totvs-gestao-pecuaria/index.html`),
      protocol: 'file:',
      slashes: true
    })
  )
    .then(result => {
      console.log('criando janela');
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
      console.log('loadURL result', result)
    })
    .catch(err => {
      console.log('loadURL Error', err)
    });

  win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  });

}
