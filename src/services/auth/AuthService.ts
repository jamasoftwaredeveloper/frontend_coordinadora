import { isAxiosError } from "axios";
import {
  LoginForm,
  RegisterForm,
  ResponseUser,
} from "../../types/TUser";
import httpClient from "../../utils/httpClient";
import { toast } from "sonner";

export const AuthService = () => {
  const login = async (credentials: LoginForm) => {
    try {
      const result = await httpClient.post("/auth/login", credentials);
      return result.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const register = async (userData: RegisterForm) => {
    try {
      const result = await httpClient.post("/auth/register", userData);
      console.log("result register", result);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getUser = async () => {
    try {
      const { data } = await httpClient.get<ResponseUser>("/auth/getUser");
      return data.user; // Retornar los datos esperados por react-query
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      throw error; // Asegurar que cualquier otro error también sea lanzado
    }
  };

  return { login, register, getUser };
};
