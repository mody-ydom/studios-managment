// components/LogoutButton.tsx
import {Typography} from "@mui/material";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");  // Clear tokens if stored in localStorage
    localStorage.removeItem("refreshToken");
    dispatch(clearUser());
    router.push("/login");  // Redirect to login
  };

  return (
    <Typography onClick={handleLogout} textAlign="center" sx={{color: '#1EABE3'}}>
      Logout
    </Typography>
  );
};

export default LogoutButton;
