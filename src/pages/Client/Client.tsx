import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { useGetClientQuery } from '../../services/client/ClientApiSlice.ts';
import Loader from '../../common/Loader';
import ClientForm from '../../components/Forms/Client/ClientForm.tsx';
import CreateClientForm from '../../components/Forms/Client/CreateClientForm.tsx';

const Client: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isNewClient, setIsNewClient] = useState<boolean>(!id);

  const {
    data: client,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetClientQuery(id, { skip: !id });

  useEffect(() => {
    if (id && isError) {
      // @ts-ignore
      if (error.data.statusCode === 404) {
        setIsNewClient(true);
      }
    } else if (id && isSuccess) {
      setIsNewClient(false);
    }
  }, [id, isError, error, isSuccess, client]);

  return isLoading && id ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div>
        {isNewClient ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Créer un nouveau client</h2>
            <CreateClientForm />
          </div>
        ) : (
          <ClientForm isNewClient={isNewClient} client={client} />
        )}
      </div>
    </DefaultLayout>
  );
}

export default Client;
