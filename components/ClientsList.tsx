import React from 'react';
import { Client } from '../types';

interface ClientsListProps {
  clients: Client[];
}

const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-admin-primary">Clientes</h1>
      <div className="grid gap-4">
        {clients.map(client => (
          <div key={client.id} className="card-primary hover-lift">
            <h3 className="text-xl font-semibold text-admin-primary mb-2">{client.name}</h3>
            <p className="text-secondary mb-1">{client.email}</p>
            <p className="text-secondary">{client.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsList;