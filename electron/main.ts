import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../dist/thf-electron/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  });
}
