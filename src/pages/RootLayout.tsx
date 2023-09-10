import React, { useEffect } from "react";
import { Outlet, useNavigate, redirect, json } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import Navigation from "components/common/Navigation";

function RootLayout() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("us")) {
  //     console.log("Google sheet id not found in localStorage.");
  //     navigate("connect");
  //   }
  // }, []);

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default RootLayout;

export async function loader() {
  const userKey = localStorage.getItem("userKey");
  if (!userKey) {
    return redirect("/signin");
  }

  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${userKey}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

  return data;
}
