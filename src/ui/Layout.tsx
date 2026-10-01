import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";

function Layout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
