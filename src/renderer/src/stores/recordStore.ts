import { makeAutoObservable, runInAction } from "mobx";

export interface IRecord {
  id: number;
  title: string;
  markdown: string;
  created_at: string;
  updated_at: string;
}

class RecordStore {
  records: IRecord[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRecords() {
    const data = await window.electronAPI.getRecords();
    runInAction(() => {
      this.records = data;
    });
  }

  async saveRecord(title: string, markdown: string) {
    await window.electronAPI.saveRecord(title, markdown);
    await this.fetchRecords();
  }
  async deleteRecord(id: number) {
    await window.electronAPI.deleteRecord(id);
    await this.fetchRecords();
  }

  async updateRecord(id: number, title: string, markdown: string) {
    if (title && markdown) {
      await window.electronAPI.updateRecord(id, title, markdown);
      await this.fetchRecords();
      return true;
    }
    return false;
  }
}

export const recordStore = new RecordStore();
