import { Link, useLocation } from '@tanstack/react-router';
import { Home, Heart, ShoppingBag, User, Scan } from 'lucide-react';
import { useCart, useCartStore } from '@/hooks/useCart';

export function MobileBottomNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const hideNav = pathname.startsWith('/nfts/') || pathname.startsWith('/checkout');
  const { data: cartItems = [] } = useCart();
  const { openCart } = useCartStore();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (hideNav) return null;

  return (
    <nav 
      aria-label="Navegação mobile" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-auto"
    >
      <div className="relative w-full max-w-[430px] mx-auto">
        {/* Curved bottom background */}
        <div className="relative bg-[#241612]/95 backdrop-blur-lg border-t border-[#3F2319]/60 px-6 py-3 flex items-center justify-between shadow-[0_-10px_30px_rgba(10,6,4,0.6)] rounded-t-[28px]">
          
          {/* Home */}
          <Link 
            to="/" 
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              pathname === '/' ? 'text-primary' : 'text-[#CFB28C] hover:text-foreground'
            }`}
            aria-label="Início"
          >
            <Home className="w-5 h-5 fill-current" />
          </Link>

          {/* Favorites */}
          <Link 
            to="/favorites" 
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              pathname === '/favorites' ? 'text-primary' : 'text-[#CFB28C] hover:text-foreground'
            }`}
            aria-label="Favoritos"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {/* Center Floating Action Button */}
          <div className="relative -top-5 flex items-center justify-center">
            <button
              onClick={() => {
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Explorar coleções"
              className="w-14 h-14 rounded-full bg-gradient-to-b from-[#DD9A5F] to-[#D28A4C] p-0.5 shadow-[0_8px_20px_rgba(210,138,76,0.4)] flex items-center justify-center text-[#140D0A] transition-transform active:scale-95"
            >
              <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#E3A44E] to-[#C47B3E] text-white">
                <Scan className="w-6 h-6 stroke-[2.5]" />
              </div>
            </button>
          </div>

          {/* Cart */}
          <button 
            onClick={openCart} 
            className="relative flex flex-col items-center justify-center p-2 text-[#CFB28C] hover:text-foreground transition-colors"
            aria-label="Carrinho"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground font-mono-style">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <Link 
            to="/profile" 
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              pathname === '/profile' || pathname === '/login' ? 'text-primary' : 'text-[#CFB28C] hover:text-foreground'
            }`}
            aria-label="Perfil"
          >
            <User className="w-5 h-5" />
          </Link>

        </div>
      </div>
    </nav>
  );
}
