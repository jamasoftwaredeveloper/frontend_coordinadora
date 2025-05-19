import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShippingOrderService } from "../../services/shipping/OrderService";

const { storeTransporter } = ShippingOrderService(); // Extraemos updateUser

export const useStoreTransporterMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: storeTransporter, // La función que realiza la mutación
    onError: (error) => {
      console.error("Error al crear transporte:", error);
      toast.error("Error al crear transporte. Inténtalo de nuevo.");
    },
    onSuccess: () => {
      // 🔄 Refresca la información del usuario en caché
      queryClient.invalidateQueries({ queryKey: ["getShippingOrders"] });
    },
  });

  return mutation;
};
