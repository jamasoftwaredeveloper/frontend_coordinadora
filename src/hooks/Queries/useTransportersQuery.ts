import { useQuery } from "@tanstack/react-query";

import { MetaDataService } from "../../services/metadata/MetaDataService";

export const useTransportersQuery = (options = {}) => {
  const { getTransporters } = MetaDataService();

  // Se usa useQuery directamente dentro del hook useAuth
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: getTransporters,
    queryKey: ["getTransporters"],
    retry: 1,
    refetchOnWindowFocus: true,
    ...options
  });

  return { data, isLoading, isError, refetch};
};
