import { useCart, useCartStore, useUpdateCartQuantity, useRemoveFromCart } from '@/hooks/useCart';
import { useCatalog } from '@/hooks/useCatalog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, X, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export function CartDrawer() {
  const { isOpen, closeCart } = useCartStore();
  const { data: cartItems = [] } = useCart();
  const { data: catalogData } = useCatalog({ limit: 100 });
  const { mutate: updateQuantity } = useUpdateCartQuantity();
  const { mutate: removeItem } = useRemoveFromCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  if (!isOpen) return null;

  const nfts = catalogData?.data || [];
  
  // Enhance cart items with NFT details
  const enhancedItems = cartItems.map(item => {
    const nft = nfts.find((n: any) => n.id === item.nftId);
    return { ...item, nft };
  }).filter(item => item.nft);

  const subtotal = enhancedItems.reduce((acc, item) => {
    return acc + (parseFloat(item.nft!.priceEth) * item.quantity);
  }, 0);

  const networkFee = 0.016;
  const total = Math.max(0, subtotal - discount + networkFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'KURIO10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity" 
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-0 md:inset-y-0 md:left-auto md:right-0 w-full md:max-w-md bg-[#110E0C] md:border-l border-border shadow-2xl z-50 flex flex-col h-[100dvh] font-mono-style">
        
        {/* Header (Figma 16:360 / Mobile Header) */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/40 shrink-0">
          <button 
            onClick={closeCart}
            className="w-10 h-10 rounded-full bg-[#2F1D15] border border-[#55321F] flex items-center justify-center text-[#CFB28C] hover:text-foreground transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base sm:text-lg font-bold font-mono text-foreground uppercase tracking-wide flex-1 text-center pr-10">
            Carrinho de NFTs
          </h2>
          <button 
            onClick={closeCart}
            className="hidden md:flex p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
          {enhancedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4 py-16">
              <ShoppingBag className="h-12 w-12 opacity-20" />
              <p className="text-sm">Seu carrinho está vazio.</p>
              <Button variant="outline" onClick={closeCart} className="font-mono-style uppercase text-xs">
                Continuar Explorando
              </Button>
            </div>
          ) : (
            enhancedItems.map((item) => (
              <div key={item.nftId} className="flex gap-3 p-3 border border-[#3F2319]/50 rounded-[16px] bg-[#1c120e] items-center justify-between">
                <div className="h-[64px] w-[64px] rounded-[12px] overflow-hidden flex-shrink-0 bg-muted">
                  <img src={item.nft!.imageUrl} alt={item.nft!.title} className="h-full w-full object-cover" width={64} height={64} />
                </div>
                
                <div className="flex-1 min-w-0 px-2 flex flex-col justify-center">
                  <h3 className="font-bold text-xs sm:text-sm text-foreground truncate">{item.nft!.title}</h3>
                  <p className="text-[11px] text-[#CFB28C] font-mono">Edição: 1/{item.nft!.totalEditions}</p>
                  <p className="text-xs sm:text-sm text-primary font-bold font-mono pt-0.5">
                    {(parseFloat(item.nft!.priceEth) * item.quantity).toFixed(2)} ETH
                  </p>
                </div>
                
                {/* Quantity selector (Figma style) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => updateQuantity({ nftId: item.nftId, quantity: item.quantity - 1 })}
                    className="w-6 h-6 rounded-full bg-[#2F1D15] border border-[#55321F] flex items-center justify-center text-[#CFB28C] hover:text-primary transition-colors text-xs font-bold active:scale-95"
                    aria-label="Diminuir quantidade"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-bold text-xs sm:text-sm text-foreground">{item.quantity}</span>
                  {item.quantity >= item.nft!.availableEditions ? (
                    <button
                      onClick={() => removeItem(item.nftId)}
                      className="w-6 h-6 rounded-full bg-[#2F1D15] border border-[#55321F] flex items-center justify-center text-destructive hover:text-destructive/80 transition-colors text-xs active:scale-95"
                      aria-label="Remover do carrinho"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => updateQuantity({ nftId: item.nftId, quantity: item.quantity + 1 })}
                      className="w-6 h-6 rounded-full bg-[#2F1D15] border border-[#55321F] flex items-center justify-center text-[#CFB28C] hover:text-primary transition-colors text-xs font-bold active:scale-95"
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Summary Sheet */}
        {enhancedItems.length > 0 && (
          <div className="p-5 border-t border-[#3F2319]/60 bg-[#180e0a] rounded-t-[28px] space-y-3 shadow-2xl">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="bg-[#241612] border border-[#3F2319]/60 rounded-full pl-4 pr-1.5 py-1.5 flex items-center justify-between">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Digite o código promocional..."
                className="bg-transparent border-none outline-none text-xs font-mono text-foreground placeholder:text-[#CFB28C]/60 w-full"
              />
              <button
                type="submit"
                className="bg-[#D28A4C] hover:bg-[#DD9A5F] text-[#140D0A] font-bold font-mono text-xs rounded-full px-5 py-2 uppercase tracking-wider shrink-0 transition-transform active:scale-95"
              >
                Aplicar
              </button>
            </form>

            {/* Totals Table */}
            <div className="space-y-2 text-xs font-mono pt-1">
              <div className="flex justify-between text-foreground">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} ETH</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Desconto do lançamento</span>
                <span>(-) {discount.toFixed(2)}</span>
              </div>
              <div>
                <div className="flex justify-between text-foreground">
                  <span>Taxa de rede</span>
                  <span>{networkFee.toFixed(3)} ETH</span>
                </div>
                <div className="text-right text-[10px] text-[#D28A4C]">Taxa estimada</div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/40">
                <span className="font-bold text-sm text-foreground">Total</span>
                <span className="font-bold font-mono text-lg text-primary">{total.toFixed(3)} ETH</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to="/checkout" onClick={closeCart} className="block pt-1">
              <Button className="w-full bg-[#D28A4C] hover:bg-[#DD9A5F] text-[#140D0A] font-bold font-mono py-3.5 h-auto text-sm uppercase rounded-full tracking-wider transition-transform active:scale-[0.98]">
                Conectar e finalizar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
