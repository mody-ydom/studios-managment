// pages/account.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LogoutButton from "@/src/components/LogoutButton";
import { Box, Typography } from "@mui/material";

const AccountPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      minWidth="100vw"
    >
      
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.username || "User"}!
      </Typography>
      <Box
        textAlign="left"
        p={4}
        bgcolor="background.paper"
        borderRadius="borderRadius"
        boxShadow={3}
      >
        <Typography>
          <strong>Username:</strong> {user?.username}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user?.email}
        </Typography>
        <Typography>
          <strong>User Type:</strong> {user?.user_type}
        </Typography>
        <Typography>
          <strong>User ID:</strong> {user?.id}
        </Typography>
        <Typography>
          <strong>Is Staff:</strong> {user?.is_staff ? "Yes" : "No"}
        </Typography>
        <Typography>
          <strong>Is Verified:</strong> {user?.is_verified ? "Yes" : "No"}
        </Typography>
      </Box>
      <LogoutButton />
    </Box>
  );
};

export default AccountPage;
