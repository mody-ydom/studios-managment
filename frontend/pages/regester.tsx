import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IRegisterData, registerUser } from "@/services/api";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import {MenuItem} from "@mui/material";
import { useRouter } from "next/router";
import CustomInput from "@/src/components/form/Input";
import CustomSelect from "@/src/components/form/SelectInput";
import CustomButton from "@/src/components/form/Button";
import AuthForm from "@/src/components/form/AuthForm";

const schema = yup
  .object({
    username: yup.string().required("username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match"),
    userType: yup
      .mixed<"studio_owner" | "customer" | "admin">()
      .oneOf(["studio_owner", "customer", "admin"], "Invalid user type")
      .required("User type is required"),
  })
  .required();

const RegisterPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IRegisterData) => {
    try {
      const registrationData = {
        username: data.username,
        email: data.email,
        password: data.password,
        userType: data.userType,
      };
      const response = await registerUser(registrationData);
      dispatch(
        setUser({
          user: response.user,
          tokens: response.tokens,
        })
      );
      router.push(response.user.user_type!=='studio_owner'?"/studios":"/studios/mine"); // Redirect to account page
      console.log("Registration successful", response);
      // Redirect or update UI here
    } catch (error) {
      console.error("Registration failed:", error);
      // Update UI to show error messages
    }
  };

  return (
    <AuthForm
    onSubmit={handleSubmit(onSubmit)}
    >
    
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
          id="email"
          label="Email"
          placeholder="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
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
          <CustomSelect
          error={!!errors.userType}
            id="userType"
            label="User Type"
            placeholder="User Type"
            helperText={errors.userType?.message}
            variant="outlined"
            multiple={false}
            {...register("userType")}
          >
            <MenuItem value="studio_owner">Studio Owner</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </CustomSelect>
         
        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </CustomButton>
    </AuthForm>
  );
};

export default RegisterPage;
