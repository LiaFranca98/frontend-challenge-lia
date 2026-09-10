import { useCart, useCartStore } from '@/hooks/useCart';
import { useCatalog } from '@/hooks/useCatalog';
import { Button } from '@/components/ui/button';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function CartDrawer() {
  const { isOpen, closeCart } = useCartStore();
  const { data: cartItems = [] } = useCart();
  const { data: catalogData } = useCatalog(); // Or use a specific hook to fetch multiple NFTs by ID
  
  if (!isOpen) return null;

  const nfts = catalogData?.items || [];
  
  // Enhance cart items with NFT details
  const enhancedItems = cartItems.map(item => {
    const nft = nfts.find(n => n.id === item.nftId);
    return { ...item, nft };
  }).filter(item => item.nft);

  const subtotal = enhancedItems.reduce((acc, item) => {
    return acc + (parseFloat(item.nft!.priceEth) * item.quantity);
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity" 
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold font-sans flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Seu Carrinho
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {enhancedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
              <ShoppingBag className="h-12 w-12 opacity-20" />
              <p>Seu carrinho está vazio.</p>
              <Button variant="outline" onClick={closeCart}>Continuar Explorando</Button>
            </div>
          ) : (
            enhancedItems.map((item) => (
              <div key={item.nftId} className="flex gap-4 p-4 border border-border rounded-xl bg-background">
                <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.nft!.imageUrl} alt={item.nft!.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold">{item.nft!.title}</h3>
                    <p className="text-sm text-primary font-mono-style">{item.nft!.priceEth} ETH</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Qtd: {item.quantity}</span>
                    <button className="text-destructive hover:text-destructive/80 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {enhancedItems.length > 0 && (
          <div className="p-6 border-t border-border bg-card">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-muted-foreground">Subtotal</span>
              <span className="font-bold font-mono-style text-xl">{subtotal.toFixed(2)} ETH</span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="block">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-dark h-14 text-lg font-mono-style uppercase tracking-wider">
                Finalizar Compra
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
