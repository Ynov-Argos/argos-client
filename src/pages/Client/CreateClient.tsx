// CreateClient.tsx
import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import CreateClientForm from '../../components/Forms/Client/CreateClientForm.tsx';

const CreateClient: React.FC = () => {
  return (
    <DefaultLayout>
      <div>
        <h2 className="text-2xl font-bold mb-4">Créer un nouveau client</h2>
        <CreateClientForm />
      </div>
    </DefaultLayout>
  );
}

export default CreateClient;
