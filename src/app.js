// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import * as os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import AppUpdater from './app-updater';

console.log('Loaded environment variables:', env);

var { app, BrowserWindow } = remote;
var appDir = jetpack.cwd(app.getAppPath());

console.log('version: ', app.getVersion());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('greet').innerHTML = greet();
    document.getElementById('platform-info').innerHTML = os.platform();
    document.getElementById('env-name').innerHTML = env.name;
    document.getElementById('version').innerHTML = app.getVersion();
    document.body.style.backgroundColor = '#eee';
    document.body.style.color = '#111';
    document.getElementById('greet').style.color = 'blue';
    const updater = new AppUpdater(BrowserWindow.getAllWindows()[0]);
    console.log('download directory: ', app.getPath('downloads'));
});