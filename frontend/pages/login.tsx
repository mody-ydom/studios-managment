// pages/login.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "@/services/apiServices";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/router";
import CustomInput from "@/src/components/form/Input";
import CustomButton from "@/src/components/form/Button";
import AuthForm from "@/src/components/form/AuthForm";
import { ILoginData } from "@/src/constants/types";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: ILoginData) => {
    try {
      const {data} = await loginUser({body});
      console.log('user data', data)
      dispatch(setUser(data));
      localStorage.setItem("accessToken", data.tokens.access)
      localStorage.setItem("refreshToken", data.tokens.refresh)
      router.push(data.user.user_type!=='studio_owner'?"/studios":"/studios/mine"); // Redirect to account page
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally update UI to show error messages
    }
  };

  return (
    <AuthForm
    onSubmit={handleSubmit(onSubmit)}
    type='sign-in'>
    
     
        <CustomInput
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          placeholder="Username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <CustomInput
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
         
         <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </CustomButton>
    </AuthForm>
  );
};

export default LoginPage;
