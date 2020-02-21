import {autoUpdater} from 'electron-updater'
import {error} from "selenium-webdriver";
import {dialog} from 'electron';

let updater = {
  enabled: false
};

autoUpdater.on('error', error => {
  console.log(error == null ? "Desconhecido" : (error.stack || error).toString());
  // dialog.showErrorBox('Error: ', "Não foi possível atualizar a aplicação.")
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
      type: 'info',
      title: 'Atualização encontrada',
      message: 'Deseja atualizar agora?',
      buttons: ['Sim', 'não']
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate()
      } else {
        updater.enabled = true;
        updater = null;
      }
    }
  )
});

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  });
  updater.enabled = true;
  updater = null;
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...'
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall())
  })
});

// export this to MenuItem click callback
function checkForUpdates(menuItem, focusedWindow, event) {
  updater = {
    enabled: false
  };
  updater.enabled = false;
  return autoUpdater.checkForUpdates()
    .then((result) => {
      console.log();
      dialog.showMessageBox({
        title: 'info',
        message: 'atualização finalizada'
      });
    });
}


export default checkForUpdates;


