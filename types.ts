export type UserRole = 'admin' | 'vendedor';

export enum ProposalStatus {
  Draft = 'Rascunho',
  Sent = 'Enviada',
  Approved = 'Aprovada',
  Rejected = 'Rejeitada',
}

export enum ProductCategory {
    CustomCurtain = 'Cortina Sob Medida',
    ReadyMadeCurtain = 'Cortina Pronta',
    HomeGoods = 'Cama, Mesa e Banho'
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  unitPrice: number; // For custom, this is price per sq meter. For others, per unit.
}

export interface ProposalItem {
  id: string; // unique id for the line item
  product: Product;
  quantity: number;
  width?: number; // in meters, for custom curtains
  height?: number; // in meters, for custom curtains
  total: number;
}

export interface Proposal {
  id: string;
  client: Client;
  items: ProposalItem[];
  status: ProposalStatus;
  createdAt: string;
  total: number;
  description?: string;
  storeId: number;
  followUp?: {
    date: string;
    notes: string;
  };
}

export interface Store {
    id: number;
    name: string;
    cnpj: string;
}