import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { LoginForm } from "../../types/TUser";
import ErrorMessage from "../../components/ErrorMessage";
import { AuthService } from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginView() {
    const navigate = useNavigate();
    const { login } = AuthService();
    const [isLoading, setIsLoading] = useState(false);
    
    const defaultValues = {
        email: '',
        password: ''
    };
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginForm>({ defaultValues });
    
    async function handleLogin(data: LoginForm) {
        try {
            setIsLoading(true);
            await login(data);
            reset();
            navigate("/admin/shipping/order");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    {/* Logo centrado con tamaño adecuado */}
                    <div className="flex justify-center">
                        <img 
                            src="/logo.svg" 
                            alt="Logotipo Devtree" 
                            className="h-20 w-auto mx-auto mb-4"
                        />
                    </div>
                    <p className="text-gray-600 mt-2">Portal de Acceso</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-[#1063AC] py-4">
                        <h2 className="text-2xl text-white font-bold text-center">Iniciar Sesión</h2>
                    </div>
                    
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="px-6 py-8 space-y-6"
                        noValidate
                    >
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="usuario@ejemplo.com"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1063AC] focus:border-[#1063AC]"
                                {...register("email", {
                                    required: "El correo electrónico es obligatorio",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Formato de correo electrónico no válido",
                                    },
                                })}
                            />
                            {errors.email && (
                                <ErrorMessage>{errors.email.message}</ErrorMessage>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                    Contraseña
                                </label>
                                <Link to="/auth/forgot-password" className="text-sm text-[#1063AC] hover:text-blue-900">
                                    ¿Olvidó su contraseña?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1063AC] focus:border-[#1063AC]"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                })}
                            />
                            {errors.password && (
                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                            )}
                        </div>
                        
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
                                    isLoading 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-[#1063AC]"
                                }`}
                            >
                                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        ¿No tiene una cuenta?{" "}
                        <Link to="/auth/register" className="text-[#1063AC] hover:text-blue-900 font-medium">
                            Regístrese aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}