import { useEffect } from "react";
import { ScrollRestoration, Outlet, useNavigate } from "react-router-dom";
import store from "store/store";
import { setUser, removeUser } from "store/auth.slice";
import { auth } from "firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { showToast } from "utils/overlays";
import inAppBypassing from "utils/inAppBypassing";

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    inAppBypassing();
    onAuthStateChanged(auth, (currentUser) => {
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
        showToast("다음에 또 만나요.", "notify");
        navigate("/");
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

export async function loader() {
  const user = auth.currentUser;

  if (user) {
    store.dispatch(
      setUser({
        uid: user.uid,
        displayName: user.displayName!,
        email: user.email!,
        createdAt: user.metadata.creationTime!,
      })
    );
  }

  return null;
}
