// UserSetup.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setUser } from '@/store/userSlice';
import { retrieveUser } from '@/services/apiServices';

const UserSetup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("accessToken")&&
    retrieveUser({ params: { id: 0 } })
      .then(({ data: user }) => {
        dispatch(setUser({
          user,
          tokens: {
            access: localStorage.getItem("refreshToken") as string,
            refresh: localStorage.getItem("accessToken") as string,
          },
        }));
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  }, [dispatch, router]);

  return null;  // This component does not render anything
};

export default UserSetup;
