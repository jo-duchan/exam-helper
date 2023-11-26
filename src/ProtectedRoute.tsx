import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "firebase-config";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const location = useLocation();
  const user = auth.currentUser;

  if (user === null) {
    return <Navigate to={"/signin"} state={{ from: location }} replace />;
  }

  // user === true && userInfo(추가 정보)가 없을 경우 SignUp Page로 리다이텍트 필요.

  return children as JSX.Element;
}

export default ProtectedRoute;
