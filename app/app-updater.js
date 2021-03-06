(function () {'use strict';

var electron = require('electron');
var os = require('os');

const { app, autoUpdater, Notification, BrowserWindow: BrowserWindowElectron } = electron.remote;

const UPDATE_SERVER_HOST = "shielded-everglades-24834.herokuapp.com"

function isDev() {
  return app.getPath("exe").includes("/node_modules/electron")
}

class AppUpdater {
  constructor(win) {
    if (isDev()) {
      console.log('in dev mode');
      return
    }

    const platform = os.platform()
    if (platform === "linux") {
      return
    }

    const version = app.getVersion()

    autoUpdater.addListener("update-available", (event) => {
      console.log("A new update is available")
    })

    autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL, quitAndInstall) => {
      const restart = confirm(`Version ${releaseName} is downloaded and will be automatically installed on Quit`);
      if (restart) {
        quitAndInstall();
      }
    })

    autoUpdater.addListener("error", (error) => {
      console.log(JSON.stringify(error, null, 2))
    })

    autoUpdater.addListener("checking-for-update", (event) => {
      console.log("checking-for-update")
    })

    autoUpdater.addListener("update-not-available", () => {
      console.log("update-not-available")
    })

    if (platform === "darwin") {
      autoUpdater.setFeedURL(`https://${UPDATE_SERVER_HOST}/update/${platform}_${os.arch()}/${version}`)
    }

    win.webContents.once("did-frame-finish-load", (event) => {
      autoUpdater.checkForUpdates()
    })
  }
}

module.exports = AppUpdater;
}());
//# sourceMappingURL=app-updater.js.map