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
    try {
      const data = await window.electronAPI.getRecords();
      runInAction(() => {
        this.records = data;
      });
    } catch {
      console.error("Failed to fetch records");
    }
  }

  async deleteRecord(id: number) {
    try {
      await window.electronAPI.deleteRecord(id);
      await this.fetchRecords();
    } catch {
      console.error("Failed to delete record");
    }
  }
}

export const recordStore = new RecordStore();
