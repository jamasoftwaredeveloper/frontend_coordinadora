import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import { User } from "../types/TUser";
import { LogOut, User as UserIcon, ChevronDown, Menu, X } from "lucide-react";

type HeaderProps = {
  data: User;
};

export default function Header({ data }: HeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Cerrar el menú de perfil si estaba abierto
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header principal */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
          {/* Logo y nombre de la app */}
          <Link
            to="/admin"
            className="text-xl font-bold text-gray-800 flex items-center flex-shrink-0"
          >
            <span className="text-blue-600">Front-End</span>Coordinadora
          </Link>

          {/* Botón menú móvil */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Contenedor perfil y opciones usuario */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } w-full md:w-auto md:flex md:items-center md:gap-4`}
          >
            {/* Perfil */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center px-3 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors w-full md:w-auto"
              >
                <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                    <UserIcon size={16} />
                  </div>

                  {/* Ocultar email en pantallas muy pequeñas */}
                  <span className="font-medium text-gray-700 truncate max-w-[100px] md:max-w-full hidden sm:inline-block">
                    {data.email}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Menú desplegable del perfil */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <Link
                      to="/auth/login"
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        localStorage.clear()
                      }}
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
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Navegación principal */}
        <NavigationTabs />
        <Outlet />
      </main>

      {/* Sistema de notificaciones */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
