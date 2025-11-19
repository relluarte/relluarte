import React, { useState, useEffect, useCallback } from 'react';
import { Proposal, Client, Product, ProposalItem, ProposalStatus, ProductCategory, Store } from '../types';
import { MOCK_CLIENTS } from '../constants';
import { generateProposalDescription } from '../services/geminiService';
import { Trash2, Plus, Wand2, ArrowLeft, LoaderCircle } from 'lucide-react';

interface ProposalFormProps {
  proposal?: Proposal | null;
  onBack: () => void;
  products: Product[];
  storeId: number;
  onSaveProposal: (proposal: Proposal) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ proposal, onBack, products, storeId, onSaveProposal }) => {
  const [selectedClientId, setSelectedClientId] = useState<number | ''>('');
  const [items, setItems] = useState<ProposalItem[]>([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProposalStatus>(ProposalStatus.Draft);
  const [total, setTotal] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (proposal) {
      setSelectedClientId(proposal.client.id);
      setItems(proposal.items);
      setDescription(proposal.description || '');
      setStatus(proposal.status);
    }
  }, [proposal]);

  const calculateTotal = useCallback(() => {
    const newTotal = items.reduce((sum, item) => sum + item.total, 0);
    setTotal(newTotal);
  }, [items]);

  useEffect(() => {
    calculateTotal();
  }, [items, calculateTotal]);

  const handleAddItem = () => {
    if (products.length === 0) {
      alert("Nenhum produto no catálogo. Adicione produtos primeiro.");
      return;
    }
    const firstProduct = products[0];
    setItems([
      ...items,
      {
        id: `new-${Date.now()}`,
        product: firstProduct,
        quantity: 1,
        total: firstProduct.unitPrice,
      },
    ]);
  };

  const handleItemChange = (index: number, field: keyof ProposalItem, value: any) => {
    const newItems = [...items];
    const item = { ...newItems[index] };
    
    (item as any)[field] = value;

    if (field === 'product') {
      const selectedProduct = products.find(p => p.id === Number(value));
      if (selectedProduct) {
        item.product = selectedProduct;
        if (item.product.category !== ProductCategory.CustomCurtain) {
            delete item.width;
            delete item.height;
        } else {
             item.width = item.width || 0;
             item.height = item.height || 0;
        }
      }
    }
    
    let itemTotal = 0;
    if (item.product.category === ProductCategory.CustomCurtain) {
      itemTotal = (item.width || 0) * (item.height || 0) * item.product.unitPrice * (item.quantity || 1);
    } else {
      itemTotal = item.product.unitPrice * (item.quantity || 1);
    }
    item.total = itemTotal;
    
    newItems[index] = item;
    setItems(newItems);
  };
  
  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const handleGenerateDescription = async () => {
    if(items.length === 0) {
        alert("Adicione pelo menos um item à proposta.");
        return;
    }
    setIsGenerating(true);
    const generatedDesc = await generateProposalDescription(items);
    setDescription(generatedDesc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = MOCK_CLIENTS.find(c => c.id === selectedClientId);
    if (!client) {
      alert('Por favor, selecione um cliente.');
      return;
    }

    const newProposal: Proposal = {
      id: proposal?.id || `PROP-${String(Date.now()).slice(-4)}`,
      client,
      items,
      description,
      status,
      total,
      storeId,
      createdAt: proposal?.createdAt || new Date().toISOString().split('T')[0],
    };
    
    onSaveProposal(newProposal);
    alert(`Proposta ${proposal ? 'atualizada' : 'salva'} com sucesso!`);
    onBack();
  };
  
  const formInputClasses = "w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-yellow-500 focus:border-yellow-500";


  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-700">
      <button onClick={onBack} className="flex items-center text-gray-300 hover:text-yellow-500 mb-4 transition-colors">
        <ArrowLeft size={18} className="mr-2" />
        Voltar para a Lista
      </button>
      <h1 className="text-3xl font-bold text-white mb-6">{proposal ? 'Editar' : 'Nova'} Proposta</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Cliente</label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(Number(e.target.value))}
              className={formInputClasses}
              required
            >
              <option value="" disabled>Selecione um cliente</option>
              {MOCK_CLIENTS.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProposalStatus)}
              className={formInputClasses}
            >
              {Object.values(ProposalStatus).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-4 border-t border-gray-700 pt-4">Itens da Proposta</h2>
        <div className="space-y-4 mb-4">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end p-3 bg-gray-900/50 rounded-md border border-gray-700">
              <div className="md:col-span-4">
                <label className="text-xs font-medium text-gray-400">Produto</label>
                <select
                  value={item.product.id}
                  onChange={(e) => handleItemChange(index, 'product', Number(e.target.value))}
                  className={formInputClasses}
                >
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              {item.product.category === ProductCategory.CustomCurtain && (
                <>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-400">Largura (m)</label>
                    <input
                      type="number" step="0.01" placeholder="Ex: 3.5" value={item.width || ''}
                      onChange={(e) => handleItemChange(index, 'width', parseFloat(e.target.value))}
                      className={formInputClasses} required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-400">Altura (m)</label>
                    <input
                      type="number" step="0.01" placeholder="Ex: 2.6" value={item.height || ''}
                      onChange={(e) => handleItemChange(index, 'height', parseFloat(e.target.value))}
                      className={formInputClasses} required
                    />
                  </div>
                </>
              )}

              <div className="md:col-span-1">
                <label className="text-xs font-medium text-gray-400">Qtd.</label>
                <input
                  type="number" min="1" value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10))}
                  className={formInputClasses}
                />
              </div>

              <div className="md:col-span-2 text-right">
                <label className="text-xs font-medium text-gray-400 block">Total do Item</label>
                <span className="font-bold text-lg text-white">{item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              
              <div className="md:col-span-1 flex justify-end items-center">
                 <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-400 p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button type="button" onClick={handleAddItem} className="flex items-center text-yellow-500 hover:text-yellow-400 font-semibold transition-colors">
          <Plus size={18} className="mr-1" /> Adicionar Item
        </button>

        <div className="mt-6 border-t border-gray-700 pt-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Descrição da Proposta</label>
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                className={formInputClasses}
                placeholder="Descreva os detalhes da proposta aqui..."
            ></textarea>
            <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="mt-2 flex items-center text-sm bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-md hover:bg-purple-500/30 transition-colors disabled:opacity-50"
            >
                {isGenerating ? ( <> <LoaderCircle size={16} className="mr-2 animate-spin" /> Gerando... </> ) 
                : ( <> <Wand2 size={16} className="mr-2" /> Gerar com IA </> )}
            </button>
        </div>

        <div className="mt-8 flex justify-between items-center border-t border-gray-700 pt-4">
            <div>
                <span className="text-lg font-medium text-gray-400">Total da Proposta:</span>
                <span className="text-3xl font-bold text-white ml-4">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 font-semibold transition-colors text-lg"
            >
              Salvar Proposta
            </button>
        </div>
      </form>
    </div>
  );
};

export default ProposalForm;