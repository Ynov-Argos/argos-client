import { useState } from 'react';
import SelectGroupDropdown from '../SelectGroupDropdown.tsx';
import { useUpdateUserMutation } from '../../../services/user/UserApiSlice.ts';
import { toast, ToastContainer } from 'react-toastify';

const updateUserForm = ({user}) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');

  const [updateUser] = useUpdateUserMutation();

  const roleOptions = [{value: 'ADMIN', label: 'Admin'}, {value: 'STAFF', label: 'Staff'}];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToUpdate = {userId: user.id, name, email, role};
    try {
      const data = await updateUser(userToUpdate).unwrap();
      setName(data?.name);
      setEmail(data?.email);
      setRole(data?.role);
    } catch (err) {
      if (err.data.statusCode === 404) {
        toast.error('Utilisateur inexistant');
      } else {
        toast.error(`Erreur ${err.data.statusCode}: ${err.data.message}`);
      }
    }
  }

  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form 2 --> */}
      <div
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Modifier l'utilsateur
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => {setEmail(e.target.value)}}
                  placeholder="Email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"> Rôle </label>
                <SelectGroupDropdown options={roleOptions} dropdownTitle={''}
                                     setSelectedOption={setRole} selectedOption={role} />
              </div>
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Send Message
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default updateUserForm;
