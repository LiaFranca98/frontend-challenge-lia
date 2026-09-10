import { Link } from '@tanstack/react-router';
import type { NFT } from '@/domain/types';
import { Badge } from '@/components/ui/badge';

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  const isAvailable = nft.availableEditions > 0;

  return (
    <div className="group transition-all">
      <Link to={'/nfts/$id'} params={{ id: nft.id }} className="block relative aspect-square overflow-hidden bg-muted rounded-[12px] mb-4">
        <img 
          src={nft.imageUrl} 
          alt={nft.title} 
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive" className="text-sm px-3 py-1 font-mono-style uppercase">Esgotado</Badge>
          </div>
        )}
      </Link>
      
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
