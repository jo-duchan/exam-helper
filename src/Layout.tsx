import { useEffect } from "react";
import { ScrollRestoration, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "store/auth.slice";
import { auth } from "firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import inAppBypassing from "utils/inAppBypassing";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    inAppBypassing();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName!,
            email: currentUser.email!,
            createdAt: currentUser.metadata.creationTime!,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default Layout;
