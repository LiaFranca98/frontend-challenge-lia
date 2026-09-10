import { useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CatalogFilters() {
  const navigate = useNavigate({ from: '/' });
  const searchParams = useSearch({ from: '/' });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get('q') as string;
    navigate({
      search: (prev: Record<string, unknown>) => ({ ...prev, q: q || undefined, page: 1 }),
    });
  };

  const resetFilters = () => {
    navigate({
      search: (prev: Record<string, unknown>) => ({ ...prev, q: undefined, sort: undefined, availability: undefined, page: 1 }),
    });
  };

  return (
    <div className="space-y-8 p-6 font-mono-style text-sm text-foreground bg-[#241612] rounded-xl border border-border">
      
      {/* Hidden search for E2E tests and actual search functionality */}
      <form onSubmit={handleSearch} className="space-y-2 mb-8">
        <div className="flex gap-2">
          <Input 
            name="q"
            defaultValue={searchParams.q || ''}
            placeholder="Buscar colecionáveis..." 
            className="bg-transparent border-border text-foreground h-9"
          />
          <Button type="submit" className="bg-primary text-primary-foreground h-9 uppercase">IR</Button>
        </div>
      </form>

      {/* Coleções */}
      <div>
        <h3 className="font-bold mb-4 uppercase tracking-wider text-base text-white font-sans">Coleções</h3>
        <ul className="space-y-3">
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors text-primary">
            <span>Arte Digital</span>
            <span>(33)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Fotografia</span>
            <span>(12)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Música</span>
            <span>(55)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Arte 3D</span>
            <span>(39)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Colecionáveis</span>
            <span>(22)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Generativo</span>
            <span>(17)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Jogos</span>
            <span>(15)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Assinaturas</span>
            <span>(10)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Utilidade</span>
            <span>(16)</span>
          </li>
        </ul>
      </div>

      {/* Faixa de Preço */}
      <div>
        <h3 className="font-bold mb-4 uppercase tracking-wider text-base text-white font-sans">Faixa de preço</h3>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 bg-border flex-1 relative rounded-full">
            <div className="absolute left-0 w-3/4 h-full bg-primary rounded-full"></div>
            <div className="absolute left-0 -ml-2 -mt-1.5 w-4 h-4 bg-primary rounded-full"></div>
            <div className="absolute left-3/4 -ml-2 -mt-1.5 w-4 h-4 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="text-muted-foreground text-xs mb-4">
          Preço: 0,02 - 12,30 ETH
        </div>
        <Button variant="outline" className="text-primary border-primary bg-transparent hover:bg-primary/10 hover:text-primary font-mono-style uppercase text-xs h-8">
          Aplicar
        </Button>
      </div>

      {/* Rede */}
      <div>
        <h3 className="font-bold mb-4 uppercase tracking-wider text-base text-white font-sans">Rede</h3>
        <ul className="space-y-3">
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Ethereum</span>
            <span>(119)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Polygon</span>
            <span>(78)</span>
          </li>
          <li className="flex justify-between hover:text-primary cursor-pointer transition-colors">
            <span>Solana</span>
            <span>(86)</span>
          </li>
        </ul>
      </div>

      <div className="pt-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full bg-transparent border-border hover:bg-white/5 uppercase font-mono-style text-xs"
          onClick={resetFilters}
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}
