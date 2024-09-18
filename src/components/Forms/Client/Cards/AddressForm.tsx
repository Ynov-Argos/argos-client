import TextInput from '../../../Inputs/TextInput.tsx';

const AddressForm = () => {

  return (<>
    <div
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6.5">
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={''} label={'Adresse'} placeHolder={'Adresse'} /*setValue={}*/ />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <TextInput value={''} label={'Complément d\'Adresse'} placeHolder={'Complément d\'Adresse'} /*setValue={}*/ />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:1/2">
            <TextInput value={''} label={'Ville'} placeHolder={'Ville'} /*setValue={}*/ />
          </div>
          <div className="w-full xl:1/2">
            <TextInput value={''} label={'Code Postal'} placeHolder={'Code Postal'} /*setValue={}*/ />
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

export default AddressForm;
