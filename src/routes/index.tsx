import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { CatalogFilters } from '../features/catalog/CatalogFilters';
import { NFTCard } from '../features/catalog/NFTCard';
import { useCatalog } from '../hooks/useCatalog';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect, useCallback } from 'react';

const catalogSearchSchema = z.object({
  q: z.string().optional().catch(''),
  sort: z.string().optional().catch('newest'),
  availability: z.string().optional().catch(''),
  page: z.number().optional().catch(1),
});

export const Route = createFileRoute('/')(  {
  validateSearch: catalogSearchSchema,
  component: CatalogPage,
});

const heroImages = ['/nfts/nft-1.png', '/nfts/nft-2.png', '/nfts/nft-4.png'];

function CatalogPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate({ from: '/' });
  const { data, isLoading, isError } = useCatalog({
    q: searchParams.q,
    sort: searchParams.sort,
    availability: searchParams.availability,
    page: searchParams.page,
    limit: 9,
  });

  const [heroIndex, setHeroIndex] = useState(0);

  const nextHero = useCallback(() => {
    setHeroIndex((i) => (i + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const timer = setInterval(nextHero, 5000);
    return () => clearInterval(timer);
  }, [nextHero]);

  const currentPage = searchParams.page || 1;
  const totalPages = data?.meta?.totalPages || 1;

  const goToPage = (page: number) => {
    navigate({
      search: (prev: Record<string, unknown>) => ({ ...prev, page }),
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 space-y-16">
      
      {/* Hero Section with Carousel */}
      <section aria-label="Destaque">
        {/* MOBILE LAYOUT (from recent change) */}
        <div className="md:hidden relative w-full rounded-[32px] bg-gradient-to-br from-[#3A2216] to-[#140D0A] p-6 overflow-hidden flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start z-10 w-full mb-8">
            <div className="w-[55%] space-y-4">
              <div className="font-mono-style text-white text-xs tracking-wide">
                Bem-vindo à Kurio
              </div>
              <h1 className="text-xl font-bold uppercase tracking-tight leading-snug text-white">
                SEJA DONO DA<br />CULTURA DIGITAL
              </h1>
              <p className="text-muted-foreground font-mono-style text-[10px] leading-relaxed max-w-[200px]">
                Descubra NFTs selecionados de criadores do mundo todo.
              </p>
              <button 
                className="text-primary hover:text-primary/90 font-bold uppercase text-xs flex items-center gap-2 mt-2"
                onClick={() => {
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                EXPLORAR 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>

            <div className="w-[45%] flex justify-end relative mt-2">
              <div className="relative w-full max-w-[200px] aspect-square rounded-[16px] overflow-visible">
                {heroImages.map((src, idx) => (
                  <div key={src} className={`absolute inset-0 transition-opacity duration-700 ${idx === heroIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                      src={src}
                      alt={`NFT Destaque principal ${idx + 1}`}
                      className="w-full h-full object-cover rounded-[16px]"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      width={300}
                      height={300}
                    />
                    <img
                      src={heroImages[(idx + 1) % heroImages.length]}
                      alt={`NFT Destaque secundário ${idx + 1}`}
                      className="absolute -bottom-4 -left-4 w-[45%] h-[45%] object-cover rounded-[12px] border-4 border-[#25160E]"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      width={150}
                      height={150}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10" role="tablist" aria-label="Slides do hero">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                role="tab"
                aria-selected={idx === heroIndex}
                aria-label={`Slide ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === heroIndex ? 'bg-primary' : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          {/* Abstract circular gradient shapes for background decoration */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] rounded-full bg-primary/5 blur-[80px] z-0 pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] rounded-full bg-primary/10 blur-[100px] z-0 pointer-events-none" />
        </div>

        {/* DESKTOP LAYOUT (original flex layout) */}
        <div className="hidden md:flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="font-mono-style text-primary uppercase text-sm tracking-widest">
              Bem-vindo à Kurio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight">
              Seja dono do futuro<br />da arte digital
            </h1>
            <p className="text-muted-foreground font-mono-style text-sm max-w-xl">
              Descubra NFTs selecionados de criadores emergentes e consagrados. 
              Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet.
            </p>
            <button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono-style uppercase font-bold py-3 px-8 rounded-md transition-colors mt-4"
              onClick={() => {
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center gap-4">
            <div className="w-full rounded-[24px] overflow-hidden relative aspect-square max-w-[420px]">
              {heroImages.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`NFT Destaque ${idx + 1}`}
                  width={420}
                  height={420}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    idx === heroIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Slides do hero">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  role="tab"
                  aria-selected={idx === heroIndex}
                  aria-label={`Slide ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === heroIndex ? 'bg-primary' : 'bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <div id="catalog-section" className="flex flex-col lg:flex-row gap-12 pt-8 border-t border-border/20">
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <CatalogFilters />

          {/* NFT em Destaque */}
          <div className="bg-gradient-to-br from-[#3A2216]/60 to-[#140D0A]/80 border border-border/50 rounded-2xl p-5 shadow-lg">
            <h3 className="font-sans font-bold text-lg text-foreground mb-1">NFT em Destaque</h3>
            <p className="font-mono-style text-primary text-[10px] uppercase tracking-widest mb-4">Oferta Limitada</p>
            <div className="w-full relative rounded-xl overflow-hidden aspect-square">
              <img src="/nfts/nft-1.png" alt="NFT Destaque" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" width={240} height={240} />
            </div>
          </div>
        </aside>
        
        <div className="flex-1 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-4 gap-4">
            <div className="flex gap-6 font-mono-style text-sm uppercase">
              <span className="text-primary font-bold border-b-2 border-primary pb-4 -mb-4">Todos os NFTs</span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">Novos lançamentos</span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">Em alta</span>
            </div>
            <div className="font-mono-style text-sm text-muted-foreground">
              Ordenar por:<span className="text-foreground">Listados recentemente</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[250px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-destructive border border-destructive/20 rounded-lg font-mono-style">
              <p className="font-semibold">Erro ao carregar catálogo.</p>
              <p className="text-muted-foreground text-sm mt-2">Por favor, tente novamente.</p>
            </div>
          ) : data?.data.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-border rounded-lg bg-card font-mono-style">
              <p className="font-semibold">Nenhum NFT encontrado.</p>
              <p className="text-muted-foreground text-sm mt-2">Ajuste seus filtros ou termo de busca.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
                {data?.data.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
              
              {/* Numeric Pagination */}
              {totalPages > 1 && (
                <nav className="flex justify-center items-center gap-2 mt-8" aria-label="Paginação">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      aria-current={page === currentPage ? 'page' : undefined}
                      className={`w-10 h-10 flex items-center justify-center font-mono-style text-sm transition-colors rounded ${
                        page === currentPage
                          ? 'bg-primary text-primary-foreground font-bold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-card border border-border'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {totalPages > 5 && (
                    <button
                      onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                      aria-label="Próxima página"
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground border border-border rounded transition-colors"
                    >
                      &gt;
                    </button>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      {/* Featured Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Destaques editoriais">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
          <img src="/nfts/nft-5.png" alt="Lançamentos gratuitos" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={300} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 space-y-3">
            <h3 className="text-lg font-bold font-sans text-white leading-tight">Lançamentos gratuitos<br />de edição limitada</h3>
            <p className="text-xs text-muted-foreground">Descubra edições exclusivas, distribuídas com criadores antes da cunhagem pública.</p>
            <button 
              className="bg-primary text-primary-foreground font-mono-style uppercase font-bold py-2 px-6 text-xs rounded hover:bg-primary/90 transition-colors"
              onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explorar
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
          <img src="/nfts/nft-6.png" alt="Tutoriais e artistas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={300} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 space-y-3">
            <h3 className="text-lg font-bold font-sans text-white leading-tight">Tutoriais, artistas e produtividade</h3>
            <p className="text-xs text-muted-foreground">Cultive conexões com artistas, guias, produtividade e mais dentro da rede.</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
          <img src="/nfts/nft-3.png" alt="Arte digital colecionável" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={300} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 space-y-3">
            <h3 className="text-lg font-bold font-sans text-white leading-tight">Arte digital colecionável<br />e muito mais</h3>
            <p className="text-xs text-muted-foreground">Explore novas mídias, coleções verificadas e drops digitais exclusivos.</p>
          </div>
        </div>
      </section>

      {/* Diário da Cunhagem */}
      <section aria-label="Diário da Cunhagem">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold font-sans">Diário da Cunhagem</h2>
          <p className="text-muted-foreground font-mono-style text-sm max-w-xl mx-auto">
            Artesanato, guias e insights para colecionadores sobre o universo da propriedade digital.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: '/nfts/nft-1.png', date: '18 de outubro', title: 'Como funciona a propriedade de NFTs', desc: 'Entenda o certificado, registre a histórico e colecione arte digital autêntica.' },
            { img: '/nfts/nft-2.png', date: '14 de outubro', title: '10 artistas digitais para acompanhar', desc: 'Criadores criativos que estão moldando a arte digital contemporânea.' },
            { img: '/nfts/nft-4.png', date: '21 de outubro', title: 'Tendências de generativas e IA', desc: 'Como inteligência artificial está mudando o panorama da arte gerada por código.' },
            { img: '/nfts/nft-5.png', date: '10 de outubro', title: 'Como proteger sua coleção', desc: 'Práticas de segurança, como usar carteiras, armazenar chaves e verificar autenticidade.' },
          ].map((article, idx) => (
            <article key={idx} className="group cursor-default">
              <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3]">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={300} height={225} />
              </div>
              <p className="text-xs text-muted-foreground font-mono-style mb-2">{article.date}</p>
              <h3 className="font-bold font-sans text-sm text-foreground mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{article.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
