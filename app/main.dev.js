import { app, BrowserWindow, clipboard, globalShortcut, ipcMain, Menu, Tray, nativeImage, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
// import url from 'url';

let tray = null;

let isLoggedIn = false;
let session = null;
let win = null;
let mainWin = null;
let menuWin = null;
let gallaryWin = null;

let targetWin = null;

// 系统托盘跳动
let blinkTimer;
let count = 0;

const trayIconPath = path.join(__dirname, 'logo.png');
let trayIcon = nativeImage.createFromPath(trayIconPath);
trayIcon = trayIcon.resize({ width: 16, height: 16 });

const startUrl = `file://${__dirname}/app.html`;

app.on('ready', createLoginWin);

app.on('will-quit', () => {
  // 清空所有快捷键
  // console.log('will-quit');
  globalShortcut.unregisterAll();
})

app.on('browser-window-blur', () => {
  globalShortcut.unregister('ctrl+F5')
});

app.on('browser-window-focus', () => {
  globalShortcut.register('ctrl+F5', () => {
    let _win = win || mainWin;
    _win.loadURL(startUrl);
  });
});

app.on('window-all-closed', () => {
  // console.log('window-all-closed');
  app.quit();
});

function createLoginWin() {
  win = new BrowserWindow(
    {
      width: 428,
      height: 328,
      frame: false,
      icon: path.join(__dirname, 'logo.png'),
      show: false,
    }
  );

  globalShortcut.register('ctrl+alt+i', () => {
    win.webContents.openDevTools({mode: 'detach'});
  });

  ipcMain.on('app:extract', (event) => {
    let _win = win || mainWin;
    _win.minimize();
  });

  ipcMain.on('app:hide', (event) => {
    let _win = win || mainWin;
    _win.hide();
  });

  ipcMain.on('app:close', (event) => {
    let _win = win || mainWin;
    _win.close();
    app.quit();
  });

  win.loadURL(startUrl);

  win.once('ready-to-show', () => {
    win.show();
  });

  setTray();
  
  ipcMain.on('auth:login', (event, data) => {
    isLoggedIn = true;
    session = data;
    prepareChatWin();
  });

  ipcMain.on('auth:check', (event) => {
    event.returnValue = session;
  });
}


function prepareChatWin() {
  // console.log(win.getBounds())
  // const { width: sw, height: sh } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  // win.setSkipTaskbar(false);
  // win.loadURL(startUrl);
  // const _x = (sw - 1300) / 2;
  // const _y = (sh - 810) / 2;
  // win.setMinimumSize(1300, 810);
  // win.setBounds({
  //   x: 100,
  //   y: 20,
  //   width: 1300,
  //   height: 810,
  // }, true);
  // win.center();

  // win.destroy();
  // win = null;

  mainWin = new BrowserWindow({
    width: 1300,
    height: 810,
    center: true,
    show: false,
    frame: false,
    icon: path.join(__dirname, 'logo.png'),
  });

  mainWin.loadURL(startUrl);

  mainWin.once('ready-to-show', () => {
    mainWin.show();
    win.destroy();
    win = null;
  });

  if (process.env.NODE_ENV !== 'production') {
    mainWin.webContents.openDevTools({mode: 'detach'});
  }

  mainWin.on('focus', () => {
    clearInterval(blinkTimer);
    tray.setImage(trayIcon);
  });

  const iconPath = path.join(__dirname, 'logo.png');
  let trayIcon = nativeImage.createFromPath(iconPath);
  trayIcon = trayIcon.resize({ width: 16, height: 16 });
  tray.setImage(trayIcon);

  ipcMain.on('app:expand', (event) => {
    if (mainWin.isMaximized()) {
      mainWin.unmaximize();
    } else {
      mainWin.maximize();
    }
  });

  ipcMain.on('message:arrive', (event, message) => {
    notifyUser();
  });

  ipcMain.on('clipboard:copy', (event, text) => {
    clipboard.writeText(text);
  });

  ipcMain.on('shell:openExternal', (event, url) => {
    shell.openExternal(url);
  });

  ipcMain.on('gallary:open', (event, images) => {
    if (gallaryWin) {
      gallaryWin.setOpacity(1);
      gallaryWin.focus();
      gallaryWin.webContents.send('gallary:reopen', images);
      return;
    }
    const { width: sw, height: sh } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    gallaryWin = new BrowserWindow({
      width: sw - 100,
      height: sh - 100,
      frame: false,
      transparent: true,
      skipTaskbar: true,
    });

    gallaryWin.loadURL(`file://${__dirname}/app.html#/gallary`);

    if (process.env.NODE_ENV !== 'production') {
      gallaryWin.webContents.openDevTools({mode: 'detach'});
    }

    gallaryWin.on('closed', () => {
      gallaryWin = null;
    });

    ipcMain.on('gallary:images', (event) => {
      event.returnValue = images;
    });

    ipcMain.on('gallary:close', (event, arg) => {
      if (!gallaryWin) return;
      gallaryWin.setOpacity(0);
    });

  });

  // 检查更新
  autoUpdater.checkForUpdatesAndNotify();
  // autoUpdater.checkForUpdates();
  
  ipcMain.on('app:update', (event) => {
    autoUpdater.quitAndInstall();
  });

  createdMenuWin();
}

function notifyUser() {
  const isVisible = mainWin.isVisible();  // 是否托盘中
  const isFocused = mainWin.isFocused();  // 是否当前选中
  if (!isVisible) return blink();
  if (!isFocused) {
    mainWin.flashFrame(true);
    blink();
  }
}

function setTray() {
  const iconPath = path.join(__dirname, 'logogray.png');
  let trayIconGray = nativeImage.createFromPath(iconPath);
  trayIconGray = trayIconGray.resize({ width: 16, height: 16 });
  tray = new Tray(trayIconGray);
  const contextMenu = Menu.buildFromTemplate([
    {label: '显示窗口', click: () => {
      win.show();
    }},
    {role: 'quit', label: '退出程序'},
  ])
  tray.setToolTip('商家助手');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    let _win = win || mainWin;
    if (_win) {
      if (_win.isDestroyed()) {
      } else {
        _win.show();
      }
    } else {
      restoreWin();
    }
    
    if (isLoggedIn) {
      clearInterval(blinkTimer);
      tray.setImage(trayIcon);
    }
  });
}

