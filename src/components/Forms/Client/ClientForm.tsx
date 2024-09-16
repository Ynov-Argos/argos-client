import CreateClientForm from './CreateClientForm.tsx';
import UpdateClientForm from './UpdateClientForm.tsx';

import Client from '../../../pages/Clients/Client.tsx';

type ClientFormProps = { isNewClient: boolean; client: typeof Client | undefined };

const ClientForm = (props: ClientFormProps) => {

    if (props.isNewClient) {
      return (<div><CreateClientForm></CreateClientForm></div>);
    }
    return (
      <div>
        <UpdateClientForm client={props.client}></UpdateClientForm>
      </div>);
};

export default ClientForm;
