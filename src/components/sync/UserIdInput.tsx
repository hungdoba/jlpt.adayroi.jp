import { ChangeEvent } from 'react';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

interface UserIdInputProps {
  id: string;
  isEditMode: boolean;
  onIdChange: (id: string) => void;
}

export function UserIdInput({ id, isEditMode, onIdChange }: UserIdInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onIdChange(event.target.value);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="id">ID</Label>
      <p className="text-xs text-muted-foreground">
        Định dạng: <span className="font-mono">xxx-xxx-xxx-xxx-xxx</span> (x là một số)
      </p>
      <Input
        id="id"
        type="text"
        placeholder="xxx-xxx-xxx-xxx-xxx"
        required
        disabled={!isEditMode}
        value={id}
        onChange={handleChange}
      />
    </div>
  );
}
