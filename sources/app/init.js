const NODE_ENV = process.env.NODE_ENV;

// noinspection NpmUsedModulesInstalled
const electron = require('electron');
// Module to control application life.
//noinspection JSUnresolvedVariable
const app = electron.app;
// Module to create native browser window.
//noinspection JSUnresolvedVariable
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function initApplication() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 640,
        minWidth: 980,
        minHeight: 600,
        frame: false,
        show: false,
        backgroundColor: '#fff',
        selectedTextBackgroundColor: '#ffcf00',
        titleBarStyle: 'hidden-inset'
        // titleBarStyle: 'hidden'
    });

    // BrowserWindow.webPreferences.experimentalFeatures = true;


    //noinspection JSUnresolvedFunction
    mainWindow.loadURL(`file://${__dirname}/template.html`);

    // Open the DevTools.
    if (NODE_ENV === 'development') {
        //noinspection JSUnresolvedVariable, JSUnresolvedFunction
        mainWindow.webContents.openDevTools();
        // let extension = BrowserWindow.addDevToolsExtension('/Users/iyanello/Library/Application\ Support/Google/' +
        //     'Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/2.0.2_0');
        //
        // BrowserWindow.removeDevToolsExtension('nhdogjmejiglipccpnnnanhbledajbpd');

        // BrowserWindow.addDevToolsExtension('/Users/iyanello/Projects/JavaScript/uCard/node_modules/vue-devtools/' +
        //     'shells/chrome');
    } else {
        process.env.NODE_ENV = 'production';
    }


    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        // and load the index.html of the app.
        //noinspection JSUnresolvedFunction
        mainWindow.show();
    });
}

app.on('ready', initApplication);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        //noinspection JSUnresolvedFunction
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        initApplication();
    }
});


let options = [
    //'enable-tcp-fastopen',
    'enable-experimental-canvas-features',
    'enable-experimental-web-platform-features',
    'enable-overlay-scrollbars',
    'enable-hardware-overlays',
    'enable-universal-accelerated-overflow-scroll',
    '--harmony_modules'
    //'allow-file-access-from-files',
    //'allow-insecure-websocket-from-https-origin',
    // ['js-flags', '--harmony_collections']
];

for (let i = 0; i < options.length; ++i) {
    if (typeof options[i] === 'string')
        app.commandLine.appendSwitch(options[i]);
    else
        app.commandLine.appendSwitch(options[i][0], options[i][1]);
}