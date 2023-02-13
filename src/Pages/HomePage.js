import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "92vh",
        }}
      >
        <Sidebar />
        <div style={{ width: "85vw", margin: "5px", overflowX: "hidden" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
