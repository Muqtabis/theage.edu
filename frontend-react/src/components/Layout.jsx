import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileQuickBar from "./MobileQuickBar";

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
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      <Header />

      {/* Main content with bottom clearance on mobile for floating bar */}
      <main className="pb-16 md:pb-0" style={{ paddingTop: headerHeight }}>
        <Outlet />
      </main>

      <Footer />

      {/* Sticky Mobile Parent Quick Contact Bar */}
      <MobileQuickBar />
    </div>
  );
}

export default Layout;
