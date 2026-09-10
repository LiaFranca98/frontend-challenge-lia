import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket, connectSocket, disconnectSocket } from '../api/socket';
import type { NFT } from '../domain/types';

export function useRealtimeSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    connectSocket();

    // The mock server emits 'nft_update' with partial NFT data
    const handleNftUpdate = (updatedNft: Partial<NFT> & { id: string }) => {
      console.log('[Real-time] NFT updated:', updatedNft);
      
      // Update the cache for a specific NFT
      queryClient.setQueryData<NFT>(['nft', updatedNft.id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          ...updatedNft,
        };
      });

      // Also invalidate catalog to refetch the list
      queryClient.invalidateQueries({ queryKey: ['nfts'] });
    };

    socket.on('nft_update', handleNftUpdate);

    return () => {
      socket.off('nft_update', handleNftUpdate);
      disconnectSocket();
    };
  }, [queryClient]);
}
