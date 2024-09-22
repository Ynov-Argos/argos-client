import TextInput from '../../../Inputs/TextInput.tsx';

type AddressFormProps = {
  data: {
    id: string;
    address1: string;
    address2: string;
    city: string;
    zipCode: string;
    country: string;
  };
  setData: (data: any) => void;
};

const AddressForm: React.FC<AddressFormProps> = ({data, setData}) => {
  const handleChange = (e) => { setData({...data, [e.target.name]: e.target.value});};
  return (<>
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={data.address1} label={'Adresse'}
                       placeHolder={'Adresse'} targetName={'address1'} handleChange={handleChange} />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={data.address2} label={'Complément d\'Adresse'}
                       placeHolder={'Complément d\'Adresse'} handleChange={handleChange} targetName={'address2'} />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:1/2">
            <TextInput value={data.city} label={'Ville'}
                       placeHolder={'Ville'} targetName={'city'} handleChange={handleChange} />
          </div>
          <div className="w-full xl:1/2">
            <TextInput value={data.zipCode} label={'Code Postal'}
                       placeHolder={'Code Postal'} targetName={'zipCode'} handleChange={handleChange}/>
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={data.country} label={'Pays'} placeHolder={'Pays'} targetName={'country'} handleChange={handleChange}/>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default AddressForm;
