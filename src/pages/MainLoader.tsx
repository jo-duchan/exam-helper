import { Outlet, redirect, json } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import Utils from "utils/utils";
import Navigation from "components/common/Navigation";

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default MainLayout;

export async function loader() {
  const userKey = localStorage.getItem("userKey");
  if (!userKey) {
    return redirect("/signin");
  }

  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${userKey}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

  localStorage.setItem("sheetId", Utils.convertSheetUrl(data.sheetUrl));

  return data;
}
