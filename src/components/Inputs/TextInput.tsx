
const TextInput = ({value, setValue, label, placeHolder}) => {
  return (<>
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
  </>);
}

export default TextInput;
