import { useQuery } from "@tanstack/react-query";
import { MetaDataService } from "../../services/metadata/MetaDataService";

export const useRoutesQuery = (options = {}) => {
  const { getRoutes } = MetaDataService();

  // Se usa useQuery directamente dentro del hook useAuth
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: getRoutes,
    queryKey: ["getRoutes"],
    retry: 1,
    refetchOnWindowFocus: true,
    ...options
  });

  return { data, isLoading, isError, refetch };
};
