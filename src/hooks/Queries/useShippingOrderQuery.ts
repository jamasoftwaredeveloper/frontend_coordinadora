import { useQuery } from "@tanstack/react-query";
import { ShippingOrderService } from "../../services/shipping/OrderService";
import { Filter } from "../../types/TShipmentOrder";

export const useShippingOrderQuery = (params: Filter) => {
  const { getShippingOrders } = ShippingOrderService();
  // Se usa useQuery con un parámetro opcional
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getShippingOrders(params),
    queryKey: ["getShippingOrders", params], // Agregar params para asegurar la actualización de los datos
    retry: 1,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, isError, refresh: () => getShippingOrders(params) };
};
