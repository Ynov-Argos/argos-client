
const TextInput = ({value, handleChange, label, placeHolder, targetName}) => {
  return (<>
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      {label}
    </label>
    <input
      type="text"
      name={targetName}
      placeholder={placeHolder}
      value={value}
      onChange={handleChange}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
  </>);
}

export default TextInput;
