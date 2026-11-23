import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const observer = new ResizeObserver(() => {
      const newHeight = header.offsetHeight;
      if (newHeight !== headerHeight) {
        setHeaderHeight(newHeight);
      }
    });

    if (header) observer.observe(header);

    return () => {
      if (header) observer.disconnect();
    };
  }, [headerHeight]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Main content with exact header offset and clean bottom */}
      <main style={{ paddingTop: headerHeight }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
