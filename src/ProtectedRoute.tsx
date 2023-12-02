import React from "react";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  return user ? (
    (children as JSX.Element)
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
