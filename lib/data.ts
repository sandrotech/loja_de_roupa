// Dados simulados para o sistema Bellavie Hub

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  color: string;
  size: string;
  price: number;
  stockJangurussu: number;
  stockLCavalcante: number;
  image?: string;
}

export interface Movement {
  id: string;
  type: 'transfer' | 'sale' | 'entry';
  user: string;
  userAvatar?: string;
  description: string;
  timestamp: Date;
  quantity: number;
  productName: string;
}

export const products: Product[] = [
  { id: '1', code: 'BLU001', name: 'Blusa Elise', category: 'Blusas', color: 'Rosa', size: 'P', price: 89.90, stockJangurussu: 5, stockLCavalcante: 3 },
  { id: '2', code: 'BLU002', name: 'Blusa Valentina', category: 'Blusas', color: 'Branco', size: 'M', price: 99.90, stockJangurussu: 2, stockLCavalcante: 0 },
  { id: '3', code: 'VES001', name: 'Vestido Luna', category: 'Vestidos', color: 'Preto', size: 'G', price: 189.90, stockJangurussu: 0, stockLCavalcante: 0 },
  { id: '4', code: 'CAL001', name: 'Calça Slim Fit', category: 'Calças', color: 'Azul', size: 'M', price: 149.90, stockJangurussu: 8, stockLCavalcante: 6 },
  { id: '5', code: 'SAI001', name: 'Saia Midi Flora', category: 'Saias', color: 'Estampado', size: 'P', price: 119.90, stockJangurussu: 3, stockLCavalcante: 1 },
  { id: '6', code: 'BLU003', name: 'Cropped Summer', category: 'Blusas', color: 'Amarelo', size: 'P', price: 69.90, stockJangurussu: 12, stockLCavalcante: 8 },
  { id: '7', code: 'VES002', name: 'Vestido Floral', category: 'Vestidos', color: 'Estampado', size: 'M', price: 219.90, stockJangurussu: 1, stockLCavalcante: 2 },
  { id: '8', code: 'MAC001', name: 'Macacão Jeans', category: 'Macacões', color: 'Azul', size: 'G', price: 259.90, stockJangurussu: 4, stockLCavalcante: 3 },
  { id: '9', code: 'SHO001', name: 'Short Jeans', category: 'Shorts', color: 'Azul', size: 'P', price: 89.90, stockJangurussu: 0, stockLCavalcante: 2 },
  { id: '10', code: 'BLU004', name: 'Camisa Social', category: 'Blusas', color: 'Branco', size: 'M', price: 129.90, stockJangurussu: 6, stockLCavalcante: 4 },
];

export const movements: Movement[] = [
  { id: '1', type: 'transfer', user: 'Juliana', description: 'Transferiu 3 Blusas Elise para L. Cavalcante', timestamp: new Date(Date.now() - 1000 * 60 * 5), quantity: 3, productName: 'Blusa Elise' },
  { id: '2', type: 'sale', user: 'Maria', description: 'Vendeu 1 Vestido Luna na loja Jangurussu', timestamp: new Date(Date.now() - 1000 * 60 * 15), quantity: 1, productName: 'Vestido Luna' },
  { id: '3', type: 'entry', user: 'Ana', description: 'Registrou entrada de 10 Calças Slim Fit', timestamp: new Date(Date.now() - 1000 * 60 * 30), quantity: 10, productName: 'Calça Slim Fit' },
  { id: '4', type: 'transfer', user: 'Carla', description: 'Transferiu 2 Saias Midi Flora para Jangurussu', timestamp: new Date(Date.now() - 1000 * 60 * 45), quantity: 2, productName: 'Saia Midi Flora' },
  { id: '5', type: 'sale', user: 'Juliana', description: 'Vendeu 2 Cropped Summer na loja L. Cavalcante', timestamp: new Date(Date.now() - 1000 * 60 * 60), quantity: 2, productName: 'Cropped Summer' },
];

export const categories = ['Todas', 'Blusas', 'Vestidos', 'Calças', 'Saias', 'Macacões', 'Shorts'];
export const colors = ['Todas', 'Rosa', 'Branco', 'Preto', 'Azul', 'Amarelo', 'Estampado'];
export const stores = ['Todas', 'Jangurussu', 'L. Cavalcante'];

export const dailyGoal = {
  target: 50,
  current: 38,
  message: 'Faltam apenas 12 peças para batermos a meta da semana. Vocês são incríveis! 🚀'
};

export const stockMetrics = {
  totalValue: 45890.50,
  totalJangurussu: 41,
  totalLCavalcante: 29,
  totalProducts: products.length
};

export const salesData = [
  { name: 'Seg', vendas: 12 },
  { name: 'Ter', vendas: 19 },
  { name: 'Qua', vendas: 15 },
  { name: 'Qui', vendas: 22 },
  { name: 'Sex', vendas: 28 },
  { name: 'Sáb', vendas: 35 },
  { name: 'Dom', vendas: 18 },
];
