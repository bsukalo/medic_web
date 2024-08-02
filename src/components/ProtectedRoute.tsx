import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectedRoute = () => {
	return useAuth() ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
