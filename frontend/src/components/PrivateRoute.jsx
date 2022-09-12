import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  return user !== null ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;
