import React, { useState, useEffect } from 'react';
import { Home, FileText, ShoppingCart, Users, Package, Menu, X, LogOut, Store as StoreIcon, Building2, Calculator, Bot } from 'lucide-react';
import { UserRole, Store } from '../types';

interface SidebarProps {
  setCurrentView: (view: 'dashboard' | 'proposals' | 'sales' | 'clients' | 'products' | 'stores' | 'calculator' | 'automation') => void;
  userRole: UserRole;
  onLogout: () => void;
  stores: Store[];
  selectedStore: Store | null;
  setSelectedStore: (store: Store | null) => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ setCurrentView, userRole, onLogout, stores, selectedStore, setSelectedStore, isMobileMenuOpen = false, setIsMobileMenuOpen }) => {
  // Use external state if provided, otherwise use internal state
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const menuOpen = setIsMobileMenuOpen ? isMobileMenuOpen : internalMenuOpen;
  const setMenuOpen = setIsMobileMenuOpen || setInternalMenuOpen;

  // Handle keyboard events for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen, setMenuOpen]);

  const navItems = [
    { view: 'dashboard', label: 'Dashboard', icon: Home },
    { view: 'proposals', label: 'Propostas', icon: FileText },
    { view: 'sales', label: 'Vendas', icon: ShoppingCart },
    { view: 'clients', label: 'Clientes', icon: Users },
    { view: 'calculator', label: 'Calculadora', icon: Calculator },
    { view: 'automation', label: 'Atendimento', icon: Bot },
  ] as const;

  const adminItems = [
    { view: 'products', label: 'Produtos', icon: Package },
    { view: 'stores', label: 'Lojas', icon: Building2 },
  ] as const;

  const handleNavClick = (view: 'dashboard' | 'proposals' | 'sales' | 'clients' | 'products' | 'stores' | 'calculator' | 'automation') => {
    setCurrentView(view);
    setMenuOpen(false);
  }

  const renderNavLinks = (items: typeof navItems | typeof adminItems) => {
    return items.map((item) => (
      <a
        key={item.view}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(item.view);
        }}
        className="group flex items-center px-4 py-3 text-admin-secondary hover:bg-accent/20 hover:text-admin-primary rounded-lg transition-all duration-200 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-secondary"
      >
        <item.icon className="h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
        <span className="font-medium">{item.label}</span>
      </a>
    ));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-admin-background-secondary text-admin-primary">
      {/* Header */}
      <div className="p-6 border-b border-admin">
        <h2 className="text-xl font-bold text-admin-primary">Menu de Navegação</h2>
        <p className="text-sm text-admin-secondary mt-1">
          Painel {userRole === 'admin' ? 'Administrativo' : 'de Vendas'}
        </p>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${userRole === 'admin'
          ? 'bg-accent/20 text-accent'
          : 'bg-secondary/20 text-secondary'
          }`}>
          {userRole === 'admin' ? '👑 Administrador' : '💼 Vendedor'}
        </div>
      </div>

      {/* Store Selector for Admin */}
      {userRole === 'admin' && (
        <div className="p-6 border-b border-admin">
          <label htmlFor="store-selector" className="text-xs font-semibold text-admin-secondary uppercase tracking-wider flex items-center mb-3">
            <StoreIcon className="h-4 w-4 mr-2" />
            Loja Ativa
          </label>
          <select
            id="store-selector"
            value={selectedStore?.id || ''}
            onChange={(e) => {
              const store = stores.find(s => s.id === parseInt(e.target.value));
              setSelectedStore(store || null);
            }}
            className="input-primary w-full focus:ring-accent focus:border-accent"
          >
            {stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1" role="navigation" aria-label="Menu principal">
        <div className="space-y-1">
          {renderNavLinks(navItems)}
        </div>

        {/* Admin Section */}
        {userRole === 'admin' && (
          <div className="pt-6 mt-6 border-t border-admin">
            <h2 className="px-4 text-xs font-semibold text-admin-secondary uppercase tracking-wider mb-3">Administração</h2>
            <div className="space-y-1">
              {renderNavLinks(adminItems)}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-admin">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-admin-secondary hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-background-secondary"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação móvel"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>

        {/* Sidebar */}
        <div className={`relative w-80 max-w-[85vw] bg-background-secondary h-full shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-admin-primary p-2 rounded-lg hover:bg-admin-background-tertiary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-secondary z-10"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu de navegação"
          >
            <X size={24} />
          </button>

          {/* Sidebar Content */}
          <div className="pt-16 h-full overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};