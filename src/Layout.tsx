import React from "react";
import useInAppBypassing from "hook/useInAppBypassing";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  useInAppBypassing();

  return <>{children}</>;
}

export default Layout;
