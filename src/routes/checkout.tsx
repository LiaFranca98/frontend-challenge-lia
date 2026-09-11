import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useCart } from '@/hooks/useCart';
import { useCatalog } from '@/hooks/useCatalog';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/axios';
import type { Order } from '@/domain/types';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { data: cartItems = [] } = useCart();
  const { data: catalogData } = useCatalog({ limit: 100 });
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState('coinbase');

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  const applyCoupon = useMutation({
    mutationFn: async () => {
      const { data } = await api.post<{ discountEth: string, code: string }>('/cart/coupon', { code: couponInput });
      return data;
    },
    onSuccess: (data) => {
      setAppliedDiscount(parseFloat(data.discountEth));
      setCouponError(null);
    },
    onError: (err: any) => {
      setCouponError(err.response?.data?.message || 'Erro ao aplicar cupom');
      setAppliedDiscount(0);
    }
  });

  // Form state
  const [form, setForm] = useState({
    displayName: '', username: '', network: '', profileName: '',
    walletAddress: '', secondaryWallet: '', walletType: '', referralCode: '',
    email: user?.email || '', ensName: '', useOtherWallet: false, notes: '',
  });

  const nfts = catalogData?.data || [];
  const enhancedItems = cartItems.map(item => {
    const nft = nfts.find((n: any) => n.id === item.nftId);
    return { ...item, nft };
  }).filter(item => item.nft);

  const subtotalEth = enhancedItems.reduce((acc, item) => acc + (parseFloat(item.nft!.priceEth) * item.quantity), 0);
  const networkFeeEth = 0.016;
  const totalEth = subtotalEth + networkFeeEth;

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const idempotencyKey = `order-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const payload = { items: cartItems, idempotencyKey };
      const { data } = await api.post<{ order: Order }>('/checkout', payload);
      return data;
    },
    onSuccess: (data) => {
      if (data.order && data.order.status === 'rejected') {
        setError('Pagamento recusado. Tente outro método.');
        return;
      }
      setShowConfirmation(true);
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

  if (cartItems.length === 0 && !showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
        <Button onClick={() => navigate({ to: '/' })}>Voltar ao Catálogo</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 font-mono-style">
      {/* Breadcrumb */}
      <div className="text-muted-foreground text-sm uppercase mb-8 font-mono-style">
        <Link to="/" className="hover:text-foreground">Início</Link> /
        <Link to="/" className="hover:text-foreground"> Mercado</Link> / Pagamento
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Collector Profile Form */}
        <div className="flex-1 space-y-3">
          <h2 className="text-lg font-bold text-foreground">Perfil do colecionador</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Nome de exibição" required value={form.displayName} onChange={v => setForm(f => ({...f, displayName: v}))} />
            <InputField label="Nome de usuário" required value={form.username} onChange={v => setForm(f => ({...f, username: v}))} />
            <SelectField label="Rede" required options={['Selecione uma rede', 'Ethereum', 'Polygon', 'Solana']} />
            <InputField label="Nome do perfil" required value={form.profileName} onChange={v => setForm(f => ({...f, profileName: v}))} />
            <InputField label="Endereço da carteira" required placeholder="Endereço 0x da carteira" value={form.walletAddress} onChange={v => setForm(f => ({...f, walletAddress: v}))} />
            <InputField label="ENS ou carteira secundária (opcional)" placeholder="ENS ou carteira secundária (opcional)" value={form.secondaryWallet} onChange={v => setForm(f => ({...f, secondaryWallet: v}))} />
            <SelectField label="Tipo de carteira" required options={['Selecione uma carteira', 'MetaMask', 'Coinbase Wallet', 'WalletConnect']} />
            <InputField label="Código de indicação" required value={form.referralCode} onChange={v => setForm(f => ({...f, referralCode: v}))} />
            <InputField label="E-mail" required type="email" value={form.email} onChange={v => setForm(f => ({...f, email: v}))} />
            <div className="flex gap-2 items-end">
              <div className="w-20">
                <label className="block text-xs text-foreground mb-2">Nome ENS <span className="text-primary">*</span></label>
                <select className="w-full bg-transparent border border-border text-foreground px-2 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary">
                  <option>.eth</option>
                </select>
              </div>
              <div className="flex-1">
                <input className="w-full bg-transparent border border-border text-foreground px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary" value={form.ensName} onChange={e => setForm(f => ({...f, ensName: e.target.value}))} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className={`w-4 h-4 rounded-full border-2 ${form.useOtherWallet ? 'border-primary bg-primary' : 'border-primary'} cursor-pointer flex items-center justify-center`} onClick={() => setForm(f => ({...f, useOtherWallet: !f.useOtherWallet}))}>
              {form.useOtherWallet && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
            </div>
            <span className="text-sm">Usar outra carteira?</span>
          </div>

          <div className="mt-6">
            <label className="block text-sm text-foreground mb-2">Observação do colecionador (opcional)</label>
            <textarea 
              className="w-full max-w-[350px] bg-transparent border border-border text-foreground px-3 py-3 text-sm rounded-sm focus:outline-none focus:border-primary h-36 resize-none"
              value={form.notes}
              onChange={e => setForm(f => ({...f, notes: e.target.value}))}
            />
          </div>
        </div>

        {/* RIGHT: NFT Summary + Wallet */}
        <div className="w-full lg:w-[405px] shrink-0 space-y-3">
          <h2 className="text-lg font-bold text-foreground">Seus NFTs</h2>
          
          <div className="space-y-3">
            {/* Header */}
            <div className="flex justify-between text-sm font-bold border-b border-primary/30 pb-2">
              <span>NFTs</span>
              <span>Subtotal</span>
            </div>

            {/* Items */}
            {enhancedItems.map(item => (
              <div key={item.nftId} className="bg-[#241612] p-3 flex items-center gap-3 rounded">
                <img src={item.nft!.imageUrl} alt={item.nft!.title} className="w-14 h-14 rounded-lg object-cover" width={56} height={56} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{item.nft!.title}</p>
                  <p className="text-xs text-muted-foreground">ID do token: #{item.nft!.id.replace('nft-', '').padStart(4, '0')}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">(x {item.quantity})</span>
                <span className="font-bold text-primary text-sm whitespace-nowrap">{(parseFloat(item.nft!.priceEth) * item.quantity).toFixed(2)} ETH</span>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <div className="space-y-2 pt-4 border-t border-border mt-4">
            <p className="text-xs text-center text-muted-foreground">Tem um código promocional? Aplique aqui</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Código promocional" 
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
                className="w-full bg-transparent border border-border text-foreground px-3 py-2 text-sm rounded focus:outline-none focus:border-primary"
              />
              <Button 
                variant="outline" 
                onClick={() => applyCoupon.mutate()} 
                disabled={applyCoupon.isPending || !couponInput}
                className="font-mono-style"
              >
                Aplicar
              </Button>
            </div>
            {couponError && <p className="text-xs text-destructive text-center">{couponError}</p>}
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm pt-4">
            <div className="flex justify-between"><span>Subtotal</span><span>{subtotalEth.toFixed(2)} ETH</span></div>
            <div className="flex justify-between"><span>Desconto do lançamento</span><span>(-) {appliedDiscount.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Taxa de rede</span><span>{networkFeeEth.toFixed(3)} ETH</span></div>
            <p className="text-xs text-primary text-center">Taxa estimada</p>
            <div className="border-t border-primary/30 pt-3 flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary text-lg">{Math.max(0, totalEth - appliedDiscount).toFixed(3)} ETH</span>
            </div>
          </div>

          {/* Wallet Selection */}
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-center">Carteira e rede</h3>
            <div className="bg-[#241612] p-3 rounded flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-primary" />
              <div className="flex gap-2">
                <span className="text-[10px] border border-border px-2 py-0.5 font-mono-style text-muted-foreground">METAMASK</span>
                <span className="text-[10px] border border-border px-2 py-0.5 font-mono-style text-muted-foreground">WALLETCONNECT</span>
                <span className="text-[10px] border border-border px-2 py-0.5 font-mono-style text-muted-foreground">COINBASE</span>
              </div>
            </div>
            <label className="flex items-center gap-3 border border-border rounded p-4 cursor-pointer hover:border-primary transition-colors">
              <input type="radio" name="wallet" value="metamask" checked={selectedWallet === 'metamask'} onChange={() => setSelectedWallet('metamask')} className="accent-primary" />
              <span className="text-sm">MetaMask</span>
            </label>
            <label className="flex items-center gap-3 border border-border rounded p-4 cursor-pointer hover:border-primary transition-colors">
              <input type="radio" name="wallet" value="coinbase" checked={selectedWallet === 'coinbase'} onChange={() => setSelectedWallet('coinbase')} className="accent-primary" />
              <span className="text-sm">Coinbase Wallet</span>
            </label>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive text-sm rounded">{error}</div>
          )}

          <Button
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-mono-style uppercase tracking-wider rounded-lg"
            onClick={handleCheckout}
            disabled={checkoutMutation.isPending}
          >
            {checkoutMutation.isPending ? 'Processando...' : 'Confirmar compra'}
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Confirmação do pedido">
          <div className="bg-[#241612] w-full max-w-[578px] relative flex flex-col">
            {/* X close */}
            <button onClick={() => { setShowConfirmation(false); navigate({ to: '/' }); }} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10" aria-label="Fechar">
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-20 h-20 text-primary flex items-center justify-center text-4xl">📨</div>
              <p className="text-muted-foreground font-bold font-mono-style text-center">Seus NFTs agora estão na sua carteira</p>
            </div>

            <div className="h-px bg-primary" />

            {/* Transaction Meta */}
            <div className="flex items-center justify-between px-9 py-3 text-xs">
              <div><p className="text-muted-foreground">ID da transação</p><p className="text-foreground font-bold">0xA91F...E82C</p></div>
              <div className="w-px h-8 bg-primary" />
              <div><p className="text-muted-foreground">Data</p><p className="text-foreground font-bold">{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</p></div>
              <div className="w-px h-8 bg-primary" />
              <div><p className="text-muted-foreground">Total</p><p className="text-foreground font-bold">{totalEth.toFixed(3)} ETH</p></div>
              <div className="w-px h-8 bg-primary" />
              <div><p className="text-muted-foreground">Carteira</p><p className="text-foreground font-bold">{selectedWallet === 'metamask' ? 'MetaMask' : 'Coinbase'}</p></div>
            </div>

            <div className="h-px bg-primary" />

            {/* Transaction Details */}
            <div className="px-11 py-5 space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm">Detalhes da transação</p>
              </div>
              <div className="flex justify-between text-xs text-foreground">
                <span className="font-bold">NFTs</span>
                <div className="flex gap-12"><span>Edições</span><span>Subtotal</span></div>
              </div>
              
              {enhancedItems.map(item => (
                <div key={item.nftId} className="flex items-center gap-3 py-2">
                  <img src={item.nft!.imageUrl} alt={item.nft!.title} className="w-12 h-12 rounded-lg object-cover" width={48} height={48} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{item.nft!.title}</p>
                    <p className="text-xs text-muted-foreground">ID do token: #{item.nft!.id.replace('nft-', '').padStart(4, '0')}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">(x {item.quantity})</span>
                  <span className="font-bold text-primary text-sm">{(parseFloat(item.nft!.priceEth) * item.quantity).toFixed(2)} ETH</span>
                </div>
              ))}

              <div className="space-y-1 pt-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Taxa de rede</span><span>{networkFeeEth.toFixed(3)} ETH</span></div>
                <div className="flex justify-between font-bold"><span>Total</span><span className="text-primary">{totalEth.toFixed(3)} ETH</span></div>
              </div>

              <p className="text-xs text-muted-foreground text-center pt-4 leading-relaxed">
                Transação confirmada na Ethereum. A propriedade foi transferida para sua carteira conectada e registrada na rede.
              </p>

              <div className="flex justify-center pt-4">
                <button className="border border-primary text-primary px-6 py-2.5 text-sm font-mono-style hover:bg-primary/10 transition-colors rounded">
                  Ver no Etherscan
                </button>
              </div>
            </div>

            {/* Bottom Primary bar */}
            <div className="h-2.5 bg-primary" />
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, required, placeholder, type = 'text', value, onChange }: {
  label: string; required?: boolean; placeholder?: string; type?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-foreground mb-2">
        {label}{required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-border text-foreground px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary"
        required={required}
      />
    </div>
  );
}

function SelectField({ label, required, options }: {
  label: string; required?: boolean; options: string[];
}) {
  return (
    <div>
      <label className="block text-xs text-foreground mb-2">
        {label}{required && <span className="text-primary">*</span>}
      </label>
      <select className="w-full bg-transparent border border-border text-foreground px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary appearance-none">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
