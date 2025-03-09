import Link from 'next/link';
import { ThemeSwitcher } from './ui/theme-switcher';

const Navbar = () => {
  return (
    <nav className="border-b-2 border-gray-700">
      <div className="w-full flex justify-between items-center p-4">
        <Link className="flex text-xl" href="/">
          Adayroi
        </Link>
        <ul className="flex items-center space-x-2 md:space-x-4">
          <li>
            <Link href="https://prompt.adayroi.jp">Prompt</Link>
          </li>
          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href="https://fix.adayroi.jp">Sửa</Link>
          </li>
          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href="https://comtor.adayroi.jp">Dịch</Link>
          </li>
          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href="https://adayroi.jp">Home</Link>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
