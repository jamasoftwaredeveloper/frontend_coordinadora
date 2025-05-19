import { useForm, SubmitHandler } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useStoreTransporterMutation } from "../hooks/Mutations/useStoreTransporterMutation";
import { TransporterForm } from "../types/TShipmentOrder";
import { useNavigate } from "react-router-dom";

interface CreateTransporterViewProps {
    prefix?: string;
    title?: string;
}

export default function CreateTransporterView({
    prefix = '',
    title = 'Crear transporte.',
}: CreateTransporterViewProps) {

    const { mutate: storeTransporter } = useStoreTransporterMutation();
    
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<TransporterForm>();

    const fields: { name: keyof TransporterForm; label: string; placeholder: string }[] = [
        { name: 'name', label: 'Nombre', placeholder: 'Ingrese el nombre' },
        { name: 'vehicle_capacity', label: 'Capacidad del vehículo', placeholder: 'Ingrese la capacidad del vehículo' },
    ];

    const onSubmit: SubmitHandler<TransporterForm> = async data => {
        await storeTransporter(data);
        navigate("/admin/list");
    };

    // Helper para manejar el nombre con prefix (si lo usas)
    const getFieldName = (name: keyof TransporterForm) => prefix ? `${prefix}.${name}` : name;

    // Helper para acceder a errores con o sin prefix
    const getError = (name: keyof TransporterForm) => {
        if (prefix) {
            return prefix ? (errors[prefix as keyof typeof errors] as Record<keyof TransporterForm, { message: string }>)?.[name] : errors[name];
        }
        return errors[name];
    };

    return (
        <div>
            <form
                className="container p-6 rounded-lg shadow-md space-y-6 bg-gray-50"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <legend className="text-2xl text-slate-800 text-center mb-4"><strong>{title}</strong></legend>

                {fields.map(({ name, label, placeholder }) => (
                    <div key={String(name)} className="flex flex-col">
                        <label className="text-gray-700 font-medium" htmlFor={String(name)}>{label}:</label>
                        <input
                            id={String(name)}
                            type={name === "name" ? "text" : "number"}
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder={placeholder}
                            {...register(getFieldName(name) as keyof TransporterForm, { required: `${label} es obligatorio` })}
                        />
                        {getError(name) && (
                            <ErrorMessage>{getError(name)?.message}</ErrorMessage>
                        )}
                    </div>
                ))}

                <div className="text-center mt-4">
                    <input
                        type="submit"
                        className="bg-[#1063AC] text-white p-3 rounded-lg font-bold hover:bg-[#0E568E] cursor-pointer"
                        value="Crear Orden"
                    />
                </div>
            </form>
        </div>
    );
}
