'use client';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { useAnswers } from '@/providers/AnswerProvider';
import {
  Bookmark,
  BookOpenText,
  CircleHelp,
  DatabaseBackup,
  Headphones,
  House,
  Lightbulb,
  LightbulbOff,
  ListEnd,
  Menu,
  Trash2,
  WholeWord,
} from 'lucide-react';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBookmarks } from '@/providers/BookmarkProvider';
import { BookmarkStatus } from '@/types/bookmark';
import { SyncForm } from '../sync/SyncForm';
import { Toggle } from '../ui/Toggle';

export function MenuJlpt() {
  const router = useRouter();
  const { showHint, toggleHint, clearAnswers, getFinalAnswerIndex } = useAnswers();
  const [openConfirmSync, setOpenConfirmSync] = useState(false);
  const { filterBookmarks, setFilterBookmarks } = useBookmarks();
  const [openMenu, setOpenMenu] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  function gotoMondai(mondaiId: number): void {
    const element = document.getElementById(`mondai-${mondaiId.toString()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const handleGotoHome = () => router.push('/');

  function gotoFinalAnswer(): void {
    const finalAnswerIndex = getFinalAnswerIndex();
    if (finalAnswerIndex > 0) {
      const element = document.getElementById(finalAnswerIndex.toString());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      toast.error('Bạn chưa làm bài nào!');
    }
  }

  const handleFilterBookmarks = (status: BookmarkStatus) => {
    setOpenMenu(false);
    if (filterBookmarks.includes(status)) {
      setFilterBookmarks(filterBookmarks.filter((s) => s !== status));
    } else {
      setFilterBookmarks([...filterBookmarks, status]);
    }
  };

  const handleDeleteAnswers = () => {
    clearAnswers();
    toast.success('Câu trả lời của bạn đã được xóa');
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
        <DropdownMenuGroup>
          {Array.from({ length: 7 }, (_, i) => (
            <DropdownMenuItem key={i + 1} onClick={() => gotoMondai(i + 1)}>
              Đi đến 問題 {i + 1}
              <DropdownMenuShortcut>
                <WholeWord />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {Array.from({ length: 6 }, (_, i) => (
            <DropdownMenuItem key={i + 8} onClick={() => gotoMondai(i + 8)}>
              Đi đến 問題 {i + 8}
              <DropdownMenuShortcut>
                <BookOpenText />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {Array.from({ length: 5 }, (_, i) => (
            <DropdownMenuItem key={i + 8} onClick={() => gotoMondai(i + 14)}>
              Đi đến 問題 {i + 14}
              <DropdownMenuShortcut>
                <Headphones />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={gotoFinalAnswer}>
          Câu trả lời cuối
          <DropdownMenuShortcut>
            <ListEnd />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
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

        {/* Dialog introduce sync function */}
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
