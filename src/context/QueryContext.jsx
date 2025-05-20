import { createContext, useContext } from "react";
import { useRoutesQuery } from "../hooks/Queries/useRoutesQuery";
import { useTransportersQuery } from "../hooks/Queries/useTransportersQuery";
// Creamos el contexto
const QueryContext = createContext(null);

// Este es el proveedor del contexto que envolverá tu aplicación
export function QueryProvider({ children }) {
  // Consulta para las rutas
  const token = localStorage.getItem("token");
  
  // Solo ejecutar las queries si hay token
  const routesQuery = useRoutesQuery({ enabled: !!token });
  const transportersQuery = useTransportersQuery({ enabled: !!token });

  // El valor que proporcionamos al contexto incluye ambos resultados de useQuery
  const value = {
    // Datos de rutas
    routes: {
      data: routesQuery.data,
      isLoading: routesQuery.isLoading,
      isError: routesQuery.isError,
    },
    // Datos de transportadores
    transporters: {
      data: transportersQuery.data,
      isLoading: transportersQuery.isLoading,
      isError: transportersQuery.isError,
    },
    // Estado de carga general (true si alguna consulta está cargando)
    isLoading: routesQuery.isLoading || transportersQuery.isLoading,
    // Estado de error general (true si alguna consulta tiene error)
    isError: routesQuery.isError || transportersQuery.isError,
    // Función para recargar todos los datos
    refetchAll: () => {
      routesQuery.refetch();
      transportersQuery.refetch();
    },
  };

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
}

// Hook personalizado para acceder fácilmente al contexto
export function useQueryContext() {
  const context = useContext(QueryContext);
  if (context === null) {
    throw new Error("useQueryContext debe usarse dentro de un QueryProvider");
  }
  return context;
}
