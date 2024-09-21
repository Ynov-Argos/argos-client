import SelectGroupDropdown from '../../../Inputs/SelectGroupDropdown.tsx';
import DatePicker from '../../../Inputs/DatePicker.tsx';
import { ClientType } from '../../../../services/client/client.entity.ts';
import TextInput from '../../../Inputs/TextInput.tsx';

const juridicalForms  = [{value: ClientType.LEGAL , label: 'Moral'}, {value: ClientType.NATURAL, label: 'Physique'}, {value: ClientType.VESSEL, label: 'Navire'}];
type LegalPersonFormProps = {
  data: {
    id: string;
    name: string;
    juridicalForm: string;
    registrationNumber: string;
    vatNumber: string;
    incorporationDate: string;
    incorporationCountry: string;
  };
  setData: (data: any) => void;
};

const LegalPersonForm: React.FC<LegalPersonFormProps> = ({data, setData}) => {

  const setJuridicalForm = (juridicalForm: string) => {
    setData({...data, juridicalForm});
  };

  const setValue = (value: string) => {
    console.log(value);
  }

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };
  return (<>
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <TextInput value={data.name} label={'Nom'} placeHolder={'Nom'} targetName={'name'} handleChange={handleChange} />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Forme Juridique
            </label>
            <SelectGroupDropdown options={juridicalForms} dropdownTitle={'Forme Juridique'}
                                 setSelectedOption={setJuridicalForm} selectedOption={data.juridicalForm} />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <TextInput value={data.registrationNumber} label={'N° de SIRET'} placeHolder={'N° de SIRET'} handleChange={handleChange} targetName={'registrationNumber'}/>
          </div>
          <div className="w-full xl:w-1/2">
            <TextInput value={data.vatNumber} label={'N° de TVA'} placeHolder={'N° de TVA'} handleChange={handleChange} targetName={'vatNumber'} />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <DatePicker label={'Date de Création'} value={data.incorporationDate} setValue={setValue} />
          </div>
          {/*TODO REFACTO MULTISELECT TO ACCEPT STRING INSTEAD NUMBER FOR INDEX*/}
          <div className="w-full xl:w-1/2">
            <TextInput value={data.incorporationCountry} label={'Pays de Création'} placeHolder={'Pays de Création'} handleChange={handleChange} targetName={'incorporationCountry'} />
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default LegalPersonForm;
