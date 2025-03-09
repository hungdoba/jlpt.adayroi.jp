import { ArrowDownZA } from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';

export function SortAscendingToggle() {
  return (
    <Toggle defaultPressed aria-label="Toggle italic">
      <ArrowDownZA className="h-4 w-4" />
    </Toggle>
  );
}
