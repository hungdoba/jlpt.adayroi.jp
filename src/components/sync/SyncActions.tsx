import { ArrowDownFromLine, ArrowUpFromLine } from 'lucide-react';
import { Button } from '../ui/Button';

interface SyncActionsProps {
  id: string;
  isSyncing: boolean;
  isValidId: boolean;
  hasUnsavedChanges: boolean;
  onUpload: (id: string) => void;
  onDownload: (id: string) => void;
}

export function SyncActions({
  id,
  isSyncing,
  isValidId,
  hasUnsavedChanges,
  onUpload,
  onDownload,
}: SyncActionsProps) {
  const isDisabled = isSyncing || !isValidId || hasUnsavedChanges;

  return (
    <>
      <Button type="button" className="w-full" onClick={() => onDownload(id)} disabled={isDisabled}>
        <ArrowDownFromLine />
        Tải xuống từ cloud
      </Button>
      <Button type="button" className="w-full" onClick={() => onUpload(id)} disabled={isDisabled}>
        <ArrowUpFromLine />
        Tải lên cloud
      </Button>
    </>
  );
}
