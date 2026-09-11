import { Link } from '@tanstack/react-router';
import type { NFT } from '@/domain/types';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { useAddToCart } from '@/hooks/useCart';

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { mutate: addToCart } = useAddToCart();
  const isFav = isFavorite(nft.id);
  const isAvailable = nft.availableEditions > 0;

  return (
    <div className="group transition-all">
      <div className="relative aspect-square overflow-hidden bg-muted rounded-[12px] mb-4">
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
        
        {/* Hover action icons - Figma style */}
        {isAvailable && (
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-auto">
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
                if (user) toggleFavorite(nft.id);
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
          <h3 className="font-mono-style font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {nft.title}
          </h3>
          <span className="font-mono-style font-bold text-primary text-sm">{nft.priceEth} ETH</span>
        </Link>
      </div>
    </div>
  );
}
