import TextInput from '../../../Inputs/TextInput.tsx';

type VesselPersonFormProps = {
  data: {
    id: string;
    name: string;
    omiNumber: string;
    flag: string;
  };
  setData: (data: any) => void;
};

const VesselPersonForm: React.FC<VesselPersonFormProps> = ({data, setData}) => {
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  return (<>
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={data.name} label={'Nom'} placeHolder={'Nom'} handleChange={handleChange} targetName={'name'} />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={data.omiNumber} label={'N° OMI'} placeHolder={'N° OMI'} handleChange={handleChange} targetName={'omiNumber'} />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            {/*TODO REFACTO MULTISELECT TO ACCEPT STRING INSTEAD NUMBER FOR INDEX*/}
            <TextInput value={data.flag} label={'Pays'} placeHolder={'Pays'} handleChange={handleChange} targetName={'flag'} />
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default VesselPersonForm;
