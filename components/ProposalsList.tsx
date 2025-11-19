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
      return `${baseClasses} bg-accent/20 text-accent`;
    case ProposalStatus.Draft:
      return `${baseClasses} bg-secondary/20 text-secondary`;
    case ProposalStatus.Rejected:
      return `${baseClasses} bg-red-500/20 text-red-300`;
    default:
      return `${baseClasses} bg-muted/20 text-muted`;
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
      <div className="card-primary">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-admin-primary">Propostas Comerciais</h1>
          <button
            onClick={onNewProposal}
            className="btn-primary"
          >
            <PlusCircle size={20} className="mr-2" />
            Nova Proposta
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background-secondary/50">
              <tr>
                <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">ID</th>
                <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">Cliente</th>
                <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">Follow-up</th>
                <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">Valor Total</th>
                <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm">Status</th>
                <th className="p-4 font-semibold text-secondary uppercase tracking-wider text-sm text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="border-b border-secondary/20 hover:bg-background-secondary/30 transition-colors">
                  <td className="p-4 font-medium text-accent">{proposal.id}</td>
                  <td className="p-4 text-admin-primary">{proposal.client.name}</td>
                  <td className="p-4 text-secondary">
                    {proposal.followUp?.date ? (
                        <div className={`flex items-center text-sm ${isOverdue(proposal.followUp.date) ? 'text-red-400 font-semibold' : 'text-secondary'}`} title={`Nota: ${proposal.followUp.notes}`}>
                            <Calendar size={16} className="mr-2 flex-shrink-0" />
                            {new Date(`${proposal.followUp.date}T00:00:00`).toLocaleDateString('pt-BR')}
                        </div>
                    ) : (
                        <span className="text-muted text-sm">Nenhum</span>
                    )}
                  </td>
                  <td className="p-4 text-admin-primary">{proposal.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="p-4">
                    <span className={getStatusBadge(proposal.status)}>{proposal.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center space-x-2">
                      <button onClick={() => openFollowUpModal(proposal)} className="p-2 text-secondary hover:text-accent rounded-full hover:bg-background-secondary/50 transition-colors" title="Agendar Follow-up">
                        <Bell size={18} />
                      </button>
                      <button onClick={() => onEditProposal(proposal)} className="p-2 text-secondary hover:text-accent rounded-full hover:bg-background-secondary/50 transition-colors" title="Editar Proposta">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => onDeleteProposal(proposal.id)} className="p-2 text-secondary hover:text-red-400 rounded-full hover:bg-red-500/10 transition-colors" title="Excluir Proposta">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
               {proposals.length === 0 && (
                  <tr>
                      <td colSpan={6} className="text-center p-8 text-muted">Nenhuma proposta encontrada para esta loja.</td>
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