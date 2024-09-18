import TextInput from '../../../Inputs/TextInput.tsx';

const VesselPersonForm = () => {
  return (<>
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={''} label={'Nom'} placeHolder={'Nom'} /*setValue={}*/ />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={''} label={'N° OMI'} placeHolder={'N° OMI'} /*setValue={}*/ />
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
  </>);
};

export default VesselPersonForm;
