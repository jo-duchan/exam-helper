import React from "react";
import { ScrollRestoration } from "react-router-dom";
import useInAppBypassing from "hook/useInAppBypassing";
import ProtectedRoute from "ProtectedRoute";

interface Props {
  children: React.ReactNode;
  withAuth: boolean;
}

function Layout({ children, withAuth }: Props) {
  useInAppBypassing();

  return (
    <>
      {withAuth ? <ProtectedRoute>{children}</ProtectedRoute> : children}
      <ScrollRestoration />
    </>
  );
}

export default Layout;
