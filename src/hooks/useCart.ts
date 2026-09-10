import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';
import type { CartItem } from '../domain/types';

function getSessionId() {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'guest-' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

export function useCart() {
  const sessionId = getSessionId();

  return useQuery({
    queryKey: ['cart', sessionId],
    queryFn: async () => {
      const { data } = await api.get<CartItem[]>('/cart', {
        headers: { Authorization: sessionId },
      });
      return data;
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  return useMutation({
    mutationFn: async ({ nftId, quantity }: { nftId: string; quantity: number }) => {
      const { data } = await api.post<CartItem[]>(
        '/cart',
        { nftId, quantity },
        { headers: { Authorization: sessionId } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', sessionId] });
    },
  });
}
