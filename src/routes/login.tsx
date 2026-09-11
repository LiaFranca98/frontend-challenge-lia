import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { X, Eye, EyeOff } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate({ to: '/' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup({ name: signupName, email: signupEmail, password: signupPassword });
      navigate({ to: '/' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta');
    }
  };

  const handleSocialLogin = () => {
    setError('Autenticação social em breve.');
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Autenticação">
      <div className="bg-[#241612] border border-border w-full max-w-md relative rounded-lg overflow-hidden">
        {/* Close */}
        <button 
          onClick={() => navigate({ to: '/' })} 
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pt-10">
          {/* Tabs */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`text-lg font-bold font-sans transition-colors ${activeTab === 'login' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Entrar
            </button>
            <span className="text-muted-foreground text-lg">|</span>
            <button
              onClick={() => { setActiveTab('signup'); setError(''); }}
              className={`text-lg font-bold font-sans transition-colors ${activeTab === 'signup' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Criar conta
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Entre para gerenciar sua carteira, coleção e perfil de criador.
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded mb-4 font-mono-style">
              {error}
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="contato@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
                className="w-full bg-[#1A110C] border border-border text-foreground px-4 py-3 text-sm rounded focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Senha"
                  className="w-full bg-[#1A110C] border border-border text-foreground px-4 py-3 text-sm rounded focus:outline-none focus:border-primary pr-12 placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-right">
                <button type="button" className="text-xs text-muted-foreground hover:text-primary transition-colors" onClick={() => setError('Recuperação de senha em breve.')}>
                  Esqueceu a senha?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1A110C] border border-border text-foreground font-bold py-3 rounded hover:bg-card transition-colors text-sm"
              >
                Entrar
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                aria-label="Nome"
                className="w-full bg-[#1A110C] border border-border text-foreground px-4 py-3 text-sm rounded focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <input
                type="email"
                placeholder="contato@email.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                aria-label="Email"
                className="w-full bg-[#1A110C] border border-border text-foreground px-4 py-3 text-sm rounded focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <div className="relative">
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  aria-label="Senha"
                  className="w-full bg-[#1A110C] border border-border text-foreground px-4 py-3 text-sm rounded focus:outline-none focus:border-primary pr-12 placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showSignupPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1A110C] border border-border text-foreground font-bold py-3 rounded hover:bg-card transition-colors text-sm"
              >
                Criar conta
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">Ou continue com</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSocialLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#1A110C] border border-border text-foreground py-3 rounded hover:bg-card transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continuar com Google
            </button>
            <button
              onClick={handleSocialLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#1A110C] border border-border text-foreground py-3 rounded hover:bg-card transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Continuar com Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
