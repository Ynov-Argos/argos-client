import React from 'react';

type TextInputProps = {
  value: any;
  handleChange?: any;
  label: string;
  placeHolder: string;
  targetName: string;
  readOnly?: boolean;
}
const TextInput: React.FC<TextInputProps> = ({value, handleChange, label, placeHolder, targetName, readOnly}) => {
  return (<>
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      {label}
    </label>
    <input
      disabled={readOnly || false}
      type="text"
      name={targetName}
      placeholder={placeHolder}
      value={value}
      onChange={handleChange}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
  </>);
}

export default TextInput;
