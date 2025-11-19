import React, { useState, useCallback, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Sidebar } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProposalsList from './components/ProposalsList';
import ProposalForm from './components/ProposalForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Login } from './components/Login';
import { Proposal, Product, UserRole, Store, Client } from './types';
import { MOCK_PRODUCTS, MOCK_STORES, MOCK_PROPOSALS, MOCK_CLIENTS } from './constants';
import StoreList from './components/StoreList';
import StoreForm from './components/StoreForm';
import LandingPage from './components/LandingPage';
import BudgetCalculator from './components/BudgetCalculator';
import SalesList from './components/SalesList';
import ClientsList from './components/ClientsList';
import ErrorBoundary from './components/ErrorBoundary';

type View = 'dashboard' | 'proposals' | 'sales' | 'clients' | 'products' | 'stores' | 'new_proposal' | 'edit_proposal' | 'new_product' | 'edit_product' | 'new_store' | 'edit_store' | 'calculator';
type AppState = 'landing' | 'login' | 'crm';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [clients] = useState<Client[]>(MOCK_CLIENTS);
  
  const [stores, setStores] = useState<Store[]>(MOCK_STORES);
  const [selectedStore, setSelectedStore] = useState<Store | null>(MOCK_STORES[0] || null);
  const [selectedStoreForEdit, setSelectedStoreForEdit] = useState<Store | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleLogin = (role: UserRole) => {
    setUser({ role });
    if (role === 'admin' && stores.length > 0) {
        setSelectedStore(stores[0]);
    } else if (role === 'vendedor' && stores.length > 0) {
        setSelectedStore(stores[0]);
    }
    setAppState('crm');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedStore(null);
    setCurrentView('dashboard');
    setAppState('landing');
  };
  
  const handleSaveStore = (storeToSave: Omit<Store, 'id'> & { id?: number }) => {
    setStores(prevStores => {
        if (storeToSave.id) {
            return prevStores.map(s => s.id === storeToSave.id ? { ...s, ...storeToSave } as Store : s);
        } else {
            const newId = prevStores.length > 0 ? Math.max(...prevStores.map(s => s.id)) + 1 : 1;
            const newStore: Store = { ...storeToSave, id: newId };
            return [...prevStores, newStore];
        }
    });
    setCurrentView('stores');
  };

  const handleDeleteStore = (storeId: number) => {
      if (stores.length <= 1) {
          alert("Não é possível excluir a única loja restante.");
          return;
      }
      if (window.confirm('Tem certeza que deseja excluir esta loja?')) {
          setStores(prev => prev.filter(s => s.id !== storeId));
          if(selectedStore?.id === storeId) {
              setSelectedStore(stores.find(s => s.id !== storeId) || null);
          }
      }
  };

  const handleEditStore = useCallback((store: Store) => {
    setSelectedStoreForEdit(store);
    setCurrentView('edit_store');
  }, []);

  const handleEditProposal = useCallback((proposal: Proposal) => {
    setSelectedProposal(proposal);
    setCurrentView('edit_proposal');
  }, []);
  
  const handleEditProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentView('edit_product');
  }, []);

  const handleSaveProduct = (productToSave: Omit<Product, 'id'> & { id?: number }) => {
    setProducts(prevProducts => {
      if (productToSave.id) {
        return prevProducts.map(p => p.id === productToSave.id ? { ...p, ...productToSave } as Product : p);
      } else {
        const newId = prevProducts.length > 0 ? Math.max(...prevProducts.map(p => p.id)) + 1 : 1;
        return [...prevProducts, { ...productToSave, id: newId }];
      }
    });
    setCurrentView('products');
  };
  
  const handleDeleteProduct = (productId: number) => {
      if (window.confirm('Tem certeza que deseja excluir este produto?')) {
          setProducts(prev => prev.filter(p => p.id !== productId));
      }
  };
  
  const handleDeleteProposal = (proposalId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta proposta?')) {
        setProposals(prev => prev.filter(p => p.id !== proposalId));
    }
  };
  
  const handleUpdateFollowUp = (proposalId: string, followUp: { date: string; notes: string; } | null) => {
      setProposals(prevProposals => 
          prevProposals.map(p => 
              p.id === proposalId ? { ...p, followUp: followUp || undefined } : p
          )
      );
  };

  const filteredProposals = useMemo(() => {
    return proposals.filter(p => p.storeId === selectedStore?.id);
  }, [proposals, selectedStore]);


  const renderCrmContent = () => {
    if (!selectedStore && user) {
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Nenhuma loja selecionada</h1><p>Por favor, selecione uma loja para começar.</p></div>;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard proposals={filteredProposals} clients={clients} products={products} userRole={user.role} />;
      case 'proposals':
        return <ProposalsList proposals={filteredProposals} onNewProposal={() => setCurrentView('new_proposal')} onEditProposal={handleEditProposal} onDeleteProposal={handleDeleteProposal} onUpdateFollowUp={handleUpdateFollowUp} />;
      case 'new_proposal':
        return <ProposalForm onBack={() => setCurrentView('proposals')} products={products} storeId={selectedStore!.id} onSaveProposal={(p) => setProposals(prev => [...prev, p])}/>;
      case 'edit_proposal':
        return <ProposalForm proposal={selectedProposal} onBack={() => setCurrentView('proposals')} products={products} storeId={selectedStore!.id} onSaveProposal={(p) => setProposals(prev => prev.map(pr => pr.id === p.id ? p : pr))} />;
      case 'products':
        if (user?.role !== 'admin') return <div className="p-8"><h1 className="text-2xl font-bold">Acesso Negado</h1></div>;
        return <ProductList products={products} onNewProduct={() => setCurrentView('new_product')} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} />;
      case 'new_product':
        if (user?.role !== 'admin') return <div className="p-8"><h1 className="text-2xl font-bold">Acesso Negado</h1></div>;
        return <ProductForm onSave={handleSaveProduct} onBack={() => setCurrentView('products')} />;
      case 'edit_product':
        if (user?.role !== 'admin') return <div className="p-8"><h1 className="text-2xl font-bold">Acesso Negado</h1></div>;
        return <ProductForm product={selectedProduct} onSave={handleSaveProduct} onBack={() => setCurrentView('products')} />;
      case 'stores':
        if (user?.role !== 'admin') return <div className="p-8"><h1 className="text-2xl font-bold">Acesso Negado</h1></div>;
        return <StoreList stores={stores} onNewStore={() => setCurrentView('new_store')} onEditStore={handleEditStore} onDeleteStore={handleDeleteStore} />;
      case 'new_store':
        if (user?.role !== 'admin') return <div className="p-8"><h1 className="text-2xl font-bold">Acesso Negado</h1></div>;
        return <StoreForm onSave={handleSaveStore} onBack={() => setCurrentView('stores')} />;
      case 'edit_store':
        if (user?.role !== 'admin') return <div className="p-8"><h1 className="text-2xl font-bold">Acesso Negado</h1></div>;
        return <StoreForm store={selectedStoreForEdit} onSave={handleSaveStore} onBack={() => setCurrentView('stores')} />;
      case 'sales':
        return <SalesList />;
      case 'clients':
        return <ClientsList clients={clients} />;
      case 'calculator':
        return <BudgetCalculator products={products} />;
    }
  };

  switch (appState) {
    case 'landing':
      return <LandingPage onAdminClick={() => setAppState('login')} />;
    case 'login':
      return <Login onLogin={handleLogin} onBack={() => setAppState('landing')} />;
    case 'crm':
      if (!user) {
        // Should not happen, but as a fallback
        setAppState('login');
        return null;
      }
      return (
        <div className="bg-primary text-primary font-sans">
          <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-secondary" style={{ backgroundColor: 'var(--color-primary)' }} role="banner">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center space-x-4">
                  <img src="/logo.png" alt="Relluarte - A Arte de Decorar" style={{ height: '150px', width: 'auto' }} />
                </div>

                <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navegação administrativa">
                  <span className="text-primary font-medium">Painel Administrativo</span>
                </nav>

                {/* Menu Button - Right Side */}
                <button 
                  className="lg:hidden bg-secondary/90 backdrop-blur-sm text-primary p-3 rounded-lg shadow-lg border border-secondary/20 hover:bg-accent-light hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Abrir menu de navegação"
                  aria-expanded={isMobileMenuOpen}
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center space-y-1">
                    <div className="w-4 h-0.5 bg-current transition-all duration-200"></div>
                    <div className="w-4 h-0.5 bg-current transition-all duration-200"></div>
                    <div className="w-4 h-0.5 bg-current transition-all duration-200"></div>
                  </div>
                </button>
              </div>
            </div>
          </header>
          <div className="flex h-screen bg-admin-background text-admin-primary pt-20">
            <Sidebar 
              setCurrentView={setCurrentView} 
              userRole={user.role} 
              stores={stores}
              selectedStore={selectedStore}
              setSelectedStore={setSelectedStore}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              onLogout={handleLogout}
            />
            <main className="flex-1 overflow-y-auto bg-admin-background-tertiary">
              <div className="p-4 sm:p-6 lg:p-8">
                {renderCrmContent()}
              </div>
            </main>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const AppWithHelmet: React.FC = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </HelmetProvider>
);

export default AppWithHelmet;