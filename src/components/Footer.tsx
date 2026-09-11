import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="hidden md:block text-foreground">
      {/* SEÇÃO 1: Features e Newsletter */}
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-[#241612] rounded-t-none">
          <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#3F2319]">
            {/* Features */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#3F2319]">
              <div className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-6">W</div>
                <h4 className="font-bold text-base mb-3 font-sans text-white">Segurança da carteira</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Proteja sua carteira e colecione arte digital verificada com confiança.</p>
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-6">C</div>
                <h4 className="font-bold text-base mb-3 font-sans text-white">Criadores em destaque</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.</p>
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-6">D</div>
                <h4 className="font-bold text-base mb-3 font-sans text-white">Alertas de lançamentos</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.</p>
              </div>
            </div>
            {/* Newsletter */}
            <div className="lg:col-span-1 p-8 bg-[#22160F]">
              <h4 className="font-bold font-mono-style text-sm mb-6 text-white leading-tight">Antecipe-se ao próximo<br />lançamento</h4>
              <div className="flex w-full mb-6">
                <input
                  type="email"
                  placeholder="digite seu e-mail..."
                  aria-label="Email para newsletter"
                  className="bg-[#241612] border border-[#3F2319] text-foreground px-4 py-3 w-full focus:outline-none focus:border-primary font-mono-style text-xs rounded-none"
                />
                <button className="bg-primary text-primary-foreground font-bold px-6 py-3 hover:bg-primary/90 transition-colors rounded-none whitespace-nowrap text-sm">
                  Enviar
                </button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">Receba lançamentos selecionados, histórias de criadores e novidades do mercado.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO 2: Faixa de Contato */}
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-[#38220F] py-4 px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center text-xs lg:text-sm gap-4">
            <div className="font-bold font-mono-style tracking-widest uppercase text-white">KURIO</div>
            <div className="text-muted-foreground text-xs">Feito para colecionadores, criadores e cultura</div>
            <div className="text-muted-foreground font-mono-style text-xs">contato@email.com</div>
            <div className="text-muted-foreground font-mono-style text-xs">+55 11 4002 8922</div>
          </div>
        </div>
      </div>

      {/* SEÇÃO 3: Links */}
      <div className="max-w-[1200px] mx-auto pb-16">
        <div className="bg-[#22160F] p-8 lg:p-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="font-bold mb-6 font-sans text-white text-sm">Meu perfil</h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-sans">
                <li><Link to="/profile" className="hover:text-primary transition-colors">Meu perfil</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Minha coleção</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Atividade</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Estúdio do criador</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Lista de interesse</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 font-sans text-white text-sm">Central de ajuda</h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-sans">
                <li><Link to="/" className="hover:text-primary transition-colors">Central de ajuda</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Como comprar NFTs</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Carteira e segurança</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Política do mercado</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Denunciar item</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 font-sans text-white text-sm">Coleções</h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-sans">
                <li><Link to="/" className="hover:text-primary transition-colors">Arte digital</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Fotografia</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Música</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Arte 3D</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Utilidade</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 font-sans text-white text-sm">Redes sociais</h4>
              <div className="flex gap-3 mb-10">
                <a href="#" aria-label="Facebook" className="w-10 h-10 border border-[#3F2319] flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-muted-foreground">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 border border-[#3F2319] flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-muted-foreground">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 border border-[#3F2319] flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-muted-foreground">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 border border-[#3F2319] flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-muted-foreground">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="#" aria-label="YouTube" className="w-10 h-10 border border-[#3F2319] flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-muted-foreground">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                </a>
              </div>
              <h4 className="font-bold mb-4 font-sans text-white text-sm">Carteiras compatíveis</h4>
              <div className="flex gap-2">
                <div className="border border-border text-[10px] px-2 py-1 font-mono-style text-muted-foreground">METAMASK</div>
                <div className="border border-border text-[10px] px-2 py-1 font-mono-style text-muted-foreground">WALLETCONNECT</div>
                <div className="border border-border text-[10px] px-2 py-1 font-mono-style text-muted-foreground">COINBASE</div>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground font-mono-style mt-8">
            © {new Date().getFullYear()} Kurio. Propriedade digital para todos.
          </div>
        </div>
      </div>
    </footer>
  );
}
