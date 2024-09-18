import SelectGroupDropdown from '../../../Inputs/SelectGroupDropdown.tsx';
import DatePicker from '../../../Inputs/DatePicker.tsx';
import { ClientType } from '../../../../services/client/client.entity.ts';
import TextInput from '../../../Inputs/TextInput.tsx';

const clientTypes  = [{value: ClientType.LEGAL , label: 'Moral'}, {value: ClientType.NATURAL, label: 'Physique'}, {value: ClientType.VESSEL, label: 'Navire'}];


const LegalPersonForm = () => {

  return (<>
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <TextInput value={''} label={'Nom'} placeHolder={'Nom'} />
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
            <TextInput value={''} label={'N° de SIRET'} placeHolder={'N° de SIRET'} />
          </div>
          <div className="w-full xl:w-1/2">
            <TextInput value={''} label={'N° de TVA'} placeHolder={'N° de TVA'} />
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
  </>);
};

export default LegalPersonForm;
