import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';
import {global} from "@angular/compiler/src/util";

var exec = require('child_process').exec;

let win: BrowserWindow;

console.log(__dirname);
console.log(path.join(__dirname, 'dist', 'electron'));

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'dist', 'electron'),
});

app.on('ready', () => {
  console.log('criando janela');
  createWindow();
  // var child = exec('npm start --prefix ./electron/pecuaria-db/');
  //
  // child.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });
  //
  // child.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // });
  //
  // child.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  //   console.log('fechando a janela');
  //   win.close();
  // });
});

app.on('activate', () => {
  if (win === null) {
    // console.warn('global variable');
    // console.log(global);
    createWindow();
  }
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
      pathname: path.join(__dirname, `../../dist/totvs-gestao-pecuaria/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  });
}
