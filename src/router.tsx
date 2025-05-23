import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import ListShippingOrderView from "./views/ListShippingOrderView";
import ShippingOrderView from "./views/ShippingOrderView";
import AdminGuard from "./guard/AdminGuard";
import CreateTransporterView from "./views/CreateTransporterView";
import PerformanceMetrics from "./views/PerformanceMetrics";


export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" />} />
                <Route element={<AuthLayout />}>

                    <Route path="/auth/login" element={<LoginView />} />

                    <Route path="/auth/register" element={<RegisterView />} />
                </Route>
                <Route path="/admin" element={<AppLayout />}>
                    <Route index={true} element={<PerformanceMetrics />} />
                    <Route path="list" element={<ListShippingOrderView />} />
                    <Route path="shipping/order" element={<ShippingOrderView />} />
                    <Route path="shipping/assign" element={<ShippingOrderView />} />
                    <Route element={<AdminGuard />}>
                        <Route path="transporter" element={<CreateTransporterView />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}