import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api as axios } from '@/api/axios';
import type { User } from '@/domain/types';

export function useAuth() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axios.get<{ user: User }>('/api/profile');
      return data.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password?: string }) => {
      const { data } = await axios.post<{ user: User }>('/api/auth/login', credentials);
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['profile'], user);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (payload: { name: string; email: string; password?: string }) => {
      const { data } = await axios.post<{ user: User }>('/api/auth/signup', payload);
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['profile'], user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post('/api/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear(); // Explicitly clear all cache as per T023
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<User>) => {
      const { data } = await axios.patch<{ user: User }>('/api/profile', updates);
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
