import React, { useState, useEffect } from 'react';
import { useUpdateClientMutation } from '../../../services/client/ClientApiSlice.ts';
import { toast, ToastContainer } from 'react-toastify';

const UpdateClientAddressForm = ({ clientId, initialAddressData }) => {
  const [addressData, setAddressData] = useState({ ...initialAddressData });

  const [updateClientAddress] = useUpdateClientMutation();

  useEffect(() => {
    setAddressData({ ...initialAddressData });
  }, [initialAddressData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedAddress = await updateClientAddress({ clientId, ...addressData }).unwrap();
      setAddressData(updatedAddress);
      toast.success('Adresse mise à jour avec succès');
    } catch (err) {
      toast.error(`Erreur ${err.data.statusCode}: ${err.data.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Modifier l'adresse du client
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Adresse
                </label>
                <input
                  type="text"
                  name="adresse"
                  value={addressData.adresse}
                  onChange={handleChange}
                  placeholder="Adresse"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Adresse 2
                </label>
                <input
                  type="text"
                  name="adresse2"
                  value={addressData.adresse2}
                  onChange={handleChange}
                  placeholder="Adresse 2"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ville
                </label>
                <input
                  type="text"
                  name="ville"
                  value={addressData.ville}
                  onChange={handleChange}
                  placeholder="Ville"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Code Postal
                </label>
                <input
                  type="text"
                  name="codePostal"
                  value={addressData.codePostal}
                  onChange={handleChange}
                  placeholder="Code Postal"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Pays
                </label>
                <input
                  type="text"
                  name="pays"
                  value={addressData.pays}
                  onChange={handleChange}
                  placeholder="Pays"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Mettre à jour l'adresse
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateClientAddressForm;
