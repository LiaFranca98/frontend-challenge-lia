import { Link } from '@tanstack/react-router';
import { Search, ShoppingCart, LogIn, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

export function Header() {
  const { data: cartItems = [] } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-mono-style text-xl font-bold tracking-widest text-foreground uppercase">
            Kurio
          </span>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono-style text-sm text-muted-foreground uppercase">
          <Link to="/" className="hover:text-foreground transition-colors">
            Início
          </Link>
          <Link 
            to="/" 
            className="text-primary border-b-2 border-primary py-1"
          >
            Mercado
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Criadores
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Aprenda
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <button className="hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </button>
          
          <Link to="/" className="relative hover:text-foreground transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground font-mono-style">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Carrinho</span>
          </Link>
          
          <Button className="hidden md:flex gap-2 bg-primary text-primary-foreground hover:bg-primary/90 ml-2 font-mono-style uppercase h-9 rounded-md px-4">
            <LogIn className="h-4 w-4" />
            Entrar
          </Button>

          <button className="md:hidden hover:text-foreground transition-colors">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </button>
        </div>
        
      </div>
    </header>
  );
}
