import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Wallet, Activity, Heart, Tag, Download, HelpCircle, LogOut } from 'lucide-react';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

const menuItems = [
  { icon: User, label: 'Dados do perfil', id: 'profile' },
  { icon: Wallet, label: 'Carteiras', id: 'wallets' },
  { icon: Activity, label: 'Atividade', id: 'activity' },
  { icon: Heart, label: 'Lista de interesse', id: 'wishlist' },
  { icon: Tag, label: 'Ofertas', id: 'offers' },
  { icon: Download, label: 'Arquivos baixados', id: 'downloads' },
  { icon: HelpCircle, label: 'Suporte', id: 'support' },
];

function ProfilePage() {
  const { user, isLoading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [ensName, setEnsName] = useState('');
  const [walletAlias, setWalletAlias] = useState('');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 animate-pulse bg-muted h-96 rounded-2xl" />;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
        <p className="mb-8 text-muted-foreground">Você precisa fazer login para ver seu perfil.</p>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name: displayName, email });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="bg-[#241612] rounded-xl p-6">
            <h2 className="font-bold text-lg font-sans text-foreground mb-6">Meu perfil</h2>
            <nav className="space-y-1" aria-label="Menu do perfil">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-colors text-left ${
                      isActive
                        ? 'text-primary border-l-2 border-primary bg-primary/5'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => { logout(); navigate({ to: '/' }); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-colors text-left text-primary hover:bg-primary/5"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-xl font-bold font-sans text-foreground mb-8">Perfil do colecionador</h1>
          
          <form onSubmit={handleSave} className="space-y-8">
            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileInput label="Nome de exibição" required value={displayName} onChange={setDisplayName} />
              <ProfileInput label="Nome de usuário" required value={username} onChange={setUsername} />
              <ProfileInput label="E-mail" required type="email" value={email} onChange={setEmail} />
              <div className="flex gap-2 items-end">
                <div className="w-20">
                  <label className="block text-sm text-foreground mb-2">Nome ENS <span className="text-primary">*</span></label>
                  <select className="w-full bg-transparent border border-border text-foreground px-2 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary">
                    <option>.eth</option>
                  </select>
                </div>
                <div className="flex-1">
                  <input 
                    className="w-full bg-transparent border border-border text-foreground px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary"
                    value={ensName}
                    onChange={e => setEnsName(e.target.value)}
                  />
                </div>
              </div>
              <ProfileInput label="Apelido da carteira" required value={walletAlias} onChange={setWalletAlias} />
            </div>

            {/* Avatar Section */}
            <div className="space-y-3">
              <label className="block text-sm text-foreground font-bold">Avatar</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                  😊
                </div>
                <button type="button" className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded hover:bg-primary/90 transition-colors font-bold">
                  Alterar
                </button>
                <button type="button" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Remover
                </button>
              </div>
            </div>

            {/* Change Password */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-foreground">Alterar senha</h3>
              <PasswordInput label="Senha atual" value={currentPassword} onChange={setCurrentPassword} show={showCurrentPw} onToggle={() => setShowCurrentPw(!showCurrentPw)} />
              <PasswordInput label="Nova senha" value={newPassword} onChange={setNewPassword} show={showNewPw} onToggle={() => setShowNewPw(!showNewPw)} />
              <PasswordInput label="Confirmar nova senha" value={confirmPassword} onChange={setConfirmPassword} show={showConfirmPw} onToggle={() => setShowConfirmPw(!showConfirmPw)} />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded hover:bg-primary/90 transition-colors text-sm"
            >
              Salvar
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

function ProfileInput({ label, required, type = 'text', value, onChange }: {
  label: string; required?: boolean; type?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-foreground mb-2">
        {label}{required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border border-border text-foreground px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary"
      />
    </div>
  );
}

function PasswordInput({ label, value, onChange, show, onToggle }: {
  label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void;
}) {
  return (
    <div className="max-w-md">
      <label className="block text-sm text-foreground mb-2">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border border-border text-foreground px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary pr-10"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
