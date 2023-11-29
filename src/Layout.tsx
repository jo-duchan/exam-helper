import React, { useEffect } from "react";
import { ScrollRestoration, Outlet } from "react-router-dom";
import store from "store/store";
import { setUser, removeUser } from "store/auth.slice";
import { auth } from "firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import inAppBypassing from "utils/inAppBypassing";

function Layout() {
  useEffect(() => {
    inAppBypassing();
  }, []);

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default Layout;

export async function loader() {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      store.dispatch(
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName!,
          email: currentUser.email!,
          createdAt: currentUser.metadata.creationTime!,
        })
      );
    } else {
      store.dispatch(removeUser());
    }
  });

  return null;
}
