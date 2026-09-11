import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useNFT } from '../hooks/useCatalog';
import { useAddToCart, useCartStore } from '../hooks/useCart';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ChevronLeft, ShoppingBag, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useFavorites } from '@/hooks/useFavorites';

export const Route = createFileRoute('/nfts/$id')({
  component: NFTDetailPage,
});

function NFTDetailPage() {
  const { id } = Route.useParams();
  const { data: nft, isLoading, isError } = useNFT(id);
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const { openCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = nft ? isFavorite(nft.id) : false;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-10 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Skeleton className="aspect-square w-full rounded-[40px]" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !nft) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-destructive mb-4">NFT não encontrado</h1>
        <p className="text-muted-foreground mb-8">O item que você procurava não existe ou foi removido.</p>
        <Link to="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  const isAvailable = nft.availableEditions > 0;

  return (
    <div className="container mx-auto px-4 md:px-8 py-4 md:py-10 font-mono-style">

      {/* MOBILE VIEW (Figma 15:5536 & Image 1) */}
      <div className="md:hidden flex flex-col space-y-4">
        {/* Top Floating Action Header */}
        <div className="flex items-center justify-between z-20 mb-[8px]">
          <Link
            to="/"
            className="w-10 h-10 rounded-full bg-[#2F1D15] border border-[#55321F] flex items-center justify-center text-[#CFB28C] hover:text-foreground transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <button
            onClick={() => toggleFavorite(nft.id)}
            className={`w-10 h-10 rounded-full bg-[#2F1D15] border border-[#55321F] flex items-center justify-center transition-colors ${isFav ? 'text-primary' : 'text-[#CFB28C] hover:text-foreground'
              }`}
            aria-label="Favoritar"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-[#D28A4C] text-[#D28A4C]' : 'stroke-current'}`} />
          </button>
        </div>

        {/* Hero Artwork */}
        <div className="relative aspect-square w-full rounded-[24px] overflow-hidden bg-muted shadow-lg">
          <img
            src={nft.imageUrl}
            alt={nft.title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm">
              <Badge variant="destructive" className="text-sm px-3 py-1 uppercase font-mono-style">Esgotado</Badge>
            </div>
          )}
        </div>

        {/* Details Sheet */}
        <div className="bg-[#1c120e] rounded-t-[31px] p-6 -mt-6 relative z-10 border-t border-[#3F2319]/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold font-sans text-foreground">{nft.title}</h1>
            <div className="border border-primary rounded-full px-2.5 py-0.5 flex items-center gap-1 text-xs font-mono-style">
              <span className="text-primary font-bold">★ 4.8</span>
              <span className="text-[#CFB28C]">(19)</span>
            </div>
          </div>

          <p className="text-xs text-[#CFB28C] leading-relaxed font-mono-style">
            Um colecionável digital 1/50 finalizado à mão da coleção Kurio Editions, verificado na Ethereum.
          </p>

          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground font-mono-style block">Edição:</span>
            <div className="flex items-center gap-2 text-xs font-mono-style">
              <span className="px-2.5 py-1 border border-[#55321F] text-[#CFB28C] rounded-full">1/10</span>
              <span className="px-2.5 py-1 border border-[#55321F] text-[#CFB28C] rounded-full">1/10</span>
              <span className="px-2.5 py-1 border border-primary text-primary font-bold rounded-full bg-primary/10">1/50</span>
              <span className="px-2.5 py-1 border border-[#55321F] text-[#CFB28C] rounded-full">ABERTA</span>
            </div>
          </div>

          <div className="space-y-1 text-xs text-[#CFB28C] font-mono-style pt-1">
            <div>ID do token: #{nft.id.replace('nft-', '').padStart(4, '0')}</div>
            <div>Coleção: {nft.collection}</div>
            <div>Atributos: Óculos, Esmeralda, Raro</div>
          </div>

          {/* Action Row */}
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono-style">
                <span className="text-[#CFB28C]">Qtd.</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-5 h-5 rounded-full bg-primary text-background font-bold flex items-center justify-center text-xs"
                >
                  -
                </button>
                <span className="w-4 text-center font-bold text-sm text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(nft.availableEditions, quantity + 1))}
                  className="w-5 h-5 rounded-full bg-primary text-background font-bold flex items-center justify-center text-xs"
                >
                  +
                </button>
              </div>
              <span className="text-lg font-bold font-mono-style text-primary">{nft.priceEth} ETH</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="flex-1 bg-primary hover:bg-primary-dark text-background font-mono-style font-bold uppercase rounded-full h-12 tracking-wide"
                disabled={!isAvailable || isAdding}
                onClick={() => addToCart({ nftId: nft.id, quantity })}
              >
                {isAdding ? 'Adicionando...' : isAvailable ? 'Comprar NFT' : 'Esgotado'}
              </Button>
              <button
                onClick={() => {
                  addToCart({ nftId: nft.id, quantity });
                  openCart();
                }}
                className="w-12 h-12 rounded-full bg-[#2F1D15] border border-[#55321F] flex items-center justify-center text-[#CFB28C] hover:text-primary transition-colors shrink-0"
                aria-label="Adicionar ao carrinho"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW (100% untouched) */}
      <div className="hidden md:block">
        <div className="text-muted-foreground text-sm uppercase mb-8 font-mono-style">
          <Link to="/" className="hover:text-foreground">Início</Link> /
          <Link to="/" className="hover:text-foreground"> Mercado</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

          {/* Left Side: Images */}
          <div className="flex gap-4">
            <div className="hidden sm:flex flex-col gap-4 w-24 shrink-0">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={nft.imageUrl} alt="Thumb" className="w-full aspect-square object-cover rounded-xl border border-border/50" width={100} height={100} loading="lazy" />
              ))}
            </div>
            <div className="relative flex-1 aspect-square rounded-[40px] overflow-hidden bg-muted">
              <img
                src={nft.imageUrl}
                alt={nft.title}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              {!isAvailable && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm">
                  <Badge variant="destructive" className="text-xl px-4 py-2 uppercase font-mono-style">Esgotado</Badge>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold font-sans text-foreground mb-4">{nft.title}</h1>

            <div className="flex items-center gap-6 mb-8">
              <div className="text-xl lg:text-2xl font-bold text-primary font-mono-style">{nft.priceEth} ETH</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary tracking-widest text-lg">★★★★★</span>
                <span>19 avaliações de colecionadores</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-sm">
              <h3 className="font-bold text-foreground font-sans">Sobre este NFT:</h3>
              <p className="text-muted-foreground leading-relaxed">
                Um colecionável digital finalizado à mão da coleção {nft.collection}, verificado na Ethereum,
                com arte desbloqueável e acesso para colecionadores.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="font-bold text-foreground font-sans">Edição:</h3>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="px-3 py-1 border border-border rounded-full hover:border-primary cursor-pointer transition-colors">1/1</span>
                <span className="px-3 py-1 border border-border rounded-full hover:border-primary cursor-pointer transition-colors">1/10</span>
                <span className="px-3 py-1 border border-border rounded-full hover:border-primary cursor-pointer transition-colors">1/50</span>
                <span className="px-3 py-1 border border-border rounded-full hover:border-primary cursor-pointer transition-colors">ABERTA</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              {isAvailable && (
                <div className="flex items-center gap-4">
                  <button
                    className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isAdding}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-4 text-center font-bold text-lg">{quantity}</span>
                  <button
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
                    onClick={() => setQuantity(Math.min(nft.availableEditions, quantity + 1))}
                    disabled={quantity >= nft.availableEditions || isAdding}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}

              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary-dark font-mono-style uppercase h-12 tracking-wide"
                disabled={!isAvailable || isAdding}
                onClick={() => addToCart({ nftId: nft.id, quantity })}
              >
                {isAdding ? 'Adicionando...' : isAvailable ? 'Comprar' : 'Esgotado'}
              </Button>
              <Button
                variant="outline"
                className={`flex-1 font-mono-style uppercase h-12 tracking-wide transition-colors ${isFav
                  ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                  : 'bg-transparent border-primary text-primary hover:bg-primary/10 hover:text-primary'
                  }`}
                onClick={() => {
                  toggleFavorite(nft.id);
                }}
              >
                {isFav ? 'Favoritado' : 'Favoritar'}
              </Button>
            </div>

            <div className="space-y-2 mt-4 text-sm text-muted-foreground">
              <div><span className="font-bold text-foreground font-sans">ID do token:</span> #{nft.id.replace('nft-', '00')}</div>
              <div><span className="font-bold text-foreground font-sans">Coleção:</span> {nft.collection}</div>
              <div><span className="font-bold text-foreground font-sans">Atributos:</span> Óculos, Esmeralda, Raro</div>
              <div className="flex items-center gap-2 pt-2">
                <span className="font-bold text-foreground font-sans">Compartilhar este NFT:</span>
                <span className="cursor-pointer hover:text-foreground">in</span>
                <span className="cursor-pointer hover:text-foreground">mail</span>
                <span className="cursor-pointer hover:text-foreground">tw</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP REVIEWS & RELATED SECTION */}
      <div className="hidden md:block">
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center gap-8 border-b border-border pb-4 mb-8">
            <span className="text-primary font-bold border-b-2 border-primary pb-4 -mb-[18px]">Detalhes do NFT</span>
            <span className="text-muted-foreground hover:text-foreground cursor-pointer">Avaliações de colecionadores (19)</span>
          </div>

          <div className="text-sm text-muted-foreground max-w-4xl leading-relaxed space-y-6">
            <p>
              {nft.title} é uma obra digital {nft.availableEditions}/{nft.totalEditions} finalizada à mão da coleção {nft.collection}.
              {nft.description} A obra explora identidade, movimento e luz em um mundo digital sem fronteiras.
            </p>
            <p>
              A propriedade inclui a arte em alta resolução, lançamentos exclusivos para colecionadores e um registro permanente de procedência registrada na rede.
            </p>
            <div>
              <strong className="text-foreground block mb-1">Rede:</strong>
              Cunhado na Ethereum com procedência imutável e metadados armazenados no IPFS.
            </div>
            <div>
              <strong className="text-foreground block mb-1">Contrato:</strong>
              Direitos autorais do criador: 5% nas vendas secundárias, pagos automaticamente pelos mercados compatíveis.
            </div>
            <div>
              <strong className="text-foreground block mb-1">Direitos autorais:</strong>
              0x7A42...10E8 - Contrato inteligente ERC-721 verificado.
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="font-bold text-primary font-mono-style uppercase mb-8 border-b border-border/50 pb-4">Mais desta coleção</h3>
          <div className="overflow-x-auto pb-4 -mx-2">
            <div className="flex gap-6 px-2 min-w-max">
              {[
                { img: '/nfts/nft-4.png', title: 'Cosmic Bloom #118', price: '1.29 ETH', id: 'nft-4' },
                { img: '/nfts/nft-5.png', title: 'Violet Nomad #314', price: '1.39 ETH', id: 'nft-5' },
                { img: '/nfts/nft-6.png', title: 'Ivory Baron #088', price: '1.79 ETH', id: 'nft-6' },
                { img: '/nfts/nft-1.png', title: 'Golden Beat #207', price: '0.99 ETH', id: 'nft-7' },
                { img: '/nfts/nft-1.png', title: 'Golden Signal #160', price: '0.39 ETH', id: 'nft-8' },
              ].map((item) => (
                <Link key={item.id} to="/nfts/$id" params={{ id: item.id }} className="group transition-all w-[200px] shrink-0">
                  <div className="relative aspect-square overflow-hidden bg-muted rounded-[24px] mb-4">
                    <img src={item.img} alt={item.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" loading="lazy" width={200} height={200} />
                  </div>
                  <h4 className="font-mono-style font-bold text-foreground text-sm mb-1 line-clamp-1">{item.title}</h4>
                  <span className="font-mono-style font-bold text-primary text-sm">{item.price}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="w-3 h-3 rounded-full bg-border" />
          </div>
        </div>
      </div>

    </div>
  );
}
