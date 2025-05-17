import { isAxiosError } from "axios";
import { ShippingOrderAssignForm, ShippingOrderForm } from "../../types/TUser";
import httpClient from "../../utils/httpClient";
import { toast } from "sonner";

export const ShippingOrderService = () => {
  const shippingOrderCreate = async (credentials: ShippingOrderForm) => {
    try {
      const result = await httpClient.post("/shipment", credentials);
      toast.success("Se ha creado la orden de envío correctamente");
      return result.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const shippingOrderAssign = async (data: ShippingOrderAssignForm) => {
    try {
      const result = await httpClient.put("/shipment/assignRoute", data);
      toast.success("Se ha asignado la orden de envío correctamente");
      return result.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getShippingOrders = async (params?: string) => {
    try {
      const result = await httpClient.get("/shipment/userShipments/"+params);
      return result.data;
    //  toast.success("Se han cargado las ordenes de envío correctamente");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return { shippingOrderCreate, shippingOrderAssign, getShippingOrders };
};
