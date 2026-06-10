import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { getDatabase } from './AppDatabase';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // mainWindow.webContents.openDevTools();

};

ipcMain.handle("db:saveRecord", async (_event, title: string, markdown: string) => {
  const db = await getDatabase();
  const [id] = await db("records").insert({ title, markdown });
  return id;
});

ipcMain.handle("db:getRecords", async () => {
  const db = await getDatabase();
  return db("records").orderBy("created_at", "desc");
});

ipcMain.handle("db:deleteRecord", async (_event, id: number) => {
  const db = await getDatabase();
  await db("records").where({ id }).del();
});

app.on('ready', async () => {
  await getDatabase();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
