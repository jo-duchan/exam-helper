import { Outlet } from "react-router-dom";
import Navigation from "components/common/Navigation";

function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default RootLayout;
