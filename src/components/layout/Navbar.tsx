import Link from 'next/link';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/Sheet';
import { Menu } from 'lucide-react';
import React from 'react';
import Logo from '../features/Logo';
import { ThemeSwitcher } from '../features/ThemeSwitcher';
import { Button } from '../ui/Button';

const navLinks = [
  { href: 'https://news.adayroi.jp', key: 'News', external: true },
  { href: 'https://chat.adayroi.jp', key: 'Chat', external: true },
  { href: 'https://trips.adayroi.jp', key: 'Trips', external: true },
  { href: 'https://adayroi.jp', key: 'Blog', external: true },
];

const Navbar = () => {
  return (
    <nav className="border-b-2 border-gray-700">
      <div className="w-full flex justify-between items-center p-4 md:px-0">
        <Link className="flex text-xl" href="/">
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-4">
          {navLinks.map(({ href, key, external }) => (
            <Link
              key={key}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              {key}
            </Link>
          ))}
          <ThemeSwitcher />
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate to different sections</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {navLinks.map(({ href, key, external }) => (
                  <SheetClose asChild key={key}>
                    <Link
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                    >
                      {key}
                    </Link>
                  </SheetClose>
                ))}
                <div className="pt-4 border-t">
                  <ThemeSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
