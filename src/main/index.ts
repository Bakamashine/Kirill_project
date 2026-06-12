import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  net,
  protocol,
  shell,
} from "electron";
import path from "node:path";
import fs from "node:fs";
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

  mainWindow.menuBarVisible=false
  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: "Обо мне",
  //     click: () => {
  //       mainWindow.loadURL("/about")
  //     }
  //   },
  // ]);
  // mainWindow.setMenu(menu)
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

ipcMain.handle(
  "db:updateRecord",
  async (_event, id: number, title: string, markdown: string) => {
    await db("records").where({ id }).update({ title, markdown });
    return true;
  },
);

ipcMain.handle("editor:addImage", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      {
        name: "Images",
        extensions: ["png", "jpg", "jpeg", "gif", "webp", "bmp"],
      },
    ],
  });

  if (result.canceled || result.filePaths.length === 0) return null;

  const srcPath = result.filePaths[0];
  const ext = path.extname(srcPath);
  const fileName = `${Date.now()}${ext}`;

  const destDir = path.join(app.getPath("userData"), "images");

  await fs.promises.mkdir(destDir, { recursive: true });
  await fs.promises.copyFile(srcPath, path.join(destDir, fileName));

  return `media://images/${fileName}`;
});

protocol.registerSchemesAsPrivileged([
  {
    scheme: "media",
    privileges: { bypassCSP: true, stream: true, supportFetchAPI: true },
  },
]);

app.on("ready", async () => {
  db = await getDatabase();
  createWindow();
});

app.on("ready", () => {
  protocol.handle("media", (request) => {
    const filePath = decodeURIComponent(request.url.slice("media://".length));
    const fullPath = path.join(app.getPath("userData"), filePath);
    console.log("[media] streaming:", fullPath);
    // return fs.createReadStream(fullPath);
    return net.fetch(fullPath);
  });
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
