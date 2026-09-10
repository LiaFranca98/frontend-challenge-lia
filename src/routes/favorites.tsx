import { createFileRoute } from '@tanstack/react-router';
import { Favorites } from '@/features/favorites/Favorites';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
});

function FavoritesPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 animate-pulse bg-muted h-96 rounded-2xl"></div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
        <p className="mb-8">Você precisa fazer login para ver seus favoritos.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold font-sans text-foreground mb-8">Meus Favoritos</h1>
      <Favorites />
    </div>
  );
}
