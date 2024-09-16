import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetClientQuery } from '../../services/client/ClientApiSlice.ts';
import Loader from '../../common/Loader';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import ClientForm from '../../components/Forms/Client/ClientForm.tsx';

const Client: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isNewClient, setIsNewClient] = useState(true);

  const {data: client, isLoading, isError, isSuccess, error} = useGetClientQuery(id);

  useEffect(() => {
    if (isError) {
      // @ts-ignore
      if (error.data.statusCode === 404) {
        setIsNewClient(true);
      }
    } else if (isSuccess) {
      setIsNewClient(false);
    }
  }, [isError, error, isSuccess, client]);

  return isLoading ? (<Loader></Loader>) : (<DefaultLayout>
    <div>
      <ClientForm isNewClient={isNewClient} client={client}></ClientForm>
    </div>
  </DefaultLayout>);
};

export default Client;
