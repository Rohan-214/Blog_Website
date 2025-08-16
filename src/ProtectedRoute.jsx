import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    // Redirect to login if not authenticate
    //console.log("working");
    return <Navigate to="/login" replace />;
  }

  // Render the child routes
  return <Outlet />;
}

export default ProtectedRoute;