import { isAxiosError } from "axios";
import axios from "axios";
import { toast } from "sonner";
import { ValidationAddressForm } from "../../types/TShipmentOrder";

export const ValidationAddressService = () => {
  const validationAddress = async (credentials: ValidationAddressForm) => {
    try {
        const { street, city, state, postalCode, country } = credentials;
       
      const result = await axios.get(`${import.meta.env.VITE_API_VALIDATE_ADDRESS}?street=${street}&city=${city}&state=${state}&postalcode=${postalCode}&country=${country}&format=json&addressdetails=1`);
      return result.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };


  return { validationAddress };
};
