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
    <div className="card-primary">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-admin-primary">Catálogo de Produtos</h1>
        <button
          onClick={onNewProduct}
          className="btn-primary"
        >
          <PlusCircle size={20} className="mr-2" />
          Adicionar Produto
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background-secondary/50">
            <tr>
              <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">Nome</th>
              <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">Categoria</th>
              <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">Preço Unitário</th>
              <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-secondary/20 hover:bg-background-secondary/30 transition-colors">
                <td className="p-4 font-medium text-admin-primary">{product.name}</td>
                <td className="p-4 text-secondary">{product.category}</td>
                <td className="p-4 text-admin-primary">{product.unitPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  {product.category === ProductCategory.CustomCurtain && <span className="text-xs text-muted ml-1">/ m²</span>}
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center space-x-2">
                    <button onClick={() => onEditProduct(product)} className="p-2 text-secondary hover:text-accent rounded-full hover:bg-background-secondary/50 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDeleteProduct(product.id)} className="p-2 text-secondary hover:text-red-400 rounded-full hover:bg-red-500/10 transition-colors">
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