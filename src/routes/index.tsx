import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { CatalogFilters } from '../features/catalog/CatalogFilters';
import { NFTCard } from '../features/catalog/NFTCard';
import { useCatalog } from '../hooks/useCatalog';
import { Skeleton } from '@/components/ui/skeleton';

const catalogSearchSchema = z.object({
  q: z.string().optional().catch(''),
  sort: z.string().optional().catch('newest'),
  availability: z.string().optional().catch(''),
  page: z.number().optional().catch(1),
});

export const Route = createFileRoute('/')({
  validateSearch: catalogSearchSchema,
  component: CatalogPage,
});

function CatalogPage() {
  const searchParams = Route.useSearch();
  const { data, isLoading, isError } = useCatalog({
    q: searchParams.q,
    sort: searchParams.sort,
    availability: searchParams.availability,
    page: searchParams.page,
    limit: 8, // hardcoded limit for UI testing
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 space-y-16">
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center">
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
          <button className="bg-primary hover:bg-primary-dark text-primary-foreground font-mono-style uppercase font-bold py-3 px-8 rounded-md transition-colors mt-4">
            Explorar
          </button>
        </div>
        <div className="flex-1 rounded-[40px] overflow-hidden">
          <img src="/nfts/nft-1.png" alt="Hero Monkey" className="w-full h-auto object-cover" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 pt-8 border-t border-border/20">
        <aside className="w-full lg:w-64 shrink-0">
          <CatalogFilters />
        </aside>
        
        <div className="flex-1 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-4 gap-4">
            <div className="flex gap-6 font-mono-style text-sm uppercase">
              <span className="text-primary font-bold border-b-2 border-primary pb-4 -mb-4">Todos os NFTs</span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">Novos lançamentos</span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">Em alta</span>
            </div>
            <div className="font-mono-style text-sm text-muted-foreground">
              Ordenar por: <span className="text-foreground">Listados recentemente</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[250px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
                {data?.data.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
              
              {data && data.meta.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button 
                    disabled={data.meta.page === 1}
                    className="px-4 py-2 border border-border rounded-md disabled:opacity-50 hover:bg-card transition-colors"
                  >
                    Anterior
                  </button>
                  <span className="flex items-center px-4">
                    Página {data.meta.page} de {data.meta.totalPages}
                  </span>
                  <button 
                    disabled={data.meta.page === data.meta.totalPages}
                    className="px-4 py-2 border border-border rounded-md disabled:opacity-50 hover:bg-card transition-colors"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
