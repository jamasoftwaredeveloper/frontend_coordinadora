import { useQuery } from "@tanstack/react-query";

import { MetaDataService } from "../../services/metadata/MetaDataService";

export const useTransportersQuery = () => {
  const { getTransporters } = MetaDataService();

  // Se usa useQuery directamente dentro del hook useAuth
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: getTransporters,
    queryKey: ["getTransporters"],
    retry: 1,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, isError, refetch};
};
