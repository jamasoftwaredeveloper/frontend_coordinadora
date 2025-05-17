import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShippingOrderService } from "../../services/shipping/OrderService";

const { shippingOrderCreate } = ShippingOrderService(); // Extraemos updateUser

export const useShippingOrderMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: shippingOrderCreate, // La función que realiza la mutación
    onError: (error) => {
      console.error("Error al actualizar perfil:", error);
      toast.error("Error al actualizar perfil. Inténtalo de nuevo.");
    },
    onSuccess: () => {      
      // 🔄 Refresca la información del usuario en caché
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  return mutation;
};
