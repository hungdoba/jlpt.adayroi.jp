import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/Pagination';

interface Props {
  pageNumber: number;
  itemsPerPage: number;
  itemsCount: number;
}

export default function QuizPagination({ pageNumber, itemsPerPage, itemsCount }: Props) {
  const pageCount = Math.ceil(itemsCount / itemsPerPage);

  return (
    <Pagination>
      <PaginationContent>
        {pageNumber > 1 && (
          <PaginationPrevious
            href={`${Math.max(pageNumber - 1, 1)}`}
            aria-disabled={pageNumber <= 1}
          />
        )}

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink isActive={pageNumber === page} href={`${page}`}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumber < pageCount && (
          <PaginationNext
            href={`${Math.min(pageNumber + 1, pageCount)}`}
            aria-disabled={pageNumber >= pageCount}
          />
        )}
      </PaginationContent>
    </Pagination>
  );
}
