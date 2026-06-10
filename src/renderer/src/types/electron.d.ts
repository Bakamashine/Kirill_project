interface ElectronAPI {
  saveRecord: (title: string, markdown: string) => Promise<number>;
  getRecords: () => Promise<
    {
      id: number;
      title: string;
      markdown: string;
      created_at: string;
      updated_at: string;
    }[]
  >;
  deleteRecord: (id: number) => Promise<void>;
}

interface Window {
  electronAPI: ElectronAPI;
}
