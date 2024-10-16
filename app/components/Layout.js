// components/Layout.js
import Header from './Header';

// 전체 구조

export default function Layout({ children }) {
  return (
    <div className="w-1/3 mx-auto items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className='h-screen'>{children}</main>
    </div>
  );
}