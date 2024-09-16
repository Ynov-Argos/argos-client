import Client from '../../../pages/Clients/Client.tsx';
import { useUpdateClientMutation } from '../../../services/client/ClientApiSlice.ts';

const UpdateClientForm = (props: { client: typeof Client }) => {


  // @ts-ignore
  const [updateClient] = useUpdateClientMutation();

  return (<>{JSON.stringify(props.client)}</>);
};

export default UpdateClientForm;
