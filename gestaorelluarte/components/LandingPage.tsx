import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

interface LandingPageProps {
  onAdminClick: () => void;
}

const logoBase64 = 'data:image/png;base64,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';

const LandingPage: React.FC<LandingPageProps> = ({ onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#produtos', label: 'Produtos' },
    { href: '#sobre', label: 'Sobre Nós' },
    { href: '#contato', label: 'Contato' },
  ];
  
  const formInputClasses = "w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500 transition-colors";

  return (
    <div className="bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <img src={logoBase64} alt="Relluarte Logo" className="h-12 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-gray-300 hover:text-yellow-500 transition-colors font-medium">
                  {link.label}
                </a>
              ))}
               <button onClick={onAdminClick} className="text-gray-300 hover:text-yellow-500 transition-colors font-medium text-sm">
                  Entrar no Admin
                </button>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-yellow-500">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95">
            <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map(link => (
                 <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50">
                  {link.label}
                </a>
              ))}
               <button onClick={onAdminClick} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50">
                  Entrar no Admin
                </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="pt-20 h-screen bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="text-center z-10 p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
              A Arte de Decorar <span className="text-yellow-500">Seu Espaço</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Cortinas sob medida e artigos de decoração que transformam ambientes com elegância e sofisticação.
            </p>
            <a href="#orcamento" className="bg-yellow-600 text-gray-900 px-8 py-3 rounded-md hover:bg-yellow-500 transition-colors font-semibold text-lg">
              Solicite um Orçamento
            </a>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Nossos Produtos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <img src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cortinas Sob Medida" className="w-full h-64 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Cortinas Sob Medida</h3>
                  <p className="text-gray-400">Criações exclusivas que se ajustam perfeitamente ao seu ambiente, com tecidos nobres e acabamento impecável.</p>
                </div>
              </div>
               <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <img src="https://images.unsplash.com/photo-1615875995438-18579933564e?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cortinas Prontas" className="w-full h-64 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Cortinas Prontas</h3>
                  <p className="text-gray-400">Praticidade e estilo em modelos selecionados que valorizam sua decoração de forma rápida e elegante.</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <img src="https://images.unsplash.com/photo-1592329388734-6512b7a0d01a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cama, Mesa e Banho" className="w-full h-64 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Cama, Mesa e Banho</h3>
                  <p className="text-gray-400">Coleções que combinam conforto e luxo para vestir sua casa com personalidade e bem-estar.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Us Section */}
        <section id="sobre" className="py-20 bg-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Sobre a Relluarte</h2>
                <p className="text-gray-400 mb-4">
                  Na Relluarte, acreditamos que a decoração é a arte de transformar casas em lares. Com anos de experiência e uma paixão por design, nos especializamos em criar cortinas sob medida e oferecer artigos de decoração que combinam qualidade, elegância e funcionalidade.
                </p>
                <p className="text-gray-400">
                  Nossa missão é entender a essência de cada cliente e traduzi-la em ambientes únicos e acolhedores. Cada peça é selecionada ou confeccionada com o máximo de cuidado, garantindo um resultado que não apenas decora, mas também inspira.
                </p>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1540998145393-8c437b640026?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Interior da loja Relluarte" className="rounded-lg shadow-lg w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Budget Form Section */}
        <section id="orcamento" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white">Solicite um Orçamento sem Compromisso</h2>
                <p className="mt-4 text-lg text-gray-400">
                    Preencha o formulário abaixo e nossa equipe de especialistas entrará em contato para criar a solução perfeita para você.
                </p>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
                <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div className="sm:col-span-2">
                        <input type="text" name="full-name" id="full-name" placeholder="Nome Completo" className={formInputClasses} />
                    </div>
                    <div>
                         <input type="email" name="email" id="email" placeholder="Seu melhor e-mail" className={formInputClasses} />
                    </div>
                    <div>
                         <input type="tel" name="phone-number" id="phone-number" placeholder="Telefone / WhatsApp" className={formInputClasses} />
                    </div>
                     <div className="sm:col-span-2">
                        <select id="product-type" name="product-type" className={formInputClasses}>
                            <option>Tenho interesse em...</option>
                            <option>Cortina Sob Medida</option>
                            <option>Cortina Pronta</option>
                            <option>Cama, Mesa e Banho</option>
                            <option>Outros</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <textarea id="message" name="message" rows={4} placeholder="Descreva o que você precisa (ex: medidas, cores, tecidos)" className={formInputClasses}></textarea>
                    </div>
                    <div className="sm:col-span-2">
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-gray-900 bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-gray-900 transition-colors">
                            Enviar Solicitação
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contato" className="bg-gray-800/50 border-t border-gray-700/50">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <img src={logoBase64} alt="Relluarte Logo" className="h-12 w-auto mx-auto mb-6" />
             <div className="flex justify-center items-center space-x-6 text-gray-400 mb-6 flex-wrap">
                <div className="flex items-center m-2">
                    <MapPin size={16} className="mr-2 text-yellow-500"/>
                    <span>Endereço da Loja, 123 - Cidade/UF</span>
                </div>
                <div className="flex items-center m-2">
                    <Phone size={16} className="mr-2 text-yellow-500"/>
                    <span>(11) 99999-8888</span>
                </div>
                 <div className="flex items-center m-2">
                    <Mail size={16} className="mr-2 text-yellow-500"/>
                    <span>contato@relluarte.com.br</span>
                </div>
            </div>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Relluarte - A Arte de Decorar. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;