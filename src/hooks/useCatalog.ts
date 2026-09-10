import { useQuery } from '@tanstack/react-query';
import { api } from '../api/axios';
import type { NFT } from '../domain/types';

export interface CatalogParams {
  q?: string;
  sort?: string;
  availability?: string;
  page?: number;
  limit?: number;
}

export interface CatalogResponse {
  data: NFT[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export function useCatalog(params: CatalogParams) {
  return useQuery({
    queryKey: ['nfts', params],
    queryFn: async () => {
      const { data } = await api.get<CatalogResponse>('/nfts', { params });
      return data;
    },
  });
}

export function useNFT(id: string) {
  return useQuery({
    queryKey: ['nft', id],
    queryFn: async () => {
      const { data } = await api.get<NFT>(`/nfts/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
