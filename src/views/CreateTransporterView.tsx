import ErrorMessage from "../components/ErrorMessage";

export default function CreateTransporterView({
    register = () => ({}),  // función vacía para que no rompa
    errors = {},
    prefix = '',
    title = 'Crear transporte.',
}: any) {
    const fields = [
        { name: 'name', label: 'Nombre', placeholder: 'Ingrese el nombre' },
        { name: 'vehicle_capacity', label: 'Capacidad del vehiculo', placeholder: 'Ingrese la capacidad del vehiculo' },
    ];

    return (
        <div>
            <form className="container p-6 rounded-lg shadow-md space-y-6 bg-gray-50">
                <legend className="text-2xl text-slate-800 text-center mb-4"><strong>{title}</strong></legend>
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
                <div className="text-center mt-4">
                    <input type="submit" className="bg-[#1063AC] text-white p-3 rounded-lg font-bold hover:bg-[#0E568E] cursor-pointer" value="Crear Orden" />
                </div>
            </form>
        </div>
    );
}
