import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectGroupDropdown from '../SelectGroupDropdown.tsx';
import { useCreateUserMutation } from '../../../services/user/UserApiSlice.ts';

const CreateUserForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [createUser] = useCreateUserMutation();

  const roleOptions = [{value: 'ADMIN', label: 'Admin'}, {value: 'STAFF', label: 'Staff'}];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('passwords do not match');
      return;
    }
    const user = { email, name, password, role };
    console.log(user);
    try {
      const data = await createUser(user).unwrap();
      console.log(data);
    } catch (err) {
      console.log(err);
      if (err.data.statusCode === 400) {
        toast.error("L'e-mail est déjà utilisé");
      } else {
        toast.error(`Error: ${err.data.message}`);

      }
    }
  };

  const handleNameInput = (e) => { setName(e.target.value); };
  const handleEmailInput = (e) => { setEmail(e.target.value); };
  const handlePasswordInput = (e) => { setPassword(e.target.value); };
  const handleConfirmPasswordInput = (e) => { setConfirmPassword(e.target.value); };

  return (
    <div className="">
      <div className="flex flex-col gap-9">
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Nouvel Utilisateur
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nom & Prénom
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameInput}
                    placeholder="Nom & Prénom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailInput}
                    placeholder="yourmail@gmail.com"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordInput}
                    placeholder="Mot de passe"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordInput}
                    placeholder="Confirmer le mot de passe"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white"> Rôle </label>
                <SelectGroupDropdown options={roleOptions} dropdownTitle={''} setSelectedOption={setRole} selectedOption={role}/>
              </div>


                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Créer l'utilisateur
                </button>
              </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
);
};

export default CreateUserForm;
