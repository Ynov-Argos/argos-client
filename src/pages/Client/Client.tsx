
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ClientForm from '../../components/Forms/Client/ClientForm';

const DefaultDashboard = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Création d'un client" />

     <ClientForm></ClientForm>
     

        
      
    </DefaultLayout>
  );
};
   

export default DefaultDashboard;
