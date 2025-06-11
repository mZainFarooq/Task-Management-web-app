import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";

const UnprotectedRoute = () => {
  const user = useSelector((state) => state.user);

  if (user === null) return <FullScreenLoader />;

  if (user) return <Navigate to="/tasks" replace />;

  return <Outlet />;
};

export default UnprotectedRoute;
