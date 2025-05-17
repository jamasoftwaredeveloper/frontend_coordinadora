import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { ShippingOrderForm } from "../types/TUser";
import { useShippingOrderMutation } from "../hooks/Mutations/useShippingOrderMutation";
import { toast } from "sonner";
import { ValidationAddressService } from "../services/validationAddress/ValidationAddressService";

// Componente para la información del paquete
function PackageInfoForm({ register, errors }: any) {
    const fields = [
        { name: 'weight', label: 'Peso (kg)', placeholder: 'Ingrese el peso' },
        { name: 'height', label: 'Altura (cm)', placeholder: 'Ingrese la altura' },
        { name: 'width', label: 'Ancho (cm)', placeholder: 'Ingrese el ancho' },
        { name: 'length', label: 'Longitud (cm)', placeholder: 'Ingrese la longitud' },
        { name: 'productType', label: 'Tipo de Producto', placeholder: 'Especifique el tipo' }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {fields.map(({ name, label, placeholder }) => (
                <div key={name} className="flex flex-col">
                    <label className="text-gray-700 font-medium">{label}:</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder={placeholder}
                        {...register(`packageInfo.${name}`, { required: `${label} es obligatorio` })}
                    />
                    {errors.packageInfo?.[name] && (
                        <ErrorMessage>{errors.packageInfo[name].message}</ErrorMessage>
                    )}
                </div>
            ))}
        </div>
    );
}

// Componente para la dirección (salida o destino)
function AddressForm({ register, errors, prefix, title }: any) {
    const fields = [
        { name: 'street', label: 'Calle', placeholder: 'Ingrese la calle' },
        { name: 'city', label: 'Ciudad', placeholder: 'Ingrese la ciudad' },
        { name: 'state', label: 'Estado', placeholder: 'Ingrese el estado' },
        { name: 'postalCode', label: 'Código Postal', placeholder: 'Ingrese el código postal' },
        { name: 'country', label: 'País', placeholder: 'Ingrese el país' },
        { name: 'recipientName', label: 'Nombre del Destinatario', placeholder: 'Nombre completo' },
        { name: 'recipientPhone', label: 'Teléfono del Destinatario', placeholder: 'Número de teléfono' }
    ];

    return (
        <div>
            <h3 className="text-xl text-slate-600 mt-4"><strong>{title}.</strong></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {fields.map(({ name, label, placeholder }) => (
                    <div key={name} className="flex flex-col">
                        <label className="text-gray-700 font-medium">{label}:</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder={placeholder}
                            {...register(`${prefix}.${name}`, { required: `${label} es obligatorio` })}
                        />
                        {errors[prefix]?.[name] && (
                            <ErrorMessage>{errors[prefix][name].message}</ErrorMessage>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ShippingOrderView() {
    const { mutate: shippingOrderCreate } = useShippingOrderMutation();

    const defaultValues = {
        route_id: 0,
        transporter_id: 0,
        user_id: 0,
        packageInfo: { weight: '', height: '', width: '', length: '', productType: '' },
        exitAddress: { street: '', city: '', state: '', postalCode: '', country: '', recipientName: '', recipientPhone: '' },
        destinationAddress: { street: '', city: '', state: '', postalCode: '', country: '', recipientName: '', recipientPhone: '' }
    };

    const { register, handleSubmit, formState: { errors } } = useForm<ShippingOrderForm>({ defaultValues });
    async function handleUserProfileForm(data: ShippingOrderForm) {
        const { street, city, state, postalCode, country } = data.destinationAddress;
        const result = await ValidationAddressService().validationAddress({street, city, state, postalCode, country});
        if (result.length > 0) {
            toast.info("La dirección valida, continuará con el guardado.");
            shippingOrderCreate(data);
        }else {
            toast.error("La dirección ingresada no es valida.");
        }
    }

    return (

        <form className="container p-6 rounded-lg shadow-md space-y-6 bg-gray-50" onSubmit={handleSubmit(handleUserProfileForm)}>
            <legend className="text-2xl text-slate-800 text-center mb-4"><strong>Crear Orden de Envío.</strong></legend>
            <PackageInfoForm register={register} errors={errors} />
            <AddressForm register={register} errors={errors} prefix="exitAddress" title="Dirección de Salida" />
            <AddressForm register={register} errors={errors} prefix="destinationAddress" title="Dirección de Destino" />
            <div className="text-center mt-4">
                <input type="submit" className="bg-[#1063AC] text-white p-3 rounded-lg font-bold hover:bg-[#0E568E] cursor-pointer" value="Crear Orden" />
            </div>
        </form>

    );
}
