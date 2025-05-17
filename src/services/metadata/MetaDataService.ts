import { isAxiosError } from "axios";
import { toast } from "sonner";
import httpClient from "../../utils/httpClient";

export const MetaDataService = () => {
  const getRoutes = async () => {
    try {
      interface RoutesResponse {
        routes: { id: string; name: string }[]; // Replace with the actual structure of the routes
      }
      const result = await httpClient.get<RoutesResponse>("/shipment/allRoutes");
      return result.data.routes;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getTransporters = async () => {
    try {
      interface TransportersResponse {
        transporters: { id: string; name: string }[]; // Replace with the actual structure of the transporters
      }
      const result = await httpClient.get<TransportersResponse>("/shipment/allTransporters");
      return result.data.transporters;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return { getRoutes, getTransporters };
};
