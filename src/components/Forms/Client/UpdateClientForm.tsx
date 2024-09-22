import { useState } from 'react';

import { Client, RelationType, ClientType} from '../../../services/client/client.entity.ts';

import { useUpdateClientMutation } from '../../../services/client/ClientApiSlice.ts';
import TextInput from '../../Inputs/TextInput.tsx';
import SelectGroupDropdown from '../../Inputs/SelectGroupDropdown.tsx';
import NaturalPersonForm from './Cards/NaturalPersonForm.tsx';
import IdentityDocumentForm from './Cards/IdentityDocumentForm.tsx';
import AddressForm from './Cards/AddressForm.tsx';
import LegalPersonForm from './Cards/LegalPersonForm.tsx';
import VesselPersonForm from './Cards/VesselPersonForm.tsx';
import { toast, ToastContainer } from 'react-toastify';

const clientTypes  = [{value: ClientType.LEGAL , label: 'Moral'}, {value: ClientType.NATURAL, label: 'Physique'}, {value: ClientType.VESSEL, label: 'Navire'}];
const relationTypes = [{value: RelationType.CLIENT, label: 'Client'}, {value: RelationType.RELATION, label: 'Relation'}, {value: RelationType.PROSPECT, label: 'Prospect'}, {value: RelationType.ARCHIVED, label: 'Archivé'}];

