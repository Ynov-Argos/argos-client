import SelectGroupDropdown from '../../../Inputs/SelectGroupDropdown.tsx';
import DatePicker from '../../../Inputs/DatePicker.tsx';
import { DocumentType } from '../../../../services/client/client.entity.ts';
import TextInput from '../../../Inputs/TextInput.tsx';

const documentTypes = [{value: DocumentType.IDENTITY, label: 'Identité'}, {value: DocumentType.PASSPORT, label: 'Passeport'}, {value: DocumentType.VISA, label: 'Visa'}, {value: DocumentType.OTHER, label: 'Autre'}];

const IdentityDocumentForm = () => {
  return (<>
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
            <TextInput value={''} label={'Numéro de Document'} placeHolder={'Numéro de Document'} /*setValue={}*/ />
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
  </>);
};

export default IdentityDocumentForm;
