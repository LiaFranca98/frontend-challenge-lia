import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api as axios } from '@/api/axios';
import type { NFT } from '@/domain/types';
import { useAuth } from './useAuth';

export function useFavorites() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data } = await axios.get<{ favorites: NFT[] }>('/api/favorites');
      return data.favorites;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async (nftId: string) => {
      await axios.post('/api/favorites', { nftId });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      const previousFavorites = queryClient.getQueryData<NFT[]>(['favorites']);
      
      // We don't have the full NFT data here to optimistically update, but we can trigger a refetch
      return { previousFavorites };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async (nftId: string) => {
      await axios.delete(`/api/favorites/${nftId}`);
    },
    onMutate: async (nftId) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      const previousFavorites = queryClient.getQueryData<NFT[]>(['favorites']);
      
      if (previousFavorites) {
        queryClient.setQueryData<NFT[]>(
          ['favorites'], 
          previousFavorites.filter(nft => nft.id !== nftId)
        );
      }
      
      return { previousFavorites };
    },
    onError: (_err, _nftId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const isFavorite = (nftId: string) => {
    if (!favoritesQuery.data) return false;
    return favoritesQuery.data.some((nft: NFT) => nft.id === nftId);
  };

  const toggleFavorite = (nftId: string) => {
    if (!user) {
      // Must be logged in
      return;
    }
    
    if (isFavorite(nftId)) {
      removeFavoriteMutation.mutate(nftId);
    } else {
      addFavoriteMutation.mutate(nftId);
    }
  };

  return {
    favorites: favoritesQuery.data || [],
    isLoading: favoritesQuery.isLoading,
    isError: favoritesQuery.isError,
    isFavorite,
    toggleFavorite,
    addFavorite: addFavoriteMutation.mutateAsync,
    removeFavorite: removeFavoriteMutation.mutateAsync,
  };
}
