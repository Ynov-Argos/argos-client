
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import ListClientForm from '../../components/Forms/Client/ListClientForm';

const DefaultDashboard = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste des client" />

     <ListClientForm></ListClientForm>
     

        
      
    </DefaultLayout>
  );
};
   

export default DefaultDashboard;
