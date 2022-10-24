const { app, BrowserWindow } = require('electron');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        backgroundColor: '#253238',
        show: false,
        frame: false,
        width: 1440,
        height: 810,
        resizable: false,
    });
    win.loadFile('index.html');
    win.once('ready-to-show', () => win.show());
};

app.on('ready', () => {
    createWindow();
    const wc = win.webContents;
    wc.on('did-finish-load', () => {
        // autoplay hack :)
        wc.sendInputEvent({keyCode: 'Tab', type: 'keyDown'});
        wc.sendInputEvent({keyCode: 'Tab', type: 'char'});
        wc.sendInputEvent({keyCode: 'Tab', type: 'keyUp'});
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
