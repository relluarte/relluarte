import React from 'react';
import { DollarSign, FileText, CheckCircle, BarChart2, Users, Package, TrendingUp, AlertTriangle, Calendar, ShoppingCart, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Proposal, ProposalStatus, Client, Product } from '../types';

interface DashboardProps {
  proposals: Proposal[];
  clients: Client[];
  products: Product[];
  userRole?: UserRole;
}

const Card = ({ title, value, icon, color, subtitle }: { title: string; value: string; icon: React.ReactNode, color: string, subtitle?: string }) => (
  <div className="bg-admin-card border border-admin-border rounded-xl p-6 hover:bg-admin-card-hover transition-all duration-300 hover:shadow-lg hover:scale-105">
    <div className="flex items-center">
      <div className={`p-3 rounded-full mr-4 ${color} shadow-md`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-admin-secondary mb-1">{title}</p>
        <p className="text-2xl font-bold text-admin-primary leading-tight">{value}</p>
        {subtitle && <p className="text-xs text-admin-muted mt-2 font-medium">{subtitle}</p>}
      </div>
    </div>
  </div>
);

const AlertCard = ({ title, message, type }: { title: string; message: string; type: 'warning' | 'info' | 'success' }) => {
  const colors = {
    warning: 'border-accent bg-accent/10',
    info: 'border-secondary bg-secondary/10',
    success: 'border-green-500 bg-green-500/10'
  };
  return (
    <div className={`p-4 rounded-lg border ${colors[type]} mb-4`}>
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2 text-admin-primary" />
        <h3 className="text-sm font-semibold text-admin-primary">{title}</h3>
      </div>
      <p className="text-sm text-admin-secondary mt-1">{message}</p>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ proposals, clients, products, userRole }) => {
  // Financial Metrics
  const totalRevenue = proposals
    .filter(p => p.status === ProposalStatus.Approved)
    .reduce((sum, p) => sum + p.total, 0);

  const monthlyRevenue = totalRevenue; // Simplified for demo
  const pendingRevenue = proposals
    .filter(p => p.status === ProposalStatus.Sent)
    .reduce((sum, p) => sum + p.total, 0);

  // Operational Metrics
  const totalClients = clients.length;
  const totalProducts = products.length;
  const openProposals = proposals.filter(p => p.status === ProposalStatus.Sent || p.status === ProposalStatus.Draft).length;
  const approvedProposals = proposals.filter(p => p.status === ProposalStatus.Approved).length;

  // Conversion and Performance
  const conversionRate = proposals.length > 0 ?
    ((approvedProposals / proposals.length) * 100).toFixed(1) + '%'
    : '0%';

  const avgProposalValue = proposals.length > 0 ?
    (totalRevenue / approvedProposals || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'R$ 0,00';

  // Follow-ups needed
  const followUpsNeeded = proposals.filter(p =>
    p.status === ProposalStatus.Sent &&
    (!p.followUp || new Date(p.followUp.date) < new Date())
  ).length;

  // Charts Data
  const salesData = [
    { name: 'Jul', Vendas: 12000, Receita: 12000 },
    { name: 'Ago', Vendas: 19000, Receita: 19000 },
    { name: 'Set', Vendas: 15000, Receita: 15000 },
    { name: 'Out', Vendas: 25000, Receita: 25000 },
    { name: 'Nov', Vendas: 22000, Receita: 22000 },
    { name: 'Dez', Vendas: 30000, Receita: 30000 },
  ];

  const revenueTrend = [
    { month: 'Jul', receita: 12000 },
    { month: 'Ago', receita: 19000 },
    { month: 'Set', receita: 15000 },
    { month: 'Out', receita: 25000 },
    { month: 'Nov', receita: 22000 },
    { month: 'Dez', receita: 30000 },
  ];

  const statusCounts = proposals.reduce((acc, proposal) => {
    acc[proposal.status] = (acc[proposal.status] || 0) + 1;
    return acc;
  }, {} as Record<ProposalStatus, number>);

  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // Product Category Distribution
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  const COLORS = {
    [ProposalStatus.Approved]: '#10B981',
    [ProposalStatus.Sent]: '#3B82F6',
    [ProposalStatus.Draft]: '#F59E0B',
    [ProposalStatus.Rejected]: '#EF4444',
  };

  const CATEGORY_COLORS = ['#c09d59', '#3B82F6', '#10B981'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-admin-primary">
            Dashboard {userRole === 'admin' ? 'Executivo' : 'de Vendas'}
          </h1>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
            userRole === 'admin'
              ? 'bg-accent/20 text-accent'
              : 'bg-secondary/20 text-secondary'
          }`}>
            {userRole === 'admin' ? '👑 Painel Administrativo' : '💼 Painel de Vendas'}
          </div>
        </div>
        <div className="text-sm text-admin-secondary">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>

      {/* Alerts Section */}
      {followUpsNeeded > 0 && (
        <AlertCard
          title="Ações Pendentes"
          message={`${followUpsNeeded} propostas precisam de follow-up`}
          type="warning"
        />
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Receita Total"
          value={totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          icon={<DollarSign className="text-admin-primary"/>}
          color="bg-secondary"
          subtitle="Propostas aprovadas"
        />
        <Card
          title="Receita Pendente"
          value={pendingRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          icon={<Calendar className="text-admin-primary"/>}
          color="bg-accent"
          subtitle="Propostas enviadas"
        />
        <Card
          title="Clientes Ativos"
          value={String(totalClients)}
          icon={<Users className="text-admin-primary"/>}
          color="bg-tertiary"
          subtitle="Total cadastrados"
        />
        <Card
          title="Taxa de Conversão"
          value={conversionRate}
          icon={<TrendingUp className="text-admin-primary"/>}
          color="bg-surface"
          subtitle={`${approvedProposals} de ${proposals.length} propostas`}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Produtos Cadastrados"
          value={String(totalProducts)}
          icon={<Package className="text-admin-primary"/>}
          color="bg-accent"
        />
        <Card
          title="Propostas Abertas"
          value={String(openProposals)}
          icon={<FileText className="text-admin-primary"/>}
          color="bg-secondary"
        />
        <Card
          title="Valor Médio"
          value={avgProposalValue}
          icon={<BarChart2 className="text-admin-primary"/>}
          color="bg-tertiary"
          subtitle="Por proposta aprovada"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-admin-card border border-admin-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-admin-primary mb-4 flex items-center">
            <TrendingUp className="mr-2 text-secondary" />
            Tendência de Receita
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-secondary)" />
              <XAxis dataKey="month" stroke="var(--color-text-muted)" />
              <YAxis stroke="var(--color-text-muted)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border-secondary)' }}
                formatter={(value) => [value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 'Receita']}
              />
              <Area type="monotone" dataKey="receita" stroke="var(--color-secondary)" fill="var(--color-secondary)" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Proposal Status */}
        <div className="bg-admin-card border border-admin-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-admin-primary mb-4 flex items-center">
            <PieChartIcon className="mr-2 text-secondary" />
            Status das Propostas
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as ProposalStatus]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border-secondary)' }} />
              <Legend wrapperStyle={{ color: 'var(--color-text-muted)' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Month */}
        <div className="bg-admin-card border border-admin-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-admin-primary mb-4 flex items-center">
            <BarChart2 className="mr-2 text-secondary" />
            Vendas por Mês
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-secondary)" />
              <XAxis dataKey="name" stroke="var(--color-text-muted)" />
              <YAxis stroke="var(--color-text-muted)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border-secondary)' }}
                formatter={(value) => [value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 'Vendas']}
              />
              <Legend wrapperStyle={{ color: 'var(--color-text-muted)' }}/>
              <Bar dataKey="Vendas" fill="var(--color-secondary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Categories */}
        <div className="bg-admin-card border border-admin-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-admin-primary mb-4 flex items-center">
            <Package className="mr-2 text-secondary" />
            Distribuição por Categoria
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border-secondary)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-admin-card border border-admin-border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-admin-primary mb-4 flex items-center">
          <ShoppingCart className="mr-2 text-secondary" />
          Atividades Recentes
        </h2>
        <div className="space-y-3">
          {proposals.slice(-5).reverse().map((proposal) => (
            <div key={proposal.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  proposal.status === ProposalStatus.Approved ? 'bg-green-500' :
                  proposal.status === ProposalStatus.Sent ? 'bg-accent' :
                  proposal.status === ProposalStatus.Draft ? 'bg-secondary' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="text-admin-primary font-medium">Proposta #{proposal.id.slice(-6)}</p>
                  <p className="text-admin-secondary text-sm">{proposal.client.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-admin-primary font-semibold">
                  {proposal.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-admin-secondary text-sm">{proposal.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;