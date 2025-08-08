import { BookmarkStatus } from '@/types/bookmark';

export function getStatusColor(status: BookmarkStatus): string {
  switch (status) {
    case BookmarkStatus.Again:
      return 'red';
    case BookmarkStatus.Hard:
      return 'yellow';
    case BookmarkStatus.Good:
      return 'green';
    case BookmarkStatus.Easy:
      return 'blue';
    case BookmarkStatus.New:
      return 'gray';
    default:
      return '';
  }
}

export function getNextStatus(currentStatus: BookmarkStatus): BookmarkStatus {
  switch (currentStatus) {
    case BookmarkStatus.New:
      return BookmarkStatus.Easy;
    case BookmarkStatus.Again:
      return BookmarkStatus.Hard;
    case BookmarkStatus.Hard:
      return BookmarkStatus.Good;
    case BookmarkStatus.Good:
      return BookmarkStatus.Easy;
    case BookmarkStatus.Easy:
      return BookmarkStatus.Easy;
    default:
      return BookmarkStatus.New;
  }
}

export function getPreviousStatus(currentStatus: BookmarkStatus): BookmarkStatus {
  switch (currentStatus) {
    case BookmarkStatus.Easy:
      return BookmarkStatus.Good;
    case BookmarkStatus.Good:
      return BookmarkStatus.Hard;
    case BookmarkStatus.Hard:
      return BookmarkStatus.Again;
    case BookmarkStatus.Again:
      return BookmarkStatus.Again;
    case BookmarkStatus.New:
      return BookmarkStatus.Again;
    default:
      return BookmarkStatus.New;
  }
}
