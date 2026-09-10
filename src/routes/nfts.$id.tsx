import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useNFT } from '../hooks/useCatalog';
import { useAddToCart } from '../hooks/useCart';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/nfts/$id')({
  component: NFTDetailPage,
});

function NFTDetailPage() {
  const { id } = Route.useParams();
  const { data: nft, isLoading, isError } = useNFT(id);
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const [quantity, setQuantity] = useState(1);

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
    <div className="container mx-auto px-4 md:px-8 py-10 font-mono-style">
      
      <div className="text-muted-foreground text-sm uppercase mb-8 font-mono-style">
        <Link to="/" className="hover:text-foreground">Início</Link> / 
        <Link to="/" className="hover:text-foreground"> Mercado</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        
        {/* Left Side: Images */}
        <div className="flex gap-4">
          <div className="hidden sm:flex flex-col gap-4 w-24 shrink-0">
            {/* Thumbnails placeholder */}
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={nft.imageUrl} alt="Thumb" className="w-full aspect-square object-cover rounded-xl border border-border/50" />
            ))}
          </div>
          <div className="relative flex-1 aspect-square rounded-[40px] overflow-hidden bg-muted">
            <img 
              src={nft.imageUrl} 
              alt={nft.title} 
              className="object-cover w-full h-full" 
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
            <Button variant="outline" className="flex-1 bg-transparent border-primary text-primary hover:bg-primary/10 hover:text-primary font-mono-style uppercase h-12 tracking-wide">
              Favoritar
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
          <div className="group transition-all">
            <div className="block relative aspect-square overflow-hidden bg-muted rounded-[24px] mb-4">
              <img src="/nfts/nft-2.png" alt="Cosmic Bloom" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div>
              <h3 className="font-mono-style font-bold text-foreground text-sm mb-1 line-clamp-1">Cosmic Bloom #118</h3>
              <span className="font-mono-style font-bold text-primary text-sm">1.29 ETH</span>
            </div>
          </div>
          <div className="group transition-all">
            <div className="block relative aspect-square overflow-hidden bg-muted rounded-[24px] mb-4">
              <img src="/nfts/nft-3.png" alt="Violet Nomad" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div>
              <h3 className="font-mono-style font-bold text-foreground text-sm mb-1 line-clamp-1">Violet Nomad #314</h3>
              <span className="font-mono-style font-bold text-primary text-sm">1.39 ETH</span>
            </div>
          </div>
          <div className="group transition-all">
            <div className="block relative aspect-square overflow-hidden bg-muted rounded-[24px] mb-4">
              <img src="/nfts/nft-4.png" alt="Ivory Baron" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div>
              <h3 className="font-mono-style font-bold text-foreground text-sm mb-1 line-clamp-1">Ivory Baron #088</h3>
              <span className="font-mono-style font-bold text-primary text-sm">1.79 ETH</span>
            </div>
          </div>
          <div className="group transition-all">
            <div className="block relative aspect-square overflow-hidden bg-muted rounded-[24px] mb-4">
              <img src="/nfts/nft-5.png" alt="Golden Beat" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div>
              <h3 className="font-mono-style font-bold text-foreground text-sm mb-1 line-clamp-1">Golden Beat #207</h3>
              <span className="font-mono-style font-bold text-primary text-sm">0.99 ETH</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
