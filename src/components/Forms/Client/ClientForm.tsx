import React from 'react';
import CreateClientForm from './CreateClientForm.tsx';
import UpdateClientForm from './UpdateClientForm.tsx';
import UpdateClientAddressForm from './UpdateClientAddressForm.tsx';

type Client = {
  id: string;
  idExterne: string;
  type: string;
  typeRelation: string;
  natural: string;
  legal: string;
  vessel: string;
  prenom: string;
  nom: string;
  dateNaissance: string;
  lieuNaissance: string;
  nationalite: string;
  email: string;
  adresse: string;
  adresse2: string;
  ville: string;
  codePostal: string;
  pays: string;
};

type ClientFormProps = {
  isNewClient: boolean;
  client: Client | undefined;
};

const ClientForm: React.FC<ClientFormProps> = ({ isNewClient, client }) => {
  if (isNewClient) {
    return (
      <div>
        <CreateClientForm />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      {client && <UpdateClientForm client={client} />}
      {client && <UpdateClientAddressForm clientId={client.id} initialAddressData={client} />}
    </div>
  );
};

export default ClientForm;
