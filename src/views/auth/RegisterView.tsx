import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RegisterForm } from "../../types/TUser";
import ErrorMessage from "../../components/ErrorMessage";
import { AuthService } from "../../services/auth/AuthService";
import { useState } from "react";

export default function RegisterView() {
    const navigate = useNavigate();
    const { register: registerUser } = AuthService();
    const [isLoading, setIsLoading] = useState(false);
    
    const initialValues = {
        name: '',
        handle: '',
        email: '',
        password: '',
        password_confirmation: ''
    };

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<RegisterForm>({ defaultValues: initialValues });

    const handleRegister = async (formData: RegisterForm) => {
        try {
            setIsLoading(true);
            await registerUser(formData);
            reset();
            navigate("/admin/shipping/order");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                {/* Logo centrado con tamaño adecuado */}
                <div className="flex justify-center">
                    <img 
                        src="/logo.svg" 
                        alt="Logotipo Devtree" 
                        className="h-16 w-auto mx-auto mb-2"
                    />
                </div>
                <p className="text-gray-600 mt-1">Portal de Acceso</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#1063AC] py-3">
                    <h2 className="text-xl text-white font-bold text-center">Crear Cuenta</h2>
                </div>
                
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="px-6 py-6 space-y-4"
                    noValidate
                >
                    <div className="space-y-1">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu nombre completo"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1063AC] focus:border-[#1063AC]"
                            {...register('name', {
                                required: "El nombre es obligatorio"
                            })}
                        />
                        {errors?.name && <ErrorMessage>{errors?.name.message}</ErrorMessage>}
                    </div>
                    
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="usuario@ejemplo.com"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1063AC] focus:border-[#1063AC]"
                            {...register('email', {
                                required: "El correo electrónico es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Formato de correo electrónico no válido",
                                },
                            })}
                        />
                        {errors?.email && <ErrorMessage>{errors?.email.message}</ErrorMessage>}
                    </div>
                                        
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1063AC] focus:border-[#1063AC]"
                            {...register('password', {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres"
                                }
                            })}
                        />
                        {errors?.password && <ErrorMessage>{errors?.password.message}</ErrorMessage>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 block">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="Repita la contraseña"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1063AC] focus:border-[#1063AC]"
                            {...register('password_confirmation', {
                                required: "Confirmar contraseña es obligatorio",
                                validate: value => value === watch('password') || "Las contraseñas no coinciden"
                            })}
                        />
                        {errors?.password_confirmation && <ErrorMessage>{errors?.password_confirmation.message}</ErrorMessage>}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                                isLoading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-[#1063AC]"
                            }`}
                        >
                            {isLoading ? "Procesando..." : "Crear Cuenta"}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="text-center mt-4">
                <p className="text-gray-600">
                    ¿Ya tiene una cuenta?{" "}
                    <Link to="/auth/login" className="text-[#1063AC] hover:text-blue-800 font-medium">
                        Inicie sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}