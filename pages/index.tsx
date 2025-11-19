import React from 'react';
import dynamic from 'next/dynamic';

// Importação dinâmica para evitar problemas com Helmet e SSR
const LandingPage = dynamic(() => import('../components/LandingPage'), { ssr: false });

export default function Home() {
  // Função dummy para onAdminClick
  const handleAdminClick = () => {
    // Redirecionar ou abrir modal de admin futuramente
    alert('Admin: funcionalidade em desenvolvimento!');
  };

  return <LandingPage onAdminClick={handleAdminClick} />;
}
