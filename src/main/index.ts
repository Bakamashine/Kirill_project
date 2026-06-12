import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { getDatabase } from "./AppDatabase";

let db: Awaited<ReturnType<typeof getDatabase>>;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
};

ipcMain.handle(
  "db:saveRecord",
  async (_event, title: string, markdown: string) => {
    const [id] = await db("records").insert({ title, markdown });
    return id;
  },
);

ipcMain.handle("db:getRecords", async () => {
  return db("records").orderBy("created_at", "desc");
});

ipcMain.handle("db:deleteRecord", async (_event, id: number) => {
  await db("records").where({ id }).del();
});

ipcMain.handle("db:getRecordById", async (_event, id: number) => {
  return db("records").where({ id }).first();
});

ipcMain.handle("db:updateRecord", async (_event, id: number, title: string, markdown: string) => {
  await db("records").where({ id }).update({ title, markdown });
  return true;
});

app.on("ready", async () => {
  db = await getDatabase();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
