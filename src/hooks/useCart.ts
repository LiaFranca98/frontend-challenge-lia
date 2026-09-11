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

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  return useMutation({
    mutationFn: async (nftId: string) => {
      const { data } = await api.delete<CartItem[]>(`/cart/${nftId}`, {
        headers: { Authorization: sessionId },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', sessionId] });
    },
  });
}

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  return useMutation({
    mutationFn: async ({ nftId, quantity }: { nftId: string; quantity: number }) => {
      if (quantity <= 0) {
        const { data } = await api.delete<CartItem[]>(`/cart/${nftId}`, {
          headers: { Authorization: sessionId },
        });
        return data;
      }
      const { data } = await api.patch<CartItem[]>(
        `/cart/${nftId}`,
        { quantity },
        { headers: { Authorization: sessionId } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', sessionId] });
    },
  });
}

import { create } from 'zustand';

interface CartState {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));
