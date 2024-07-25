import { useState } from 'react';
import { useUpdatePasswordMutation } from '../../../services/user/UserApiSlice.ts';
import { toast, ToastContainer } from 'react-toastify';

const UpdatePasswordForm = (props: {userId: string}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

  const [updatePassword] = useUpdatePasswordMutation();

  const handlePasswordInput = (e) => {setPassword(e.target.value)};
  const handleNewPasswordInput = (e) => {setNewPassword(e.target.value)};
  const handleConfirmedNewPasswordInput = (e) => {setConfirmedNewPassword(e.target.value)};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmedNewPassword) {
      toast.error('Les mots de passes ne correspondent pas');
      return;
    }
    const updatePasswordObject = {userId: props.userId, oldPassword: password, newPassword};

    try {
      await updatePassword(updatePasswordObject).unwrap();
      toast.success('Le mot de passe a bien été mis à jour');
    } catch (err) {
      // TODO inventorier toutes les erreurs possibles
      toast.error(`Error ${err.data.statusCode}: ${err.data.message}`);
    }
  }

  return (
      <div className="flex flex-col gap-9">
        {/* <!-- Survey Form --> */}
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Modifier le Mot de Passe
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-5">
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

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordInput}
                  placeholder="Nouveau mot de passe"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Confirmer mot de passe
                </label>
                <input
                  type="password"
                  value={confirmedNewPassword}
                  onChange={handleConfirmedNewPasswordInput}
                  placeholder="Confirmer le mot de passe"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
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

export default UpdatePasswordForm;
