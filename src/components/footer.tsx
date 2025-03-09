import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-4 md:mx-0">
      <div className="w-full mx-auto py-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Adayroi
            </span>
          </Link>
          <ul className="flex items-center space-x-4 text-sm">
            <li>
              <Link href="#">Giới thiệu</Link>
            </li>
            <li className="h-4 border-r border-gray-500"></li>
            <li>
              <Link href="#">Chính sách bảo mật</Link>
            </li>
            <li className="h-4 border-r border-gray-500"></li>
            <li>
              <Link href="#">Liên hệ</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{' '}
          <Link href="/" className="hover:underline">
            Adayroi.jp
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
