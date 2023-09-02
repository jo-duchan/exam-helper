import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "components/Navigation";

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("sheetId")) {
      console.log("Google sheet id not found in localStorage.");
      navigate("connect");
    }
  }, []);

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default RootLayout;
