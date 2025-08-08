import Link from 'next/link';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Liên hệ</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Liên hệ trực tiếp với chúng tôi qua facebook dưới nhé.
        </h2>
        <Link
          href={'https://www.facebook.com/profile.php?id=61573451684498'}
          className="text-blue-500 hover:underline"
        >
          Adayroi.jp - Học tiếng Nhật miễn phí
        </Link>
      </section>
    </div>
  );
}
