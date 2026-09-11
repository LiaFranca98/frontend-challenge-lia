import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api as axios } from '@/api/axios';
import type { User } from '@/domain/types';

export function useAuth() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axios.get<{ user: User }>('/profile');
      return data.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !!localStorage.getItem('auth-token'),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password?: string }) => {
      const { data } = await axios.post<{ user: User; token: string }>('/auth/login', credentials);
      localStorage.setItem('auth-token', data.token);
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['profile'], user);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (payload: { name: string; email: string; password?: string }) => {
      const { data } = await axios.post<{ user: User; token: string }>('/auth/signup', payload);
      localStorage.setItem('auth-token', data.token);
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['profile'], user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post('/auth/logout');
    },
    onSuccess: () => {
      localStorage.removeItem('auth-token');
      queryClient.clear(); // Explicitly clear all cache as per T023
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<User>) => {
      const { data } = await axios.patch<{ user: User }>('/profile', updates);
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['profile'], user);
    },
  });

  return {
    user: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
  };
}
