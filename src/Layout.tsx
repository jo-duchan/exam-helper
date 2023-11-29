import React, { useEffect } from "react";
import { ScrollRestoration, Outlet } from "react-router-dom";
import { RootState } from "store/store";
import { useDispatch } from "react-redux";
import { setUser } from "store/auth.slice";
import { auth } from "firebase-config";
import inAppBypassing from "utils/inAppBypassing";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    inAppBypassing();

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      dispatch(setUser(currentUser));
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
