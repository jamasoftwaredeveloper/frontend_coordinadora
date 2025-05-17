import { Navigate } from "react-router-dom";

import Header from "../components/Header";
import { useUserAuthQuery } from "../hooks/Queries/useAuthQuery";

export default function AppLayout() {
    const { data, isLoading, isError } = useUserAuthQuery();


    if (isLoading) {
        return "Cargando...";
    }
    if (isError) {
        return <Navigate to={'/auth/login'} />
    }

    if (data) return <Header data={data} />
}