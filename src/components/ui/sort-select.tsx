import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SortSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Date" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="author">Author</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
