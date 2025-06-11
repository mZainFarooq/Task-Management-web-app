import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user);

  if (user === null) return <FullScreenLoader />;

  if (user === false) return <Navigate to="/signin" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
