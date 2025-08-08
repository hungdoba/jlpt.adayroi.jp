'use client';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { useAnswers } from '@/providers/AnswerProvider';
import {
  Bookmark,
  ChevronsLeft,
  ChevronsRight,
  CircleHelp,
  DatabaseBackup,
  House,
  Lightbulb,
  LightbulbOff,
  ListEnd,
  ListStart,
  Menu,
  Trash2,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/AlertDialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Toggle } from '../ui/Toggle';
import { useBookmarks } from '@/providers/BookmarkProvider';
import { BookmarkStatus } from '@/types/bookmark';
import { SyncForm } from '../sync/SyncForm';

interface Props {
  itemsCount: number;
  itemsPerPage: number;
  pageNumber: number;
}

export function MenuQuiz({ itemsCount, itemsPerPage, pageNumber }: Props) {
  const router = useRouter();
  const { showHint, toggleHint, clearAnswers, getFinalAnswerIndex } = useAnswers();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmSync, setOpenConfirmSync] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { filterBookmarks, setFilterBookmarks } = useBookmarks();

  const pageItemsCount = Math.min(itemsPerPage, itemsCount - (pageNumber - 1) * itemsPerPage);
  const totalPages = Math.floor(itemsCount / itemsPerPage) + 1;

  const handleDeleteAnswers = () => {
    clearAnswers();
    toast.success('Câu trả lời của bạn đã được xóa');
  };

  const handleGotoQuiz = (quizId: number) => {
    const element = document.getElementById(quizId.toString());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGotoHome = () => router.push('/');

  const handleGotoPage = (page: number) => router.push(page.toString());

  const handleGotoFinalAnswer = () => {
    const finalAnswerIndex = getFinalAnswerIndex();
    if (finalAnswerIndex > 0) {
      const element = document.getElementById(finalAnswerIndex.toString());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      toast.error('Bạn chưa làm bài nào!');
    }
  };

  const handleFilterBookmarks = (status: BookmarkStatus) => {
    setOpenMenu(false);
    if (filterBookmarks.includes(status)) {
      setFilterBookmarks(filterBookmarks.filter((s) => s !== status));
    } else {
      setFilterBookmarks([...filterBookmarks, status]);
    }
  };

  function handleSyncDone(): void {
    setOpenConfirmSync(false);
    setOpenMenu(false);
  }

  return (
    <DropdownMenu modal={false} open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>{`Câu hỏi (${pageItemsCount})`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {Array.from({ length: Math.floor(pageItemsCount / 20) + 1 }, (_, i) => {
            const quizNumber =
              i === 0 ? 1 + (pageNumber - 1) * 100 : 20 * i + (pageNumber - 1) * 100;
            return (
              <DropdownMenuItem key={quizNumber} onClick={() => handleGotoQuiz(quizNumber)}>
                Đi đến câu {quizNumber}
                <DropdownMenuShortcut>
                  <ListStart />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleGotoFinalAnswer}>
          Câu trả lời cuối cùng
          <DropdownMenuShortcut>
            <ListEnd />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{`Trang (${pageNumber}/${totalPages})`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {Array.from(
            { length: totalPages },
            (_, i) =>
              i + 1 !== pageNumber && (
                <DropdownMenuItem key={i + 1} onClick={() => handleGotoPage(i + 1)}>
                  Đi đến trang {i + 1}
                  <DropdownMenuShortcut>
                    {i + 1 > pageNumber ? <ChevronsRight /> : <ChevronsLeft />}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ),
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleGotoHome}>
          Về trang chủ
          <DropdownMenuShortcut>
            <House />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setOpenConfirmSync(true);
          }}
        >
          Đồng bộ data
          <DropdownMenuShortcut>
            <DatabaseBackup />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <Dialog open={openConfirmSync} onOpenChange={setOpenConfirmSync}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex gap-4">
                <DialogTitle>Đồng bộ dữ liệu</DialogTitle>
                <DialogDescription>
                  <Dialog>
                    <DialogTrigger asChild>
                      <CircleHelp size={16} strokeWidth={1} />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Hướng dẫn</DialogTitle>
                        <DialogDescription>
                          Chức năng này giúp bạn đồng bộ các đáp án đã chọn, bookmarks, memo giữa
                          nhiều thiết bị khác nhau.
                          <br />
                          Mỗi người dùng sẽ có một ID riêng, bạn chỉ cần nhập cùng ID ở thiết bị
                          khác là có thể đồng bộ dữ liệu.
                        </DialogDescription>
                        <DialogDescription>
                          Trường hợp muốn backup:
                          <br />
                          Bước 1: chưa có ID thì &quot;Tạo ID mới&quot;.
                          <br />
                          Bước 2: nhấn &quot;Tải lên cloud&quot; để backup data.
                        </DialogDescription>
                        <DialogDescription>
                          Trường hợp muốn tải xuống dữ liệu đã backup:
                          <br />
                          Bước 1: nhập ID muốn tải xuống.
                          <br />
                          Bước 2: nhấn &quot;Lưu ID vào máy&quot; để lưu lại ID và dùng cho những
                          lần sau.
                          <br />
                          Bước 3: nhấn &quot;Tải xuống từ cloud&quot; để lấy data về máy.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">OK</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DialogDescription>
              </div>
            </DialogHeader>
            <SyncForm onSyncDone={handleSyncDone} />
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full flex justify-between items-center gap-0 hover:bg-transparent focus:bg-transparent p-0">
          <Toggle
            pressed={filterBookmarks.includes(BookmarkStatus.New)}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleFilterBookmarks(BookmarkStatus.New);
            }}
            className="cursor-pointer"
          >
            <Bookmark />
          </Toggle>
          <Toggle
            pressed={filterBookmarks.includes(BookmarkStatus.Easy)}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleFilterBookmarks(BookmarkStatus.Easy);
            }}
            className="cursor-pointer"
          >
            <Bookmark className="text-blue-500" />
          </Toggle>
          <Toggle
            pressed={filterBookmarks.includes(BookmarkStatus.Good)}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleFilterBookmarks(BookmarkStatus.Good);
            }}
            className="cursor-pointer"
          >
            <Bookmark className="text-green-500" />
          </Toggle>
          <Toggle
            pressed={filterBookmarks.includes(BookmarkStatus.Hard)}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleFilterBookmarks(BookmarkStatus.Hard);
            }}
            className="cursor-pointer"
          >
            <Bookmark className="text-yellow-500" />
          </Toggle>
          <Toggle
            pressed={filterBookmarks.includes(BookmarkStatus.Again)}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleFilterBookmarks(BookmarkStatus.Again);
            }}
            className="cursor-pointer"
          >
            <Bookmark className="text-red-500" />
          </Toggle>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleHint}>
          {showHint ? 'Ẩn' : 'Hiện'} đáp án
          <DropdownMenuShortcut>{showHint ? <LightbulbOff /> : <Lightbulb />}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setOpenConfirmDelete(true);
          }}
        >
          Xóa câu trả lời
          <DropdownMenuShortcut>
            <Trash2 />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <AlertDialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa câu trả lời.</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa câu trả lời của mình? Hành động này sẽ không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDeleteAnswers();
                  setOpenConfirmDelete(false);
                  setOpenMenu(false);
                }}
              >
                Tiếp tục
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
