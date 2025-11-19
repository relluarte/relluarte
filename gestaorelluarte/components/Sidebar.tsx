import React, { useState } from 'react';
import { Home, FileText, ShoppingCart, Users, Package, Menu, X, LogOut, Store as StoreIcon, Building2 } from 'lucide-react';
import { UserRole, Store } from '../types';

interface SidebarProps {
  setCurrentView: (view: 'dashboard' | 'proposals' | 'sales' | 'clients' | 'products' | 'stores') => void;
  userRole: UserRole;
  onLogout: () => void;
  stores: Store[];
  selectedStore: Store | null;
  setSelectedStore: (store: Store | null) => void;
}

const logoBase64 = 'data:image/png;base64,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';

export const Sidebar: React.FC<SidebarProps> = ({ setCurrentView, userRole, onLogout, stores, selectedStore, setSelectedStore }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { view: 'dashboard', label: 'Dashboard', icon: Home },
    { view: 'proposals', label: 'Propostas', icon: FileText },
    { view: 'sales', label: 'Vendas', icon: ShoppingCart },
    { view: 'clients', label: 'Clientes', icon: Users },
  ] as const;

  const adminItems = [
    { view: 'products', label: 'Produtos', icon: Package },
    { view: 'stores', label: 'Lojas', icon: Building2 },
  ] as const;

  const handleNavClick = (view: 'dashboard' | 'proposals' | 'sales' | 'clients' | 'products' | 'stores') => {
      setCurrentView(view);
      setMobileMenuOpen(false);
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
        className="flex items-center px-4 py-3 text-gray-300 hover:bg-yellow-600/20 hover:text-white rounded-md transition-colors"
      >
        <item.icon className="h-5 w-5 mr-3" />
        {item.label}
      </a>
    ));
  };
  
  const sidebarContent = (
      <div className="flex flex-col h-full bg-gray-900 text-gray-200">
        <div className="flex items-center justify-center h-24 border-b border-gray-700/50 px-4">
             <img src={logoBase64} alt="Relluarte Logo" className="h-auto w-full max-w-[180px] object-contain" />
        </div>
        
        { userRole === 'admin' && (
            <div className="p-4 border-b border-gray-700/50">
                <label htmlFor="store-selector" className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center mb-2">
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
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-yellow-500 focus:border-yellow-500"
                >
                    {stores.map(store => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                    ))}
                </select>
            </div>
        )}

        <nav className="flex-1 p-4 space-y-2">
            {renderNavLinks(navItems)}
            {userRole === 'admin' && (
                <>
                    <div className="pt-4 mt-4 border-t border-gray-700/50">
                        <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</h2>
                        <div className="mt-2 space-y-2">{renderNavLinks(adminItems)}</div>
                    </div>
                </>
            )}
        </nav>
        <div className="p-4 border-t border-gray-700/50">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onLogout();
                }}
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-yellow-600/20 hover:text-white rounded-md transition-colors"
            >
                <LogOut className="h-5 w-5 mr-3" />
                Sair
            </a>
        </div>
    </div>
  );

  return (
    <>
      <button className="lg:hidden p-4 fixed top-0 left-0 z-20 text-gray-300" onClick={() => setMobileMenuOpen(true)}>
        <Menu size={24} />
      </button>

      <div className={`fixed inset-0 z-30 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="relative w-72 bg-gray-900 h-full">
            <button className="absolute top-4 right-4 text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                <X size={24}/>
            </button>
            {sidebarContent}
        </div>
      </div>

      <div className="hidden lg:flex lg:w-72 lg:flex-shrink-0">
        <div className="flex flex-col w-72">
            {sidebarContent}
        </div>
      </div>
    </>
  );
};