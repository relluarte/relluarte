import React from 'react';
import { Product, ProductCategory } from '../types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onNewProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onNewProduct, onEditProduct, onDeleteProduct }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Catálogo de Produtos</h1>
        <button
          onClick={onNewProduct}
          className="flex items-center bg-yellow-600 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors font-semibold"
        >
          <PlusCircle size={20} className="mr-2" />
          Adicionar Produto
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Nome</th>
              <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Categoria</th>
              <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Preço Unitário</th>
              <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="p-4 font-medium text-gray-200">{product.name}</td>
                <td className="p-4 text-gray-300">{product.category}</td>
                <td className="p-4 text-gray-200">{product.unitPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  {product.category === ProductCategory.CustomCurtain && <span className="text-xs text-gray-500 ml-1">/ m²</span>}
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center space-x-2">
                    <button onClick={() => onEditProduct(product)} className="p-2 text-gray-400 hover:text-yellow-500 rounded-full hover:bg-gray-600 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDeleteProduct(product.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-600 transition-colors">
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

export default ProductList;