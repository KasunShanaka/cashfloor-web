import React from "react";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-zinc-900 text-white h-dvh">
      <div className="p-4">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
