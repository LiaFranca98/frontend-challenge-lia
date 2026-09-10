import { useFavorites } from '@/hooks/useFavorites';
import { NFTCard } from '../catalog/NFTCard';

export function Favorites() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) {
    return <div className="animate-pulse bg-muted h-64 rounded-xl"></div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-xl">
        <p>Você ainda não tem nenhum favorito.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((nft: any) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
}
