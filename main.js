const { app, BrowserWindow, Menu } = require('electron');
const isMac = process.platform === 'darwin';

let mainWindow;

const menuTemplate = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    {
        label: 'lofi',
        submenu: [
            {
                label: 'beats to relax/study to',
                accelerator: 'cmd+1',
                click() {
                    mainWindow.loadFile('index.html');
                },
            },
            {
                label: 'beats to sleep/chill to',
                accelerator: 'cmd+2',
                click() {
                    mainWindow.loadFile('chill.html');
                },
            },
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
]

const createWindow = () => {
    return new BrowserWindow({
        backgroundColor: '#253238',
        show: false,
        frame: false,
        width: 1440,
        height: 810,
        resizable: false,
    });
};

app.on('ready', () => {
    mainWindow = createWindow();
    mainWindow.loadFile('index.html');
    mainWindow.once('ready-to-show', () => mainWindow.show());

    const wc = mainWindow.webContents;
    wc.on('did-finish-load', () => {
        // autoplay hack :)
        wc.sendInputEvent({keyCode: 'Tab', type: 'keyDown'});
        wc.sendInputEvent({keyCode: 'Tab', type: 'char'});
        wc.sendInputEvent({keyCode: 'Tab', type: 'keyUp'});
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
