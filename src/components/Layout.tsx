import { Outlet } from '@tanstack/react-router';
import { Header } from './Header';
import { CartDrawer } from '@/features/cart/CartDrawer';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CartDrawer />
      <main className="flex-1 bg-background text-foreground">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
