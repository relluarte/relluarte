import React, { useState, useEffect } from 'react';
import { Store } from '../types';
import { ArrowLeft, Save } from 'lucide-react';

interface StoreFormProps {
  store?: Store | null;
  onSave: (store: Omit<Store, 'id'> & { id?: number }) => void;
  onBack: () => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ store, onSave, onBack }) => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');

  useEffect(() => {
    if (store) {
      setName(store.name);
      setCnpj(store.cnpj);
    }
  }, [store]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cnpj) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onSave({
      id: store?.id,
      name,
      cnpj,
    });
  };

  const formInputClasses = "w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-yellow-500 focus:border-yellow-500";

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-700">
      <button onClick={onBack} className="flex items-center text-gray-300 hover:text-yellow-500 mb-4 transition-colors">
        <ArrowLeft size={18} className="mr-2" />
        Voltar para a Lista de Lojas
      </button>
      <h1 className="text-3xl font-bold text-white mb-6">{store ? 'Editar' : 'Nova'} Loja</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nome da Loja</label>
            <input
              type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
              className={formInputClasses} required placeholder="Ex: Relluarte Matriz"
            />
          </div>
          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-400 mb-1">CNPJ</label>
            <input
              type="text" id="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)}
              className={formInputClasses} required placeholder="00.000.000/0001-00"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-500 font-semibold transition-colors text-base"
            >
              <Save size={18} className="mr-2" />
              Salvar Loja
            </button>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;