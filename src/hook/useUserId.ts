import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { createNewId, verifyId } from '@/lib/utils';
import { LocalStorageService } from '@/lib/localStorageService';
import { MESSAGES } from '@/constants/sync';

export function useUserId() {
  const [id, setId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const storedId = LocalStorageService.getUserId();
    setId(storedId ?? '');
  }, []);

  const createNewUserId = () => {
    const newId = createNewId();
    setId(newId);
    LocalStorageService.setUserId(newId);
    setHasUnsavedChanges(false);
  };

  const saveId = () => {
    if (!verifyId(id)) {
      toast.error(MESSAGES.INVALID_ID);
      return false;
    }

    LocalStorageService.setUserId(id);
    toast.success(MESSAGES.ID_SAVED);
    setHasUnsavedChanges(false);
    return true;
  };

  const copyId = async () => {
    if (id === '') {
      toast.warning(MESSAGES.CREATE_ID_FIRST);
      return;
    }

    try {
      await navigator.clipboard.writeText(id);
      toast.success(MESSAGES.ID_COPIED);
    } catch (err) {
      console.error('Failed to copy ID:', err);
      toast.error(MESSAGES.COPY_ERROR);
    }
  };

  const updateId = (newId: string) => {
    setId(newId);
    const storedId = LocalStorageService.getUserId();
    setHasUnsavedChanges(newId !== storedId);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const isValidId = verifyId(id);

  return {
    id,
    isEditMode,
    hasUnsavedChanges,
    isValidId,
    createNewUserId,
    saveId,
    copyId,
    updateId,
    toggleEditMode,
  };
}
