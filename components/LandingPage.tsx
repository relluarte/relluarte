import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu, X, Phone, Mail, MapPin, User, MessageSquare, ChevronDown, Send } from 'lucide-react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="relative flex flex-col items-center">
        {/* Logo sem círculo */}
        <img
          src="/logo.png"
          alt="Relluarte"
          className="w-32 h-32 object-contain mb-8"
          style={{ filter: 'brightness(1.2) contrast(1.3)' }}
        />

        {/* Barra de progresso dourada */}
        <div className="w-80 h-3 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full"
               style={{
                 width: '100%',
                 animation: 'loading-bar 2.5s ease-in-out'
               }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

interface LandingPageProps {
  onAdminClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const handlePreloaderComplete = () => {
    setIsPreloaderVisible(false);
  };

  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const budgetRef = useRef<HTMLElement>(null);

  const heroSlides = [
    {
      image: '/hero-background.png',
      title: 'Transforme Seu Lar com Elegância',
      subtitle: 'Descubra cortinas personalizadas e acessórios de decoração que elevam o estilo da sua casa. Qualidade e sofisticação em cada detalhe.',
      buttonText: 'Peça seu Orçamento'
    },
    {
      image: '/hero-background2.png',
      title: 'Decoração que Inspira',
      subtitle: 'Crie ambientes únicos com nossas coleções exclusivas de cortinas e artigos para casa. Estilo e conforto para o seu dia a dia.',
      buttonText: 'Explore Nossos Produtos'
    },
    {
      image: '/hero-background3.png',
      title: 'Arte em Cada Detalhe',
      subtitle: 'Da concepção à instalação, cuidamos de cada aspecto para transformar seu espaço em um refúgio de beleza e funcionalidade.',
      buttonText: 'Fale Conosco'
    }
  ];

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#produtos', label: 'Produtos' },
    { href: '#sobre', label: 'Sobre Nós' },
    { href: '#contato', label: 'Contato' },
  ];

  const formInputClasses = "w-full p-3 bg-background-secondary border border-secondary rounded-md text-primary placeholder-muted focus:ring-accent focus:border-focus transition-colors";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (productsRef.current) observer.observe(productsRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (budgetRef.current) observer.observe(budgetRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {isPreloaderVisible && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="bg-primary text-primary font-sans">
      <Helmet>
        <title>Relluarte - A Arte de Decorar | Cortinas Sob Medida e Decoração</title>
        <meta name="description" content="Relluarte - Especialistas em cortinas sob medida, cortinas prontas e artigos para casa. Qualidade, elegância e sofisticação para transformar seu lar. Solicite seu orçamento!" />
        <meta name="keywords" content="cortinas sob medida, cortinas prontas, cama mesa banho, decoração, artigos para casa, São Paulo, Brás" />
        <link rel="canonical" href="https://relluarte.com.br/" />
        <meta property="og:title" content="Relluarte - A Arte de Decorar" />
        <meta property="og:description" content="Especialistas em cortinas sob medida, cortinas prontas e artigos para casa. Qualidade, elegância e sofisticação para transformar seu lar." />
        <meta property="og:image" content="https://relluarte.com.br/hero-image.jpg" />
        <meta property="og:url" content="https://relluarte.com.br/" />
        <meta name="twitter:title" content="Relluarte - A Arte de Decorar" />
        <meta name="twitter:description" content="Especialistas em cortinas sob medida, cortinas prontas e artigos para casa." />
        <meta name="twitter:image" content="https://relluarte.com.br/hero-image.jpg" />
      </Helmet>

      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-primary px-4 py-2 rounded z-50">
        Pular para conteúdo principal
      </a>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-secondary" style={{ backgroundColor: 'var(--color-primary)' }} role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <img src="/logo.png" alt="Relluarte - A Arte de Decorar" style={{ height: '150px', width: 'auto' }} />
            </div>
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navegação principal">
              {navLinks.map(link => (
                <button key={link.href} onClick={() => scrollToSection(link.href)} style={{ color: 'var(--color-text-primary)' }} className="hover:text-accent transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1" aria-describedby={`nav-${link.label.toLowerCase().replace(' ', '-')}`}>
                  {link.label}
                </button>
              ))}
               <button onClick={onAdminClick} style={{ color: 'var(--color-text-primary)' }} className="hover:text-accent transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1" aria-label="Entrar no painel administrativo">
                  Entrar no Admin
                </button>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: 'var(--color-text-primary)' }} className="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded p-1" aria-expanded={isMenuOpen} aria-controls="mobile-menu" aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden" style={{ backgroundColor: 'var(--color-primary)' }} id="mobile-menu" role="navigation" aria-label="Menu móvel">
            <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map(link => (
                 <button key={link.href} onClick={() => scrollToSection(link.href)} className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:bg-background-secondary w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary" style={{ color: 'var(--color-text-primary)' }}>
                  {link.label}
                </button>
              ))}
               <button onClick={onAdminClick} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-primary hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary" style={{ color: 'var(--color-text-primary)' }}>
                  Entrar no Admin
                </button>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section id="inicio" ref={heroRef} className={`pt-20 h-screen bg-cover bg-center flex items-center justify-center relative transition-all duration-1000 ${visibleSections.has('inicio') ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url('${heroSlides[currentHeroIndex].image}?v=1')` }} aria-labelledby="hero-title" role="banner">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
          <div className="text-center z-10 p-4 max-w-4xl mx-auto">
            <h1 id="hero-title" className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 transition-all duration-1000 text-gradient animate-fade-in-up">
              {heroSlides[currentHeroIndex].title}
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 transition-all duration-1000 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {heroSlides[currentHeroIndex].subtitle}
            </p>
            <button onClick={() => scrollToSection('#orcamento')} className="btn-primary text-xl px-8 py-4 animate-fade-in-up shadow-glow hover:shadow-premium text-white font-bold" style={{ animationDelay: '0.4s' }}>
              {heroSlides[currentHeroIndex].buttonText}
            </button>
            <div id="hero-button-desc" className="sr-only">Botão para solicitar orçamento de cortinas e decoração</div>
          </div>
          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3" role="tablist" aria-label="Slides do carrossel">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/50 hover:scale-125 ${
                  index === currentHeroIndex
                    ? 'bg-gradient-primary shadow-glow scale-110'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-selected={index === currentHeroIndex}
                role="tab"
                aria-label={`Slide ${index + 1} de ${heroSlides.length}`}
              />
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" ref={productsRef} className={`py-20 bg-background-pastel-1 transition-all duration-1000 ${visibleSections.has('produtos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} aria-labelledby="products-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="products-title" className="text-3xl font-bold text-center text-primary mb-12">Nossos Produtos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
              <article className="card-premium hover-lift animate-fade-in-up group" role="listitem" style={{ animationDelay: '0.1s' }}>
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img src="/prod1.jpg" alt="Cortinas Sob Medida - Criações exclusivas que se ajustam perfeitamente ao seu ambiente" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-gradient transition-all duration-300">Cortinas Sob Medida</h3>
                  <p className="text-secondary leading-relaxed">Criações exclusivas que se ajustam perfeitamente ao seu ambiente, com tecidos nobres e acabamento impecável.</p>
                </div>
              </article>
               <article className="card-premium hover-lift animate-fade-in-up group" role="listitem" style={{ animationDelay: '0.2s' }}>
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img src="/prod2.jpg" alt="Cortinas Prontas - Praticidade e estilo em modelos selecionados" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-gradient transition-all duration-300">Cortinas Prontas</h3>
                  <p className="text-secondary leading-relaxed">Praticidade e estilo em modelos selecionados que valorizam sua decoração de forma rápida e elegante.</p>
                </div>
              </article>
              <article className="card-premium hover-lift animate-fade-in-up group" role="listitem" style={{ animationDelay: '0.3s' }}>
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img src="/prod3.jpg" alt="Cama, Mesa e Banho - Coleções que combinam conforto e luxo" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-gradient transition-all duration-300">Cama, Mesa e Banho</h3>
                  <p className="text-secondary leading-relaxed">Coleções que combinam conforto e luxo para vestir sua casa com personalidade e bem-estar.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="sobre" ref={aboutRef} className={`py-20 bg-background-pastel-2 transition-all duration-1000 ${visibleSections.has('sobre') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-gradient">Sobre a Relluarte</h2>
                <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="glass-effect rounded-2xl p-8 shadow-premium">
                    <h3 className="text-2xl font-bold text-primary mb-4">Nossa História</h3>
                    <p className="text-secondary leading-relaxed text-lg">
                      Na Relluarte, acreditamos que a decoração é a arte de transformar casas em lares. Com anos de experiência e uma paixão por design, nos especializamos em criar cortinas sob medida e oferecer artigos de decoração que combinam qualidade, elegância e funcionalidade.
                    </p>
                  </div>
                  <div className="glass-effect rounded-2xl p-8 shadow-premium">
                    <h3 className="text-2xl font-bold text-primary mb-4">Nossa Missão</h3>
                    <p className="text-secondary leading-relaxed text-lg">
                      Nossa missão é entender a essência de cada cliente e traduzi-la em ambientes únicos e acolhedores. Cada peça é selecionada ou confeccionada com o máximo de cuidado, garantindo um resultado que não apenas decora, mas também inspira.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="glass-effect rounded-3xl p-2 shadow-glow">
                    <img src="/sobre.jpg" alt="Interior da loja Relluarte" className="rounded-2xl w-full h-auto object-cover hover:scale-105 transition-transform duration-700 shadow-premium" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-accent rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Budget Form Section */}
        <section id="orcamento" ref={budgetRef} className={`py-20 bg-background-pastel-3 transition-all duration-1000 ${visibleSections.has('orcamento') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} aria-labelledby="budget-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 id="budget-title" className="text-4xl md:text-5xl font-bold text-primary mb-6 text-gradient">Solicite um Orçamento</h2>
                <p className="text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
                    Preencha o formulário abaixo e nossa equipe de especialistas entrará em contato para criar a solução perfeita para você.
                </p>
                <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="glass-effect rounded-3xl p-2 shadow-glow">
                  <form action="#" method="POST" className="bg-white/95 backdrop-blur-sm rounded-2xl p-10 shadow-premium" aria-labelledby="budget-title">
                      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
                          <div className="sm:col-span-2">
                              <label htmlFor="full-name" className="block text-sm font-medium text-primary mb-2">Nome Completo</label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                                <input type="text" name="full-name" id="full-name" placeholder="Nome Completo" className="input-primary w-full text-lg pl-10" required aria-describedby="name-help" />
                              </div>
                              <div id="name-help" className="sr-only">Digite seu nome completo para identificação</div>
                          </div>
                          <div>
                               <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">Seu melhor e-mail</label>
                               <div className="relative">
                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                                 <input type="email" name="email" id="email" placeholder="Seu melhor e-mail" className="input-primary w-full text-lg pl-10" required aria-describedby="email-help" />
                               </div>
                               <div id="email-help" className="sr-only">Digite um e-mail válido para contato</div>
                          </div>
                          <div>
                               <label htmlFor="phone-number" className="block text-sm font-medium text-primary mb-2">Telefone / WhatsApp</label>
                               <div className="relative">
                                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                                 <input type="tel" name="phone-number" id="phone-number" placeholder="Telefone / WhatsApp" className="input-primary w-full text-lg pl-10" required aria-describedby="phone-help" />
                               </div>
                               <div id="phone-help" className="sr-only">Digite seu telefone ou WhatsApp para contato</div>
                          </div>
                           <div className="sm:col-span-2">
                              <label htmlFor="product-type" className="block text-sm font-medium text-primary mb-2">Tenho interesse em...</label>
                              <div className="relative">
                                <select id="product-type" name="product-type" className="input-primary w-full text-lg pr-10" required aria-describedby="product-help">
                                    <option value="">Tenho interesse em...</option>
                                    <option>Cortina Sob Medida</option>
                                    <option>Cortina Pronta</option>
                                    <option>Cama, Mesa e Banho</option>
                                    <option>Outros</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted pointer-events-none" size={20} />
                              </div>
                              <div id="product-help" className="sr-only">Selecione o tipo de produto de seu interesse</div>
                          </div>
                          <div className="sm:col-span-2">
                              <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">Descrição do projeto</label>
                              <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 text-muted" size={20} />
                                <textarea id="message" name="message" rows={5} placeholder="Descreva o que você precisa (ex: medidas, cores, tecidos)" className="input-primary w-full text-lg resize-none pl-10 pt-3" required aria-describedby="message-help"></textarea>
                              </div>
                              <div id="message-help" className="sr-only">Descreva detalhadamente seu projeto, incluindo medidas, cores e preferências</div>
                          </div>
                          <div className="sm:col-span-2 pt-4">
                              <button type="submit" className="btn-primary w-full text-xl py-4 px-8 shadow-glow hover:shadow-premium flex items-center justify-center gap-2">
                                <Send size={20} />
                                Enviar Solicitação
                              </button>
                              <div id="submit-help" className="sr-only">Clique para enviar sua solicitação de orçamento</div>
                          </div>
                      </div>
                  </form>
                </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact Info Section */}
      <section className="py-20 bg-background-pastel-1 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/hero-background.png')` }}></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-gradient">Entre em Contato</h2>
              <p className="text-xl text-white leading-relaxed max-w-2xl mx-auto">
                Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <MapPin size={24} className="text-secondary" />
                </div>
                <h4 className="font-semibold text-white mb-2">Localização</h4>
                <address className="text-white not-italic leading-relaxed">
                  Av. Celso Garcia, 131<br />
                  1º Andar - Brás<br />
                  São Paulo - SP
                </address>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Phone size={24} className="text-secondary" />
                </div>
                <h4 className="font-semibold text-white mb-2">Telefone</h4>
                <a href="tel:+55119990024115" className="text-white hover:text-accent transition-colors text-lg font-medium">
                  (11) 999002-4115
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Mail size={24} className="text-secondary" />
                </div>
                <h4 className="font-semibold text-white mb-2">E-mail</h4>
                <a href="mailto:contato@relluarte.com.br" className="text-white hover:text-accent transition-colors text-lg font-medium">
                  contato@relluarte.com.br
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="glass-effect border-t border-secondary/20 mt-20" role="contentinfo">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="border-t border-secondary/20 pt-8 text-center">
              <p className="text-secondary">&copy; {new Date().getFullYear()} Relluarte - A Arte de Decorar. Todos os direitos reservados.</p>
              <div className="mt-4 flex justify-center">
                <img src="/logo.png" alt="Relluarte - A Arte de Decorar" style={{ height: '120px', width: 'auto' }} className="hover:scale-105 transition-transform duration-300 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default LandingPage;