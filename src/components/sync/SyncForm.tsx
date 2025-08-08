'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { useUserId } from '@/hook/useUserId';
import { useSync } from '@/hook/useSync';
import { UserIdInput } from './UserIdInput';
import { IdManagementActions } from './IdManagementActions';
import { SyncActions } from './SyncActions';
import { ConfirmCreateIdDialog } from './ConfirmCreateIdDialog';

export interface Props {
  onSyncDone?: () => void;
}

export function SyncForm({ onSyncDone }: Props) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const {
    id,
    isEditMode,
    hasUnsavedChanges,
    isValidId,
    createNewUserId,
    saveId,
    copyId,
    updateId,
    toggleEditMode,
  } = useUserId();

  const { isSyncing, uploadData, downloadData } = useSync(onSyncDone);

  const handleCreateNewId = () => {
    if (id !== '') {
      setShowConfirmDialog(true);
      return;
    }
    createNewUserId();
  };

  const handleConfirmCreateNewId = () => {
    createNewUserId();
    setShowConfirmDialog(false);
  };

  return (
    <div className="w-full">
      <Card className="w-full bg-transparent my-8 md:my-24 border-0">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <UserIdInput id={id} isEditMode={isEditMode} onIdChange={updateId} />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <IdManagementActions
            isEditMode={isEditMode}
            hasUnsavedChanges={hasUnsavedChanges}
            onToggleEdit={toggleEditMode}
            onCreateNewId={handleCreateNewId}
            onCopyId={copyId}
            onSaveId={saveId}
          />
          <SyncActions
            id={id}
            isSyncing={isSyncing}
            isValidId={isValidId}
            hasUnsavedChanges={hasUnsavedChanges}
            onUpload={uploadData}
            onDownload={downloadData}
          />
        </CardFooter>
      </Card>

      <ConfirmCreateIdDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmCreateNewId}
      />
    </div>
  );
}
