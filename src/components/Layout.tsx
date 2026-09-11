import { Outlet } from '@tanstack/react-router';
import { Header } from './Header';
import { CartDrawer } from '@/features/cart/CartDrawer';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

export function Layout() {
  useRealtimeSync();

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Header />
      <CartDrawer />
      <main id="main-content" className="flex-1 bg-background text-foreground">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
