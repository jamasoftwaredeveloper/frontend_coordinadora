import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../../services/auth/AuthService";

export const useUserAuthQuery = () => {
  const { getUser } = AuthService();

  // Se usa useQuery directamente dentro del hook useAuth
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["getUser"],
    retry: 1,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, isError };
};
