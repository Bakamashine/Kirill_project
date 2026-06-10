import { contextBridge, ipcRenderer } from "electron";

const electronAPI = {
  saveRecord: (title: string, markdown: string) =>
    ipcRenderer.invoke("db:saveRecord", title, markdown),
  getRecords: () => ipcRenderer.invoke("db:getRecords"),
  deleteRecord: (id: number) => ipcRenderer.invoke("db:deleteRecord", id),
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);

export type ElectronAPI = typeof electronAPI;

