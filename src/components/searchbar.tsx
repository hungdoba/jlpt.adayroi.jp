import { Input } from '@/components/ui/input';
import { SortSelect } from '@/components/ui/sort-select';
import { SortAscendingToggle } from '@/components/ui/sort-ascending';

export default function Searchbar() {
  return (
    <div className="flex space-x-4">
      <Input placeholder="Search..." />
      <SortSelect />
      <SortAscendingToggle />
    </div>
  );
}
