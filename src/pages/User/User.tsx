import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { useGetUserQuery } from '../../services/user/UserApiSlice.ts';
import Loader from '../../common/Loader';
import UserForm from '../../components/Forms/User/UserForm.tsx';

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isNewUser, setIsNewUser] = useState(true);

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetUserQuery(id);

  useEffect(() => {
    if (isError) {
      // @ts-ignore
      if (error.data.statusCode === 404) {
        console.log('User not found');
        setIsNewUser(true);
      }
    } else if (isSuccess) {
      setIsNewUser(false);
    }
  }, [isError, error, isSuccess, user]);




  return isLoading ? (<Loader></Loader>) : (<DefaultLayout>
    <div>
      <UserForm isNewUser={isNewUser} user={user}></UserForm>
    </div>
  </DefaultLayout>)
}

export default User;
