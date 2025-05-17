import { isAxiosError } from "axios";
import { toast } from "sonner";
import httpClient from "../../utils/httpClient";

export const MetaDataService = () => {
  const getRoutes = async () => {
    try {
      const result = await httpClient.get("/shipment/allRoutes");
      return result.data.routes;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getTransporters = async () => {
    try {
      const result = await httpClient.get("/shipment/allTransporters");
      return result.data.transporters;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return { getRoutes, getTransporters };
};
