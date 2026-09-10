import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Wallet, Plus, Trash2 } from 'lucide-react';

export const Route = createFileRoute('/profile')({

  component: ProfilePage,
});

function ProfilePage() {
  const { user, isLoading, logout, updateProfile } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newWalletAddress, setNewWalletAddress] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 animate-pulse bg-muted h-96 rounded-2xl"></div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
        <p className="mb-8">Você precisa fazer login para ver seu perfil.</p>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, email });
  };

  const handleAddWallet = async () => {
    if (!newWalletAddress) return;
    
    const newWallet = {
      id: `wallet-${Date.now()}`,
      address: newWalletAddress,
      network: 'Ethereum',
      isPrimary: user.wallets.length === 0
    };
    
    await updateProfile({
      wallets: [...user.wallets, newWallet]
    });
    setNewWalletAddress('');
  };

  const handleRemoveWallet = async (walletId: string) => {
    await updateProfile({
      wallets: user.wallets.filter((w: any) => w.id !== walletId)
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold font-sans text-foreground mb-12">Meu Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-8">
          <div className="bg-card border border-border p-6 rounded-2xl">
            <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-center">{user.name}</h2>
            <p className="text-muted-foreground text-center text-sm mb-6">{user.email}</p>
            
            <Button variant="outline" className="w-full mb-2" onClick={() => logout()}>
              Sair da Conta
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-12">
          {/* Personal Info */}
          <section className="bg-card border border-border p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">Informações Pessoais</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button type="submit">Salvar Alterações</Button>
            </form>
          </section>

          {/* Wallets */}
          <section className="bg-card border border-border p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">Carteiras Conectadas</h3>
            
            <div className="space-y-4 mb-8">
              {user.wallets.map((wallet: any) => (
                <div key={wallet.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-mono-style text-sm">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
                      <p className="text-xs text-muted-foreground">{wallet.network} {wallet.isPrimary && '• Principal'}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveWallet(wallet.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {user.wallets.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">Nenhuma carteira conectada.</p>
              )}
            </div>

            <div className="flex gap-2">
              <Input 
                placeholder="0x..." 
                value={newWalletAddress} 
                onChange={(e) => setNewWalletAddress(e.target.value)}
                className="font-mono-style"
              />
              <Button onClick={handleAddWallet} disabled={!newWalletAddress}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
