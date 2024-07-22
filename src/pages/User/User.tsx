import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { useGetUserQuery } from '../../services/user/UserApiSlice.ts';
import Loader from '../../common/Loader';


const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {data: user, isLoading, isError, isSuccess, error} = useGetUserQuery(id);

  useEffect(() => {
    if (isError) {
      console.log(error);
    } else if (isSuccess) {
      console.log(user);
    }
  }, [isError, error, isSuccess, user]);




  return isLoading ? (<Loader></Loader>) : (
    <DefaultLayout>
      <div>
        <h1>Hello User n°{id}</h1>
      </div>
    </DefaultLayout>
  );
}

export default User;
