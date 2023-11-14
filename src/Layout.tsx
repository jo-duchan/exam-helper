import React from "react";
import { ScrollRestoration } from "react-router-dom";
import useInAppBypassing from "hook/useInAppBypassing";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  useInAppBypassing();

  return (
    <>
      {children}
      <ScrollRestoration />
    </>
  );
}

export default Layout;
