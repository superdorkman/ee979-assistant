import { app, BrowserWindow, clipboard, globalShortcut, ipcMain, Menu, Tray, nativeImage, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
// import url from 'url';

let tray = null;

let isLoggedIn = false;
let win = null;
let gallaryWin = null;

// 系统托盘跳动
let blinkTimer;
let count = 0;

let menuWin = null;
let msgWin = null;

const trayIconPath = path.join(__dirname, 'logo.png');
let trayIcon = nativeImage.createFromPath(trayIconPath);
trayIcon = trayIcon.resize({ width: 16, height: 16 });

const startUrl = `file://${__dirname}/app.html`;
// const startUrl = '192.168.2.106:3000';

app.on('ready', createLoginWin);

app.on('will-quit', () => {
  // 清空所有快捷键
  globalShortcut.unregisterAll()
})

app.on('browser-window-blur', () => {
  globalShortcut.unregister('f5')
});

app.on('browser-window-focus', () => {
  globalShortcut.register('F5', () => {
    win.loadURL(startUrl);
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

function createLoginWin() {
  win = new BrowserWindow(
    {
      width: 428,
      height: 328,
      frame: false,
      icon: path.join(__dirname, 'logo.png'),
      // skipTaskbar: true,
      // webPreferences: {
      //   devTools: true
      // }
    }
  );

  globalShortcut.register('F5', () => {
    win.loadURL(startUrl);
  });

  ipcMain.on('app:extract', (event) => {
    win.minimize();
  });

  ipcMain.on('app:hide', (event) => {
    win.hide();
  });

  ipcMain.on('app:close', (event) => {
    win.close();
    app.quit();
  });

  ipcMain.on('auth:check', (event) => {
    event.returnValue = isLoggedIn;
  });
  
  win.loadURL(startUrl);

  if (process.env.NODE_ENV !== 'production') {
    win.webContents.openDevTools({mode: 'detach'});
  }

  setTray();
  
  ipcMain.on('auth:login', (event) => {
    isLoggedIn = true;
    prepareChatWin();
  });
  
}

function prepareChatWin() {
  // console.log(win.getBounds())
  const { width: sw, height: sh } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  // win.setSkipTaskbar(false);
  // win.loadURL(startUrl);
  const _x = (sw - 1300) / 2;
  const _y = (sh - 810) / 2;
  win.setMinimumSize(1300, 810);
  win.setBounds({
    x: 100,
    y: 20,
    width: 1300,
    height: 810,
  }, true);
  // win.setSize(1208, 796, true);
  
  const iconPath = path.join(__dirname, 'logo.png');
  let trayIcon = nativeImage.createFromPath(iconPath);
  trayIcon = trayIcon.resize({ width: 16, height: 16 });
  tray.setImage(trayIcon);

  ipcMain.on('app:expand', (event) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
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
    if (gallaryWin) return;
    const { width: sw, height: sh } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    gallaryWin = new BrowserWindow({
      width: sw - 100,
      height: sh - 100,
      frame: false,
      // backgroundColor: 'transparent',
      transparent: true,
      // icon: path.join(__dirname, 'logo.png'),
      // skipTaskbar: true,
      // webPreferences: {
      //   devTools: true
      // }
    });

    gallaryWin.loadURL(`file://${__dirname}/app.html#/gallary`);

    if (process.env.NODE_ENV !== 'production') {
      gallaryWin.webContents.openDevTools({mode: 'detach'});
    }

    gallaryWin.on('closed', () => {
      gallaryWin = null;
    })

    ipcMain.on('gallary:images', (event) => {
      event.returnValue = images;
    });

    ipcMain.on('gallary:close', (event, arg) => {
      if (!gallaryWin) return;
      gallaryWin.close();
      gallaryWin = null;
      // event.returnValue = images;
    });
  });

  // win.webContents.openDevTools({mode: 'detach'});

  // 检查更新
  autoUpdater.checkForUpdatesAndNotify();
  createdMenuWin();
  // createdMsgWin();
}

function notifyUser() {
  const isVisible = win.isVisible();  // 是否托盘中
  const isFocused = win.isFocused();  // 是否当前选中
  // console.log(isVisible, isFocused);
  if (!isFocused) {
    if (isVisible) {
      win.flashFrame(true);
      blink();
    } else {
      // console.log('should blink the tray')
      // blink();
    }
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
    // {label: '检查更新', click: () => {
    //   autoUpdater.checkForUpdatesAndNotify();
    // }},
    {role: 'quit', label: '退出程序'},
  ])
  tray.setToolTip('商家助手');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    win.show();
    if (isLoggedIn) {
      clearInterval(blinkTimer);
      tray.setImage(trayIcon);
    }
  });
}

function blink() {
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
  const { width: sw, height: sh } = require('electron').screen.getPrimaryDisplay().workAreaSize;
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
        win.webContents.send('online:toggle', true);
        break;
      case 'offline':
        win.webContents.send('online:toggle', false);
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
}

// 菜单win
// function createdMsgWin() {
//   // const { width: sw, height: sh } = require('electron').screen.getPrimaryDisplay().workAreaSize;
//   msgWin = new BrowserWindow({
//     width: 240,
//     minHeight: 170,
//     skipTaskbar: true,
//     frame: false,
//     movable: false,
//     resizable: false,
//     opacity: 0,
//     alwaysOnTop: true,
//   })

//   msgWin.loadURL(`file://${__dirname}/messages.html`);

//   msgWin.on('blur', () => {
//     msgWin.setOpacity(0);
//   });

//   ipcMain.on('msgs:click', (event, args) => {
//     msgWin.setOpacity(0);
//     switch (args.type) {
//       case 'online':
//         win.webContents.send('online:toggle', true);
//         break;
//       case 'offline':
//         win.webContents.send('online:toggle', false);
//         break;
//       case 'update':
//         autoUpdater.checkForUpdatesAndNotify();
//         break;
//       case 'quit':
//         app.exit();
//         break;
//     }
//   });

//   tray.on('mouse-enter', (event, bounds) => {
//     console.log(bounds);
//   });
//   tray.on('mouse-leave', (event, bounds) => {
//     msgWin.setOpacity(0);
//   });
// }

// 升级通信
function sendStatusToWindow(text) {
  win.webContents.send('update', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('检查更新...');
});

autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('有新版本');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('已是最新版本');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('更新出错' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  // let log_message = "下载速度" + progressObj.bytesPerSecond;
  // log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  let log_message = `已下载${parseInt(progressObj.percent)}%`;
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('下载完成，可以关闭程序进行更新');
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