function blink() {
  clearInterval(blinkTimer);
  const emptyIconPath = path.join(__dirname, 'empty.png');
  let emptyIcon = nativeImage.createFromPath(emptyIconPath);
  emptyIcon = emptyIcon.resize({ width: 16, height: 16 });

  blinkTimer = setInterval(() => {
    if (count % 2 === 0) {
      tray.setImage(emptyIcon);
    } else {
      tray.setImage(trayIcon);
    }
    count++;
  }, 400);
}

// 菜单win
function createdMenuWin() {
  tray.setContextMenu(null);
  // const { width: sw, height: sh } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  menuWin = new BrowserWindow({
    width: 160,
    height: 178,
    skipTaskbar: true,
    frame: false,
    movable: false,
    resizable: false,
    opacity: 0,
    alwaysOnTop: true,
  })

  menuWin.loadURL(`file://${__dirname}/menu.html`);

  menuWin.on('blur', () => {
    menuWin.setOpacity(0);
  });

  ipcMain.on('menu:click', (event, args) => {
    menuWin.setOpacity(0);
    switch (args.type) {
      case 'online':
        mainWin.webContents.send('online:toggle', true);
        break;
      case 'offline':
        mainWin.webContents.send('online:toggle', false);
        break;
      case 'update':
        autoUpdater.checkForUpdatesAndNotify();
        break;
      case 'quit':
        app.exit();
        break;
    }
  });

  tray.on('right-click', (event, bounds) => {
    const {x, y} = bounds;
    menuWin.setBounds({
      x: x - 160,
      y: y - 170,
      width: 160,
      height: 178
    });
    menuWin.setOpacity(1);
    menuWin.focus();
    // clearInterval(blinkTimer);
    // tray.setImage(trayIcon);
  });

  mainWin.on('closed', () => {
    tray.destroy();
    menuWin.destroy();
  });
}

// 升级通信
function sendStatusToWindow(text) {
  mainWin.webContents.send('update', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('检查更新');
});

autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('有新版本');
});

autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('已是最新版本');
});

autoUpdater.on('error', (err) => {
  sendStatusToWindow('更新出错');
});

autoUpdater.on('download-progress', (progressObj) => {
  // let log_message = "下载速度" + progressObj.bytesPerSecond;
  // log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  let log_message = `已下载${parseInt(progressObj.percent)}%`;
  sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('下载完成');
});

// Auto updates - Option 1 - Simplest version
// This will immediately download an update, then install when the app quits.
// app.on('ready', function () {
//   autoUpdater.checkForUpdatesAndNotify();
// });

// Auto updates - Option 2 - More control
// The app doesn't need to listen to any events except `update-downloaded`
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();  
// })
