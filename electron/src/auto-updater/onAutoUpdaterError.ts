import {dialog} from "electron";

export default (autoUpdater) => {
  return new Promise((resolve, reject) => {
    autoUpdater.on('error', error => {
      resolve(error);
    });
  })
}
