import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem('token');

  if (userToken == null) {
    // vérification si l'utilisateur est bien connecté, sinon on redirige
    return <Navigate to="/login" />;
  }

  return children;
};