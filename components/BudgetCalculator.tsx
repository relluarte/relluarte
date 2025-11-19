import React, { useState } from 'react';
import { Product } from '../types';

interface BudgetCalculatorProps {
  products: Product[];
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    if (!selectedProduct || !width || !height) return;

    const w = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h)) return;

    // Simple calculation: base price + area * rate
    const area = w * h;
    const price = selectedProduct.price + (area * 10); // Example rate
    setCalculatedPrice(price * quantity);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-admin-primary">Calculadora de Orçamentos</h1>
      
      <div className="max-w-md mx-auto card-primary">
        <div className="mb-4">
          <label className="block text-sm font-medium text-admin-primary mb-2">Produto</label>
          <select
            value={selectedProduct?.id || ''}
            onChange={(e) => {
              const prod = products.find(p => p.id === parseInt(e.target.value));
              setSelectedProduct(prod || null);
            }}
            className="input-primary w-full"
          >
            <option value="">Selecione um produto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-admin-primary mb-2">Largura (m)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="input-primary w-full"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-primary mb-2">Altura (m)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-primary w-full"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-admin-primary mb-2">Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="input-primary w-full"
            min="1"
          />
        </div>

        <button
          onClick={calculatePrice}
          className="btn-primary w-full mb-4"
        >
          Calcular Orçamento
        </button>

        {calculatedPrice !== null && (
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-lg font-semibold text-admin-primary">Orçamento Estimado:</p>
            <p className="text-2xl font-bold text-accent">R$ {calculatedPrice.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;