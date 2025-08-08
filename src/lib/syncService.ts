type SyncData = {
  key: string;
  value: string;
};

type SyncResponse = {
  success: boolean;
  data: SyncData[];
};

export class SyncService {
  static async uploadData(id: string, localStorageData: Record<string, unknown>) {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        localStorageData: Object.entries(localStorageData).map(([key, value]) => ({ key, value })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    return response.json();
  }

  static async downloadData(id: string): Promise<SyncResponse> {
    const response = await fetch(`/api/sync?userId=${id}`);

    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status}`);
    }

    return response.json();
  }
}
