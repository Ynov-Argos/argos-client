import { useCreateClientMutation } from '../../../services/client/ClientApiSlice.ts';
import SelectGroupDropdown from '../SelectGroupDropdown.tsx';
import { ClientType, RelationType, DocumentType } from '../../../services/client/client.entity.ts';
import DatePicker from '../DatePicker.tsx';

const clientTypes  = [{value: ClientType.LEGAL , label: 'Moral'}, {value: ClientType.NATURAL, label: 'Physique'}, {value: ClientType.VESSEL, label: 'Navire'}];
const relationTypes = [{value: RelationType.CLIENT, label: 'Client'}, {value: RelationType.RELATION, label: 'Relation'}, {value: RelationType.PROSPECT, label: 'Prospect'}, {value: RelationType.ARCHIVED, label: 'Archivé'}];
const documentTypes = [{value: DocumentType.IDENTITY, label: 'Identité'}, {value: DocumentType.PASSPORT, label: 'Passeport'}, {value: DocumentType.VISA, label: 'Visa'}, {value: DocumentType.OTHER, label: 'Autre'}];

const CreateClientForm = () => {
  // @ts-ignore
  const [createClient] = useCreateClientMutation();

  return (<div className="flex flex-col gap9">
    {/* En tête */}
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      id="formHeader">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Identificateur Externe
            </label>
            <input
              type="text"
              placeholder="Identificateur Externe"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
          </div>

          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Type de Client
            </label>
            <SelectGroupDropdown options={clientTypes} dropdownTitle={'Type de Client'}
              /* setSelectedOption={}*/ selectedOption={''} />
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Type de Relation
            </label>
            <SelectGroupDropdown options={relationTypes} dropdownTitle={'Type de Relation'}
              /* setSelectedOption={}*/ selectedOption={''} />
          </div>
        </div>
      </div>
      <div><label
        htmlFor="form"
        className="relative left-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
      >
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.21875 18.0625H3.21875C2.90625 18.0625 2.65625 17.8125 2.65625 17.5V2.5C2.65625 2.1875 2.90625 1.9375 3.21875 1.9375H10.2812V5.9375C10.2812 6.3125 10.5938 6.65625 11 6.65625H14.9688V8.75C14.9688 9.125 15.2812 9.46875 15.6875 9.46875C16.0938 9.46875 16.4062 9.15625 16.4062 8.75V6.125C16.4062 5.78125 16.25 5.4375 16 5.1875L11.625 0.937499C11.375 0.687499 11.0312 0.562499 10.6875 0.562499H3.1875C2.125 0.531249 1.25 1.4375 1.25 2.5V17.5C1.25 18.5625 2.125 19.4688 3.21875 19.4688H7.25C7.625 19.4688 7.96875 19.1562 7.96875 18.75C7.96875 18.3438 7.625 18.0625 7.21875 18.0625ZM11.6562 2.9375L14 5.25H11.6562V2.9375Z"
            fill=""
          />
          <path
            d="M18.5 11.75C18.25 11.5 18 11.25 17.75 11C17.5312 10.7813 17.3125 10.5312 17.0625 10.3125C16.9375 10.1563 16.75 10.0313 16.5313 10C16.2813 9.96875 16.0313 10.0312 15.8438 10.1875L10.4062 15.5938C10.25 15.75 10.1562 15.9062 10.0937 16.0938L9.3125 18.4687L9.1875 18.8438L9.40625 19.125C9.5 19.25 9.6875 19.4375 10.0312 19.4375H10.1563L12.625 18.625C12.8125 18.5625 13 18.4687 13.125 18.3125L18.5 12.9688C18.6562 12.8125 18.75 12.5938 18.75 12.3438C18.75 12.125 18.6562 11.9062 18.5 11.75ZM16.4062 11.625C16.5312 11.75 16.6562 11.875 16.75 12C16.875 12.125 17 12.25 17.125 12.375L16.7813 12.7188L16.0625 12L16.4062 11.625ZM12.1563 17.3125L11.0625 17.6562L11.4062 16.5625L15.0312 12.9375L15.75 13.6563L12.1563 17.3125Z"
            fill=""
          />
        </svg>
      </label></div>
    </div>
    <div className="mt-4"></div>
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      {/* Informations Personne Physique A N'AFFICHER QU'EN CAS DE NATURAL */}
      <div className="flex flex-col gap-9">
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Prénom
                </label>
                <input
                  type="text"
                  placeholder="Prénom"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <DatePicker label={'Date de Naissance'} value={''} setValue={''} />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Lieu de Naissance
                </label>
                <input
                  type="text"
                  placeholder="Lieu de Naissance"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
            <div className="w-full">
              {/*TODO REFACTO MULTISELECT TO ACCEPT STRING INSTEAD NUMBER FOR INDEX*/}
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Pays
              </label>
              <input
                type="text"
                placeholder="Pays"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
            </div>
          </div>
        </div>
      </div>
      {/* Informations Addresse */}
      <div className="flex flex-col gap-9">
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Adresse
                </label>
                <input
                  type="text"
                  placeholder="Adresse"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Complément d'Adresse
                </label>
                <input
                  type="text"
                  placeholder="Complément d'Adresse"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ville
                </label>
                <input
                  type="text"
                  placeholder="Ville"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
              <div className="w-full xl:1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Code Postal
                </label>
                <input
                  type="text"
                  placeholder="Code Postal"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                {/*TODO REFACTO MULTISELECT TO ACCEPT STRING INSTEAD NUMBER FOR INDEX*/}
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Pays
                </label>
                <input
                  type="text"
                  placeholder="Pays"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4"></div>
    {/* Informations Pieces d'identité A N'AFFICHER QU'EN CAS DE NATURAL */}
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Type de Document
            </label>
            <SelectGroupDropdown options={documentTypes} dropdownTitle={'Type de Document'}
              /* setSelectedOption={}*/ selectedOption={''} />
          </div>
          <div className="w-full xl:w-3/6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              N° du Document
            </label>
            <input
              type="text"
              placeholder="Identificateur Externe"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
          </div>
          <div className="w-full xl:w-1/6">
            <DatePicker label={'Date de Délivrance'} value={''} setValue={''} />
          </div>
          <div className="w-full xl:w-1/6">
            <DatePicker label={'Date d\'Expiration'} value={''} setValue={''} />
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4"></div>
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      {/* Informations Personne Morale A N'AFFICHER QU'EN CAS DE MORAL */}
      <div className="flex flex-col gap-9">
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Forme Juridique
                </label>
                <SelectGroupDropdown options={clientTypes} dropdownTitle={'Forme Juridique'} />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  N° de SIRET
                </label>
                <input
                  type="text"
                  placeholder="SIRET"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  N° de TVA
                </label>
                <input
                  type="text"
                  placeholder="TVA"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <DatePicker label={'Date de Création'} value={''} setValue={''} />
              </div>
              {/*TODO REFACTO MULTISELECT TO ACCEPT STRING INSTEAD NUMBER FOR INDEX*/}
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Pays de Création
                </label>
                <input
                  type="text"
                  placeholder="Pay de Création"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Informations Navire A N'AFFICHER QU'EN CAS DE VESSEL */}
      <div className="flex flex-col gap-9">
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  N° OMI
                </label>
                <input
                  type="text"
                  placeholder="OMI"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                {/*TODO REFACTO MULTISELECT TO ACCEPT STRING INSTEAD NUMBER FOR INDEX*/}
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Pays
                </label>
                <input
                  type="text"
                  placeholder="Pays"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default CreateClientForm;
