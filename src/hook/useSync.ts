import { useState } from 'react';
import { toast } from 'sonner';
import { verifyId } from '@/lib/utils';
import { getLocalStorageData } from '@/lib/localStorage';
import { MESSAGES, SYNC_KEY } from '@/constants/sync';
import { SyncService } from '@/lib/syncService';
import { LocalStorageService } from '@/lib/localStorageService';

export function useSync(onSyncDone?: () => void) {
  const [isSyncing, setIsSyncing] = useState(false);

  const uploadData = async (id: string) => {
    if (!verifyId(id)) {
      toast.error(MESSAGES.INVALID_ID);
      return;
    }

    const localStorageData = getLocalStorageData(SYNC_KEY);
    if (Object.keys(localStorageData).length === 0) {
      toast.warning(MESSAGES.NO_LOCAL_DATA);
      return;
    }

    try {
      setIsSyncing(true);
      await SyncService.uploadData(id, localStorageData);
      toast.success(MESSAGES.UPLOAD_SUCCESS);
      onSyncDone?.();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(MESSAGES.UPLOAD_ERROR);
    } finally {
      setIsSyncing(false);
    }
  };

  const downloadData = async (id: string) => {
    if (!verifyId(id)) {
      toast.error(MESSAGES.INVALID_ID);
      return;
    }

    try {
      setIsSyncing(true);
      const result = await SyncService.downloadData(id);

      if (result.success && Array.isArray(result.data)) {
        if (result.data.length === 0) {
          toast.warning(MESSAGES.NO_CLOUD_DATA);
          return;
        }

        // Clear existing sync data
        LocalStorageService.clearSyncData();

        // Set new data
        LocalStorageService.setSyncData(result.data);

        toast.success(MESSAGES.DOWNLOAD_SUCCESS);

        // Reload to reflect changes
        window.location.reload();
      } else {
        toast.error(MESSAGES.INVALID_DATA);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error(MESSAGES.DOWNLOAD_ERROR);
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isSyncing,
    uploadData,
    downloadData,
  };
}
