import React from 'react';
import { Store } from '../types';
import { PlusCircle, Edit, Trash2, Building2 } from 'lucide-react';

interface StoreListProps {
  stores: Store[];
  onNewStore: () => void;
  onEditStore: (store: Store) => void;
  onDeleteStore: (storeId: number) => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onNewStore, onEditStore, onDeleteStore }) => {
  return (
    <div className="card-primary">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-admin-primary flex items-center"><Building2 className="mr-3 text-secondary"/> Gestão de Lojas</h1>
        <button
          onClick={onNewStore}
          className="btn-primary"
        >
          <PlusCircle size={20} className="mr-2" />
          Adicionar Loja
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background-secondary/50">
            <tr>
              <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">Nome da Loja</th>
              <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">CNPJ</th>
              <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="border-b border-secondary/20 hover:bg-background-secondary/30 transition-colors">
                <td className="p-4 font-medium text-admin-primary">{store.name}</td>
                <td className="p-4 text-secondary">{store.cnpj}</td>
                <td className="p-4">
                  <div className="flex justify-center items-center space-x-2">
                    <button onClick={() => onEditStore(store)} className="p-2 text-secondary hover:text-accent rounded-full hover:bg-background-secondary/50 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDeleteStore(store.id)} className="p-2 text-secondary hover:text-red-400 rounded-full hover:bg-red-500/10 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreList;