import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCart } from '@/hooks/useCart';
import { useCatalog } from '@/hooks/useCatalog';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/axios';
import type { Order } from '@/domain/types';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { data: cartItems = [] } = useCart();
  const { data: catalogData } = useCatalog({});
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nfts = catalogData?.data || [];
  
  const enhancedItems = cartItems.map(item => {
    const nft = nfts.find((n: any) => n.id === item.nftId);
    return { ...item, nft };
  }).filter(item => item.nft);

  const subtotalEth = enhancedItems.reduce((acc, item) => {
    return acc + (parseFloat(item.nft!.priceEth) * item.quantity);
  }, 0);

  const networkFeeEth = 0.005;
  const totalEth = subtotalEth + networkFeeEth;

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      // Create idempotency key
      const idempotencyKey = `order-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
      const payload = {
        items: cartItems,
        idempotencyKey,
      };
      
      const { data } = await api.post<{ order: Order }>('/checkout', payload);
      return data;
    },
    onSuccess: () => {
      setIsSuccess(true);
      // Invalidate cart to clear it out on success
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Erro ao processar pagamento. Tente novamente.');
    }
  });

  const handleCheckout = () => {
    setError(null);
    checkoutMutation.mutate();
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg min-h-[60vh] flex flex-col justify-center">
        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold font-sans mb-4">Compra Confirmada!</h1>
        <p className="text-muted-foreground mb-8">
          Seus NFTs já estão sendo transferidos para sua carteira. O processo pode levar alguns minutos para ser confirmado na blockchain.
        </p>
        <Button onClick={() => navigate({ to: '/profile' })} className="w-full h-12 uppercase tracking-wide font-mono-style">
          Ver Meus NFTs
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
        <Button onClick={() => navigate({ to: '/' })}>Voltar ao Catálogo</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold font-sans mb-10">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-card border border-border p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 border-b border-border pb-4">Itens do Pedido</h2>
            <div className="space-y-6">
              {enhancedItems.map(item => (
                <div key={item.nftId} className="flex gap-6 items-center">
                  <img src={item.nft!.imageUrl} alt={item.nft!.title} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.nft!.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.nft!.creator}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-style">{item.nft!.priceEth} ETH</p>
                    <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 border-b border-border pb-4">Informações de Pagamento</h2>
            {!user ? (
              <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Comprando como Visitante</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Para associar os NFTs à sua conta, recomendamos fazer login antes de finalizar a compra.
                  </p>
                  <Button variant="outline" onClick={() => navigate({ to: '/login' })}>
                    Fazer Login
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">Carteira Conectada</p>
                {user.wallets.length > 0 ? (
                  <div className="p-4 border border-border rounded-xl bg-background font-mono-style flex items-center justify-between">
                    <span>{user.wallets[0].address}</span>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Ativa</span>
                  </div>
                ) : (
                  <div className="p-4 border border-destructive/20 rounded-xl bg-destructive/5 text-destructive text-sm flex justify-between items-center">
                    Você não tem nenhuma carteira cadastrada!
                    <Button variant="outline" size="sm" onClick={() => navigate({ to: '/profile' })}>Adicionar</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border p-8 rounded-2xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Resumo</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({cartItems.length} itens)</span>
                <span className="font-mono-style">{subtotalEth.toFixed(2)} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa da Rede (Gás)</span>
                <span className="font-mono-style">{networkFeeEth.toFixed(3)} ETH</span>
              </div>
            </div>

            <div className="border-t border-border pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold font-mono-style text-primary">{totalEth.toFixed(3)} ETH</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 text-destructive text-sm rounded-xl">
                {error}
              </div>
            )}

            <Button 
              className="w-full h-14 uppercase tracking-wider font-mono-style"
              onClick={handleCheckout}
              disabled={checkoutMutation.isPending || (user ? user.wallets.length === 0 : false)}
            >
              {checkoutMutation.isPending ? 'Processando...' : 'Confirmar Compra'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
