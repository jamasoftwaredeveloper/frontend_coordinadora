import { isAxiosError } from "axios";
import {
  Filter,
  ParamUpdateStatus,
  ShippingOrderAssignForm,
  ShippingOrderForm,
} from "../../types/TShipmentOrder";
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

  const getShippingOrders = async (params?: Filter) => {
    try {
      const filters = params;

      const result = await httpClient.get("/shipment/userShipments", {
        params: filters,
      });
      return result.data;
      //  toast.success("Se han cargado las ordenes de envío correctamente");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const updateStatus = async (data?: ParamUpdateStatus) => {
    try {
      const result = await httpClient.put("/shipment/updateStatus", data);
      toast.success("La ordenes de envío, fue actualizada correctamente");
      return result.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getMonthlyPerformanceMetrics = async (params?: Filter) => {
    try {
      const filters = params;

      const result = await httpClient.get(
        "/shipment/getMonthlyPerformanceMetrics",
        {
          params: filters,
        }
      );
      return result.data;
      //  toast.success("Se han cargado las ordenes de envío correctamente");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  const getRoutePerformanceMetrics = async (params?: Filter) => {
    try {
      const filters = params;

      const result = await httpClient.get(
        "/shipment/getRoutePerformanceMetrics",
        {
          params: filters,
        }
      );
      return result.data;
      //  toast.success("Se han cargado las ordenes de envío correctamente");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getTransporterPerformanceMetrics = async (params?: Filter) => {
    try {
      const filters = params;

      const result = await httpClient.get(
        "/shipment/getTransporterPerformanceMetrics",
        {
          params: filters,
        }
      );
      return result.data;
      //  toast.success("Se han cargado las ordenes de envío correctamente");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return {
    shippingOrderCreate,
    shippingOrderAssign,
    getShippingOrders,
    updateStatus,
    getMonthlyPerformanceMetrics,
    getRoutePerformanceMetrics,
    getTransporterPerformanceMetrics,
  };
};
