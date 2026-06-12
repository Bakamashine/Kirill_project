interface IRecord {
  id: number;
  title: string;
  markdown: string;
  created_at: string;
  updated_at: string;
}
interface ElectronAPI {
  saveRecord: (title: string, markdown: string) => Promise<number>;
  // getRecords: () => Promise<IRecord[]>;
  getRecords: () => Promise<IRecord[]>;
  deleteRecord: (id: number) => Promise<void>;
  getRecordById: (id: number) => Promise<IRecord>;
  updateRecord: (id:number, title: string, markdown: string) => Promise<boolean>;
  Editor: {
    addImage: () => Promise<string>
  }
}

interface Window {
  electronAPI: ElectronAPI;
}
