import CreateUserForm from './CreateUserForm.tsx';
import UpdatePasswordForm from './UpdatePasswordForm.tsx';
import UpdateUserForm from './UpdateUserForm.tsx';

type UserFormProps = { isNewUser: boolean; };
const UserForm = (props: UserFormProps) => {

  if (props.isNewUser) {
    return (<div><CreateUserForm></CreateUserForm></div>);
  }
  return (
    <div>
      <UpdateUserForm></UpdateUserForm>
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>);
};

export default UserForm;
