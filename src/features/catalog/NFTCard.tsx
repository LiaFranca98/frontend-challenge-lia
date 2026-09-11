import { Link } from '@tanstack/react-router';
import type { NFT } from '@/domain/types';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAddToCart } from '@/hooks/useCart';

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { mutate: addToCart } = useAddToCart();
  const isFav = isFavorite(nft.id);
  const isAvailable = nft.availableEditions > 0;

  return (
    <div className="group transition-all">
      <div className="relative aspect-square overflow-hidden bg-muted rounded-[16px] md:rounded-[12px] mb-3 md:mb-4">
        <Link to={'/nfts/$id'} params={{ id: nft.id }} className="block w-full h-full">
          <img 
            src={nft.imageUrl} 
            alt={nft.title} 
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />
        </Link>

        {/* Mobile Rare Badge (Figma P-3) */}
        {nft.id === 'nft-3' && (
          <div className="absolute top-0 left-0 bg-primary text-background font-mono-style font-bold text-[10px] md:text-xs px-2.5 py-1 rounded-br-lg rounded-tl-[16px] uppercase tracking-wider z-10 pointer-events-none">
            RARO
          </div>
        )}

        {/* Mobile Top-Right Favorite Button (Figma style) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(nft.id);
          }}
          aria-label={`Favoritar ${nft.title}`}
          className={`md:hidden absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all border z-10 ${
            isFav 
              ? 'bg-[#2F1D15] text-primary border-[#55321F]' 
              : 'bg-[#2F1D15]/80 text-[#CFB28C] border-[#55321F]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#D28A4C] text-[#D28A4C]' : 'stroke-[#CFB28C]'}`} />
        </button>
        
        {/* Desktop Hover action icons - Figma style */}
        {isAvailable && (
          <div className="hidden md:flex absolute bottom-3 right-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart({ nftId: nft.id, quantity: 1 });
              }}
              aria-label={`Adicionar ${nft.title} ao carrinho`}
              className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(nft.id);
              }}
              aria-label={`Favoritar ${nft.title}`}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors border ${
                isFav 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-background/80 text-foreground border-border hover:border-primary'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <Link
              to={'/nfts/$id'}
              params={{ id: nft.id }}
              aria-label={`Ver detalhes de ${nft.title}`}
              className="w-8 h-8 bg-background/80 text-foreground rounded flex items-center justify-center border border-border hover:border-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Search className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!isAvailable && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm pointer-events-none">
            <Badge variant="destructive" className="text-sm px-3 py-1 font-mono-style uppercase">Esgotado</Badge>
          </div>
        )}
      </div>
      
      <div>
        <Link to={'/nfts/$id'} params={{ id: nft.id }} className="block">
          <h3 className="font-mono-style font-medium md:font-bold text-foreground text-xs sm:text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {nft.title}
          </h3>
          <span className="font-mono-style font-bold text-primary text-xs sm:text-sm">{nft.priceEth} ETH</span>
        </Link>
      </div>
    </div>
  );
}
