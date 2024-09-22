import SelectGroupDropdown from '../../Inputs/SelectGroupDropdown.tsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useSendOneTimeSearchRequestMutation
} from '../../../services/matching/MatchingApiSlice.ts';
import { toast } from 'react-toastify';

const OneTimeSearchForm: React.FC = () => {
  const [name, setName] = useState('');
  const [nature, setNature] = useState('');
  const navigate = useNavigate();

  const natureOptions = [{
    value: 'NATURAL',
    label: 'Personne physique',
  }, {
    value: 'LEGAL',
    label: 'Personne morale',
  }, {
    value: 'VESSEL',
    label: 'Navire',
  }];

  const [sendOneTimeSearchRequest] = useSendOneTimeSearchRequestMutation();

  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nature === '') {
      toast.error('Veuillez renseigner la nature de l\'entité');
      return;
    }
    if (name.length < 3) {
      toast.error('Le nom de l\'entité doit contenir au moins 3 caractères');
      return;
    }
    const data = {
      name,
      nature,
    };
    console.log(data);

    sendOneTimeSearchRequest(data)
      .unwrap()
      .then((res) => {
        navigate(`/one-time-search/${res.id}`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex flex-col gap-9">
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-5 flex flex-col gap-6 xl:flex-row">

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"> Nature </label>
                  <SelectGroupDropdown options={natureOptions} dropdownTitle={''}
                                       setSelectedOption={setNature} selectedOption={nature} />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nom de l'entité
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameInput}
                    placeholder="Nom de l'entité"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>

                <button
                  className="w-full xl:w-1/3 flex justify-center rounded bg-primary mb-6 mt-7.5 p-3 font-medium text-gray hover:bg-opacity-90">
                  Rechercher
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OneTimeSearchForm;
