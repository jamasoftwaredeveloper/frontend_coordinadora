import { useQuery } from "@tanstack/react-query";
import { MetaDataService } from "../../services/metadata/MetaDataService";

export const useRoutesQuery = () => {
  const { getRoutes } = MetaDataService();

  // Se usa useQuery directamente dentro del hook useAuth
  const { data, isLoading, isError } = useQuery({
    queryFn: getRoutes,
    queryKey: ["getRoutes"],
    retry: 1,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, isError };
};
