import BrowserWindow = Electron.BrowserWindow;

var exec = require('child_process').exec;

export default class Database {
  startDatabase(window: BrowserWindow) {
    console.log('iniciando banco de dados');
    var child = exec('npm start --prefix ./electron/pecuaria-db/');
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      window.close()
    });
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      console.log('fechando a janela');
    });
  }
}
