import { Client, Product, Proposal, ProposalStatus, ProductCategory, Store } from './types';

export const MOCK_STORES: Store[] = [
    { id: 1, name: 'Relluarte Matriz', cnpj: '11.111.111/0001-11' },
    { id: 2, name: 'Relluarte Filial Centro', cnpj: '22.222.222/0001-22' },
    { id: 3, name: 'Relluarte Filial Praia', cnpj: '33.333.333/0001-33' },
];

export const MOCK_CLIENTS: Client[] = [
  { id: 1, name: 'Ana Silva', email: 'ana.silva@example.com', phone: '(11) 98765-4321' },
  { id: 2, name: 'Bruno Costa', email: 'bruno.costa@example.com', phone: '(21) 91234-5678' },
  { id: 3, name: 'Carla Dias', email: 'carla.dias@example.com', phone: '(31) 95555-8888' },
  { id: 4, name: 'Daniel Rocha', email: 'daniel.rocha@example.com', phone: '(41) 94444-7777' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Cortina de Linho com Voil', category: ProductCategory.CustomCurtain, unitPrice: 150.00 },
  { id: 2, name: 'Cortina Blackout', category: ProductCategory.CustomCurtain, unitPrice: 120.00 },
  { id: 3, name: 'Cortina Pronta Sala 3.00x2.50m', category: ProductCategory.ReadyMadeCurtain, unitPrice: 299.90 },
  { id: 4, name: 'Jogo de Cama Queen 400 Fios', category: ProductCategory.HomeGoods, unitPrice: 450.00 },
  { id: 5, name: 'Kit Toalhas de Banho Gigante', category: ProductCategory.HomeGoods, unitPrice: 189.90 },
];

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'PROP-001',
    client: MOCK_CLIENTS[0],
    items: [
      { id: 'item-1', product: MOCK_PRODUCTS[0], quantity: 1, width: 3.5, height: 2.6, total: 1365 },
      { id: 'item-2', product: MOCK_PRODUCTS[3], quantity: 2, total: 900 },
    ],
    status: ProposalStatus.Approved,
    createdAt: '2023-10-15',
    total: 2265.00,
    description: 'Proposta para sala de estar e quarto principal. Cortina de linho para um ambiente aconchegante e jogo de cama de alta qualidade para conforto.',
    storeId: 1,
  },
  {
    id: 'PROP-002',
    client: MOCK_CLIENTS[1],
    items: [
      { id: 'item-3', product: MOCK_PRODUCTS[1], quantity: 2, width: 2.8, height: 2.4, total: 1612.80 },
    ],
    status: ProposalStatus.Sent,
    createdAt: '2023-10-20',
    total: 1612.80,
    description: 'Proposta para dois quartos, focada em controle de luminosidade com cortinas blackout.',
    storeId: 2,
    followUp: { date: '2023-10-28', notes: 'Ligar para Bruno para confirmar se ele tem alguma dúvida sobre o material blackout.' },
  },
  {
    id: 'PROP-003',
    client: MOCK_CLIENTS[2],
    items: [
      { id: 'item-4', product: MOCK_PRODUCTS[4], quantity: 3, total: 569.70 },
      { id: 'item-5', product: MOCK_PRODUCTS[2], quantity: 1, total: 299.90 },
    ],
    status: ProposalStatus.Draft,
    createdAt: '2023-10-22',
    total: 869.60,
    description: 'Proposta inicial para renovação de enxoval e cortina para sala.',
    storeId: 1,
  },
    {
    id: 'PROP-004',
    client: MOCK_CLIENTS[3],
    items: [
      { id: 'item-6', product: MOCK_PRODUCTS[0], quantity: 1, width: 5, height: 2.8, total: 2100 },
    ],
    status: ProposalStatus.Approved,
    createdAt: '2023-11-05',
    total: 2100.00,
    description: 'Cortina de linho para sala de pé-direito duplo.',
    storeId: 3,
  },
];