const UpdateClientForm = (props: { client: Client }) => {
  const [clientType, setClientType] = useState<ClientType | undefined>(props.client.type);
  const [externalId] = useState<string | undefined>(props.client.externalId);
  const [relationType, setRelationType] = useState<RelationType | undefined>(props.client.relationType);

  const [natural, setNatural] = useState({
    id: props.client.natural?.id,
    firstName: props.client.natural?.firstName,
    lastName: props.client.natural?.lastName,
    birthDate: props.client.natural?.birthDate,
    birthPlace: props.client.natural?.birthPlace,
    nationalities: props.client.natural?.nationalities,
    identityDocuments: props.client.natural?.identityDocuments
  });

  const [identityDocuments, setIdentityDocuments] = useState({
    id: props.client?.natural?.identityDocuments[0]?.id,
    documentType: props.client?.natural?.identityDocuments[0]?.documentType,
    documentId: props.client?.natural?.identityDocuments[0]?.documentId,
    issueDate: props.client?.natural?.identityDocuments[0]?.issueDate,
    expirationDate: props.client?.natural?.identityDocuments[0]?.expirationDate
  });

  const [address, setAddress] = useState({
    id: props.client.addresses[0]?.id,
    address1: props.client.addresses[0]?.address1,
    address2: props.client.addresses[0]?.address2,
    zipCode: props.client.addresses[0]?.zipCode,
    city: props.client.addresses[0]?.city,
    country: props.client.addresses[0]?.country,
  });

  const [legal, setLegalPerson] = useState({
    id: props.client.legal?.id,
    name: props.client.legal?.name,
    juridicalForm: props.client.legal?.juridicalForm,
    registrationNumber: props.client.legal?.registrationNumber,
    vatNumber: props.client.legal?.vatNumber,
    incorporationDate: props.client.legal?.incorporationDate,
    incorporationCountry: props.client.legal?.incorporationCountry
  });

  const [vessel, setVesselPerson] = useState({
    id: props.client.vessel?.id,
    name: props.client.vessel?.name,
    omiNumber: props.client.vessel?.omiNumber,
    flag: props.client.vessel?.flag
  });


  // @ts-ignore
  const [updateClient] = useUpdateClientMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressUpdate = address.address1 ? [address] : [];
    const updateIdentityDocuments = identityDocuments.documentId ? [identityDocuments] : [];

    const naturalUpdate = {
      id: natural.id,
      firstName: natural.firstName,
      lastName: natural.lastName,
      birthDate: natural.birthDate,
      birthPlace: natural.birthPlace,
      nationalities: natural.nationalities,
      identityDocuments: updateIdentityDocuments
    };
    const clientToUpdate = {
      id: props.client.id,
      externalId: externalId,
      type: clientType,
      relationType: relationType,
      natural: clientType === ClientType.NATURAL ? naturalUpdate : undefined,
      legal: clientType === ClientType.LEGAL ? legal : undefined,
      vessel: clientType === ClientType.VESSEL ? vessel : undefined,
      addresses: addressUpdate
    };

    console.log(clientToUpdate);
    try {
      await updateClient(clientToUpdate).unwrap();
      toast.success('Client mis à jour');
    } catch (err) {
      if (err.data.statusCode === 404) {
        toast.error('Client inexistant');
      } else {
        toast.error(`Erreur ${err.data.statusCode}: ${err.data.message}`);
      }
    }

  };

  return (<div className="flex flex-col gap9">
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <TextInput value={externalId || ''} label={'Identificateur Externe'}
                       readOnly={true}
                       placeHolder={'Identificateur Externe'}
                       targetName={'externalId'} />
          </div>

          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Type de Client
            </label>
            <SelectGroupDropdown options={clientTypes} dropdownTitle={'Type de Client'}
                                 selectedOption={clientType || ''}
                                 readOnly={true}
                                 setSelectedOption={setClientType} />
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Type de Relation
            </label>
            <SelectGroupDropdown options={relationTypes} dropdownTitle={'Type de Relation'}
                                 setSelectedOption={setRelationType}
                                 selectedOption={relationType || ''} />
          </div>
        </div>
      </div>
    </div>
    {/* Bouton de validation */}
    <div
      className="static left-2 z-30 mx-auto -mt-7.5 h-10 w-full max-w-10 rounded-full bg-primary text-white cursor-pointer hover:bg-opacity-90 p-1 sm:h-12 sm:max-w-12 sm:p-3"
      onClick={handleSubmit}
    >
      <label className="flex justify-center items-center h-full cursor-pointer">
        <svg
          className="fill-current"
          width="36"
          height="38"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8749 7.44902C16.5374 7.44902 16.228 7.73027 16.228 8.0959V13.3834C16.228 14.4803 15.4124 15.3521 14.3999 15.3521H3.5999C2.55928 15.3521 1.77178 14.4803 1.77178 13.3834V8.06777C1.77178 7.73027 1.49053 7.4209 1.1249 7.4209C0.759277 7.4209 0.478027 7.70215 0.478027 8.06777V13.3553C0.478027 15.1271 1.85615 16.5896 3.57178 16.5896H14.3999C16.1155 16.5896 17.4937 15.1553 17.4937 13.3553V8.06777C17.5218 7.73027 17.2124 7.44902 16.8749 7.44902Z"
            fill=""
          />
          <path
            d="M8.5498 11.6396C8.6623 11.7521 8.83105 11.8365 8.9998 11.8365C9.16855 11.8365 9.30918 11.7803 9.4498 11.6396L12.8811 8.23652C13.1342 7.9834 13.1342 7.58965 12.8811 7.33652C12.6279 7.0834 12.2342 7.0834 11.9811 7.33652L9.64668 9.64277V2.16152C9.64668 1.82402 9.36543 1.51465 8.9998 1.51465C8.6623 1.51465 8.35293 1.7959 8.35293 2.16152V9.69902L6.01855 7.36465C5.76543 7.11152 5.37168 7.11152 5.11855 7.36465C4.86543 7.61777 4.86543 8.01152 5.11855 8.26465L8.5498 11.6396Z"
            fill=""
          />
        </svg>
      </label>
    </div>
    <div className="mt-4"></div>
    {clientType === ClientType.NATURAL ? (<>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <NaturalPersonForm data={natural} setData={setNatural} />
          <IdentityDocumentForm data={identityDocuments} setData={setIdentityDocuments} />
        </div>
        {/* Information Addresses */}
        <div className="flex flex-col gap-9">
          <AddressForm data={address} setData={setAddress} />
        </div>
      </div>
    </>) : (<></>)}
    {clientType === ClientType.LEGAL ? (<>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* Informations Personne Morale A N'AFFICHER QU'EN CAS DE MORAL */}
        <div className="flex flex-col gap-9">
          <LegalPersonForm data={legal} setData={setLegalPerson} />
        </div>
        {/* Information Navire A N'AFFICHER QU'EN CAS DE VESSEL */}
        <div className="flex flex-col gap-9">
          <AddressForm data={address} setData={setAddress} />
        </div>
      </div>
    </>) : (<></>)}
    {clientType === ClientType.VESSEL ? (<>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* Informations Personne Morale A N'AFFICHER QU'EN CAS DE MORAL */}
        <div className="flex flex-col gap-9">
          <VesselPersonForm data={vessel} setData={setVesselPerson} />
        </div>
        {/* Informations Navire A N'AFFICHER QU'EN CAS DE VESSEL */}
        <div className="flex flex-col gap-9">
          <AddressForm data={address} setData={setAddress} />
        </div>
      </div>
    </>) : (<></>)}
    <ToastContainer />
  </div>);
};

export default UpdateClientForm;
