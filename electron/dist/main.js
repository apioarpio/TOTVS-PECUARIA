"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var exec = require('child_process').exec;
var win;
console.log(__dirname);
console.log(path.join(__dirname, 'dist', 'electron'));
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'dist', 'electron'),
});
electron_1.app.on('ready', function () {
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
electron_1.app.on('activate', function () {
    if (win === null) {
        // console.warn('global variable');
        // console.log(global);
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../../dist/totvs-gestao-pecuaria/index.html"),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('close', function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map