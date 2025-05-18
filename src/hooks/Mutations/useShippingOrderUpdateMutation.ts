import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShippingOrderService } from "../../services/shipping/OrderService";

const { shippingOrderAssign } = ShippingOrderService(); // Extraemos updateUser

export const useShippingOrderUpdateMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: shippingOrderAssign, // La función que realiza la mutación
    onError: (error) => {
      console.error("Error al actualizar perfil:", error);
      toast.error("Error al actualizar perfil. Inténtalo de nuevo.");
    },
    onSuccess: () => {
      // 🔄 Refresca la información del usuario en caché
      queryClient.invalidateQueries({ queryKey: ["getShippingOrders"] });
    },
  });

  return mutation;
};
