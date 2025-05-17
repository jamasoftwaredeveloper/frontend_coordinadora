
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import { User } from "../types/TUser";
import { LogOut, User as UserIcon, ChevronDown } from "lucide-react";

type HeaderProps = {
    data: User;
};

export default function Header({ data }: HeaderProps) {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <div className="flex flex-col w-full">
            {/* Header principal */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo y nombre de la app */}
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-800">
                                <span className="text-blue-600">Front-End</span>Coordinadora
                            </Link>
                        </div>

                        {/* Perfil y opciones del usuario */}
                        <div className="relative">
                            <button
                                onClick={toggleProfileMenu}
                                className="flex items-center px-3 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">

                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                        <UserIcon size={16} />
                                    </div>

                                    <span className="font-medium text-gray-700">{data.email}</span>
                                    <ChevronDown size={16} className={`text-gray-500 transition-transform ${isProfileMenuOpen ? "rotate-180" : ""}`} />
                                </div>
                            </button>

                            {/* Menú desplegable del perfil */}
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">

                                    <div className="p-2">
                                        <Link
                                            to="/logout"
                                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            <LogOut size={16} />
                                            <span>Cerrar sesión</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>


            {/* Contenido principal */}
            <main className="container mx-auto px-4 py-6">
                {/* Navegación principal */}
                <NavigationTabs />
                <Outlet />
            </main>

            {/* Sistema de notificaciones */}
            <Toaster position="top-right" richColors closeButton />
        </div>
    );
}