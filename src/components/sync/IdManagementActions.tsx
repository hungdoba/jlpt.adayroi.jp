import { Button } from '../ui/Button';

interface IdManagementActionsProps {
  isEditMode: boolean;
  hasUnsavedChanges: boolean;
  onToggleEdit: () => void;
  onCreateNewId: () => void;
  onCopyId: () => void;
  onSaveId: () => void;
}

export function IdManagementActions({
  isEditMode,
  hasUnsavedChanges,
  onToggleEdit,
  onCreateNewId,
  onCopyId,
  onSaveId,
}: IdManagementActionsProps) {
  return (
    <>
      <Button variant="outline" className="w-full" onClick={onToggleEdit}>
        {isEditMode ? 'Hoàn tất chỉnh sửa' : 'Chỉnh sửa'}
      </Button>
      <Button variant="outline" className="w-full" onClick={onCreateNewId}>
        Tạo ID mới
      </Button>
      <Button variant="outline" className="w-full" onClick={onCopyId}>
        Copy ID
      </Button>
      <Button
        variant="outline"
        className="w-full mb-4"
        onClick={onSaveId}
        disabled={!hasUnsavedChanges}
      >
        Lưu ID vào máy
      </Button>
    </>
  );
}
