import CreateClientForm from './CreateClientForm.tsx';
import UpdateClientForm from './UpdateClientForm.tsx';

import { Client } from '../../../services/client/client.entity.ts';

type ClientFormProps = { isNewClient: boolean; client: Client | undefined };

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
