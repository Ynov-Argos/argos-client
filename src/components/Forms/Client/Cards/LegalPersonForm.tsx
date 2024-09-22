import SelectGroupDropdown from '../../../Inputs/SelectGroupDropdown.tsx';
import TextInput from '../../../Inputs/TextInput.tsx';

const juridicalForms = [
  { "value": "SA", "label": "SA" },
  { "value": "SARL", "label": "SARL" },
  { "value": "SAS", "label": "SAS" },
  { "value": "SASU", "label": "SASU" },
  { "value": "SCI", "label": "SCI" },
  { "value": "EURL", "label": "EURL" },
  { "value": "SNC", "label": "SNC" },
  { "value": "SCOP", "label": "SCOP" },
  { "value": "SCA", "label": "SCA" },
  { "value": "SCS", "label": "SCS" },
  { "value": "SELARL", "label": "SELARL" },
  { "value": "SELAS", "label": "SELAS" },
  { "value": "SCP", "label": "SCP" },
  { "value": "GIE", "label": "GIE" },
  { "value": "EI", "label": "EI" },
  { "value": "EIRL", "label": "EIRL" }
]
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
