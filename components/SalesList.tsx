import React from 'react';

const SalesList: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-admin-primary">Vendas</h1>
      <div className="card-primary">
        <p className="text-secondary">Lista de vendas será implementada em breve.</p>
        <p className="mt-4 text-admin-primary font-medium">Funcionalidades planejadas:</p>
        <ul className="list-disc list-inside mt-2 text-secondary space-y-1">
          <li>Visualizar vendas por período</li>
          <li>Relatórios de desempenho</li>
          <li>Análise de tendências</li>
        </ul>
      </div>
    </div>
  );
};

export default SalesList;