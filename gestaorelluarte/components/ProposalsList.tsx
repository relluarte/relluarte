import React, { useState } from 'react';
import { Proposal, ProposalStatus } from '../types';
import { PlusCircle, Edit, Trash2, Bell, Calendar } from 'lucide-react';
import FollowUpModal from './FollowUpModal';

interface ProposalsListProps {
  proposals: Proposal[];
  onNewProposal: () => void;
  onEditProposal: (proposal: Proposal) => void;
  onDeleteProposal: (proposalId: string) => void;
  onUpdateFollowUp: (proposalId: string, followUp: { date: string; notes: string; } | null) => void;
}

const getStatusBadge = (status: ProposalStatus) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  switch (status) {
    case ProposalStatus.Approved:
      return `${baseClasses} bg-green-500/20 text-green-300`;
    case ProposalStatus.Sent:
      return `${baseClasses} bg-blue-500/20 text-blue-300`;
    case ProposalStatus.Draft:
      return `${baseClasses} bg-yellow-500/20 text-yellow-300`;
    case ProposalStatus.Rejected:
      return `${baseClasses} bg-red-500/20 text-red-300`;
    default:
      return `${baseClasses} bg-gray-500/20 text-gray-300`;
  }
};

const isOverdue = (dateString: string): boolean => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the beginning of the day
    // The date from the input is just YYYY-MM-DD, so adding time ensures it's compared correctly against today
    const followUpDate = new Date(`${dateString}T00:00:00`);
    return followUpDate < today;
};


const ProposalsList: React.FC<ProposalsListProps> = ({ proposals, onNewProposal, onEditProposal, onDeleteProposal, onUpdateFollowUp }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const openFollowUpModal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const handleSaveFollowUp = (proposalId: string, followUp: { date: string; notes: string; } | null) => {
    onUpdateFollowUp(proposalId, followUp);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Propostas Comerciais</h1>
          <button
            onClick={onNewProposal}
            className="flex items-center bg-yellow-600 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors font-semibold"
          >
            <PlusCircle size={20} className="mr-2" />
            Nova Proposta
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">ID</th>
                <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Cliente</th>
                <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Follow-up</th>
                <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Valor Total</th>
                <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Status</th>
                <th className="p-4 font-semibold text-gray-300 uppercase tracking-wider text-sm text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4 font-medium text-yellow-500">{proposal.id}</td>
                  <td className="p-4 text-gray-200">{proposal.client.name}</td>
                  <td className="p-4 text-gray-300">
                    {proposal.followUp?.date ? (
                        <div className={`flex items-center text-sm ${isOverdue(proposal.followUp.date) ? 'text-red-400 font-semibold' : 'text-gray-300'}`} title={`Nota: ${proposal.followUp.notes}`}>
                            <Calendar size={16} className="mr-2 flex-shrink-0" />
                            {new Date(`${proposal.followUp.date}T00:00:00`).toLocaleDateString('pt-BR')}
                        </div>
                    ) : (
                        <span className="text-gray-500 text-sm">Nenhum</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-200">{proposal.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="p-4">
                    <span className={getStatusBadge(proposal.status)}>{proposal.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center space-x-2">
                      <button onClick={() => openFollowUpModal(proposal)} className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-600 transition-colors" title="Agendar Follow-up">
                        <Bell size={18} />
                      </button>
                      <button onClick={() => onEditProposal(proposal)} className="p-2 text-gray-400 hover:text-yellow-500 rounded-full hover:bg-gray-600 transition-colors" title="Editar Proposta">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => onDeleteProposal(proposal.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-600 transition-colors" title="Excluir Proposta">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
               {proposals.length === 0 && (
                  <tr>
                      <td colSpan={6} className="text-center p-8 text-gray-400">Nenhuma proposta encontrada para esta loja.</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedProposal && (
         <FollowUpModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            proposal={selectedProposal}
            onSave={handleSaveFollowUp}
        />
      )}
    </>
  );
};

export default ProposalsList;