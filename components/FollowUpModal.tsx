import React, { useState, useEffect } from 'react';
import { Proposal } from '../types';
import { X, Calendar, Save } from 'lucide-react';

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal;
  onSave: (proposalId: string, followUp: { date: string; notes: string; } | null) => void;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({ isOpen, onClose, proposal, onSave }) => {
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (proposal.followUp) {
      setDate(proposal.followUp.date);
      setNotes(proposal.followUp.notes);
    } else {
      // Reset form when opening for a proposal without a followup
      setDate('');
      setNotes('');
    }
  }, [proposal, isOpen]);

  const handleSave = () => {
    if (!date) {
        alert("Por favor, selecione uma data para o follow-up.");
        return;
    }
    onSave(proposal.id, { date, notes });
  };
  
  const handleRemove = () => {
      if (window.confirm("Tem certeza que deseja remover o lembrete de follow-up?")) {
          onSave(proposal.id, null);
      }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Follow-up: <span className="text-yellow-500">{proposal.id}</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <Calendar className="mr-2" size={16}/> Data do Lembrete
            </label>
            <input
              type="date"
              id="followUpDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="followUpNotes" className="block text-sm font-medium text-gray-300 mb-1">
              Notas
            </label>
            <textarea
              id="followUpNotes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Ligar para confirmar o recebimento e tirar dúvidas."
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-900/50 border-t border-gray-700 rounded-b-lg">
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-400 font-semibold px-4 py-2 rounded-md transition-colors disabled:opacity-50"
            disabled={!proposal.followUp}
          >
            Remover Lembrete
          </button>
          <button
            onClick={handleSave}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 font-semibold transition-colors"
          >
            <Save size={18} className="mr-2"/>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpModal;
