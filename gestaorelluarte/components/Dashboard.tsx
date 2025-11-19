import React from 'react';
import { DollarSign, FileText, CheckCircle, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Proposal, ProposalStatus } from '../types';

interface DashboardProps {
  proposals: Proposal[];
}

const Card = ({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode, color: string }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center border border-gray-700">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ proposals }) => {
  const totalRevenue = proposals
    .filter(p => p.status === ProposalStatus.Approved)
    .reduce((sum, p) => sum + p.total, 0)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
  const openProposals = proposals.filter(p => p.status === ProposalStatus.Sent || p.status === ProposalStatus.Draft).length;
  
  const conversionRate = proposals.length > 0 ?
    ((proposals.filter(p => p.status === ProposalStatus.Approved).length / proposals.length) * 100).toFixed(1) + '%'
    : '0%';

  const salesData = [
    { name: 'Jul', Vendas: 4000 },
    { name: 'Ago', Vendas: 3000 },
    { name: 'Set', Vendas: 5000 },
    { name: 'Out', Vendas: 2780 },
    { name: 'Nov', Vendas: 6890 },
    { name: 'Dez', Vendas: 8390 },
  ];
  
  const statusCounts = proposals.reduce((acc, proposal) => {
    acc[proposal.status] = (acc[proposal.status] || 0) + 1;
    return acc;
  }, {} as Record<ProposalStatus, number>);

  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // FIX: Removed a stale and confusing comment.
  const COLORS = {
    [ProposalStatus.Approved]: '#10B981',
    [ProposalStatus.Sent]: '#3B82F6',
    [ProposalStatus.Draft]: '#F59E0B',
    [ProposalStatus.Rejected]: '#EF4444',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Receita (Aprovada)" value={totalRevenue} icon={<DollarSign className="text-gray-900"/>} color="bg-yellow-500" />
        <Card title="Propostas em Aberto" value={String(openProposals)} icon={<FileText className="text-white"/>} color="bg-blue-500" />
        <Card title="Taxa de Conversão" value={conversionRate} icon={<CheckCircle className="text-white"/>} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center"><BarChart2 className="mr-2 text-yellow-500" /> Vendas por Mês</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey="name" stroke="#A0AEC0" />
                    <YAxis stroke="#A0AEC0" />
                    <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
                    <Legend wrapperStyle={{ color: '#A0AEC0' }}/>
                    <Bar dataKey="Vendas" fill="#c09d59" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Status das Propostas</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {pieData.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as ProposalStatus]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
                    <Legend wrapperStyle={{ color: '#A0AEC0' }}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;