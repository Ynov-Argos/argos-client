import CreateUserForm from './CreateUserForm.tsx';
import UpdatePasswordForm from './UpdatePasswordForm.tsx';
import UpdateUserForm from './UpdateUserForm.tsx';

type UserFormProps = { isNewUser: boolean; user: { id: string; name: string; email: string; role: string; } | undefined };
const UserForm = (props: UserFormProps) => {

  if (props.isNewUser) {
    return (<div><CreateUserForm></CreateUserForm></div>);
  }
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <UpdateUserForm user={props.user}></UpdateUserForm>
      <UpdatePasswordForm userId={props.user?.id}></UpdatePasswordForm>
    </div>);
};

export default UserForm;
