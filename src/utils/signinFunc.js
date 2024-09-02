import useTaskStore from "../store/user";
import apiInstance from "./axiosInstance";
import { BASE_URL } from "./constants";

export const login = async (email, password) => {
  try {
    const { data, status } = await apiInstance.post('/auth/login/', {
      email,
      password,
    });

    if (status === 200) {
      const token = data.token; // Assuming the backend returns the token in the "token" field
      useTaskStore.getState().updateToken(token);
      
      // Optionally, you can call an initialize function to handle rehydration
      // useTaskStore.getState().initialize();

      alert('Signed In Successfully!');
      return { data: data, error: null };
    }
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: error.response?.data?.detail || 'Something went wrong',
    };
  }
};


export const signup = async (
  first_name,
  last_name,
  email,
  password,
  password2
) => {
  try {
    const { data, status } = await apiInstance.post("/auth/register/", {
      firstname:first_name,
      lastname:last_name,
      email:email,
      password:password,
      confirm_password:password2
    });

    await login(email, password);

    //Alert - Sign Up Successfully
    alert("Sign In successfully")

    return { data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: error.response || "Something went wrong",
    };
  }
};

export const logout = () => {

    useTaskStore.getState().logout();
  //Alert Signed out Successfully
    alert("Signed out successfully");
};
