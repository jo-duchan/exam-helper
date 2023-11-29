import React, { useEffect } from "react";
import { ScrollRestoration, Outlet } from "react-router-dom";
import { auth } from "firebase-config";
import inAppBypassing from "utils/inAppBypassing";

function Layout() {
  useEffect(() => {
    inAppBypassing();

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // currentUser 전역 상태 저장.
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default Layout;
