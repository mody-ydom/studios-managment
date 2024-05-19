// services/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Replace with your actual API URL

export type IRegisterData = {
  username: string;
  email: string;
  password: string;
  userType: "admin" | "customer" | "studio_owner";
};
export type ILoginData = {
  username: string;
  password: string;
};

export const registerUser = async ({
  username,
  email,
  password,
  userType: user_type,
}: IRegisterData) => {
  try {
    // Perform the registration via a POST request
    const response = await axios.post(`${API_BASE_URL}/accounts/`, {
      username,
      email,
      password,
      user_type,
    });

    // Extract tokens from the response
    const { access, refresh } = response.data.tokens;

    // Optionally, store the tokens in localStorage or handle them in another secure way
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    // Return the complete response data to be used in the frontend application
    return response.data;
  } catch (error) {
    // Handle errors in registration or API call
    if (axios.isAxiosError(error)) {
      // Extract and throw custom error messages or fall back to a generic error
      throw new Error(
        error.response?.data.detail ||
          "An unknown error occurred during registration."
      );
    } else {
      // Handle non-Axios errors
      throw new Error("A non-axios error occurred");
    }
  }
};

export const loginUser = async ({ username, password }: ILoginData):Promise<{user:any, tokens:any}> => {
  try {
    // Perform the registration via a POST request
    const response = await axios.post(`${API_BASE_URL}/accounts/login/`, {
      username,
      password,
    });

    // Extract tokens from the response
    const { access, refresh } = response.data.tokens;

    // Optionally, store the tokens in localStorage or handle them in another secure way
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    
    return {
        tokens: response.data.tokens,
        user: response.data.user
    };
  } catch (error) {
    // Handle errors in registration or API call
    if (axios.isAxiosError(error)) {
      // Extract and throw custom error messages or fall back to a generic error
      throw new Error(
        error.response?.data.detail ||
          "An unknown error occurred during registration."
      );
    } else {
      // Handle non-Axios errors
      throw new Error("A non-axios error occurred");
    }
  }
};


