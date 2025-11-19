import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../types';
import { ArrowLeft, Save } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Omit<Product, 'id'> & { id?: number }) => void;
  onBack: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onBack }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.CustomCurtain);
  const [unitPrice, setUnitPrice] = useState<number | ''>('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setUnitPrice(product.unitPrice);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || unitPrice === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onSave({
      id: product?.id,
      name,
      category,
      unitPrice: Number(unitPrice),
    });
  };
  
  const getPriceLabel = () => {
      switch(category) {
          case ProductCategory.CustomCurtain:
              return 'Preço por m² (R$)';
          default:
              return 'Preço Unitário (R$)';
      }
  }

  const formInputClasses = "w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-yellow-500 focus:border-yellow-500";

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-700">
      <button onClick={onBack} className="flex items-center text-gray-300 hover:text-yellow-500 mb-4 transition-colors">
        <ArrowLeft size={18} className="mr-2" />
        Voltar para a Lista de Produtos
      </button>
      <h1 className="text-3xl font-bold text-white mb-6">{product ? 'Editar' : 'Novo'} Produto</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nome do Produto</label>
            <input
              type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
              className={formInputClasses} required placeholder="Ex: Cortina de Seda Pura"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Categoria</label>
            <select
              id="category" value={category} onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className={formInputClasses}
            >
              {Object.values(ProductCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-400 mb-1">{getPriceLabel()}</label>
            <input
              type="number" id="unitPrice" step="0.01" min="0" value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className={formInputClasses} required placeholder="Ex: 199.90"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-500 font-semibold transition-colors text-base"
            >
              <Save size={18} className="mr-2" />
              Salvar Produto
            </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;