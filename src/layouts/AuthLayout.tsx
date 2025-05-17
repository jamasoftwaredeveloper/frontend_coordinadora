import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
    return (
        <>
            <div className="bg-white flex flex-col items-center justify-center">
                <div className="w-full max-w-lg px-5 py-8">
                    <Outlet />
                </div>
            </div>
            <Toaster position="top-right" />
        </>
    )
}