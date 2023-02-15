import React from "react";
// import churchlogo from "../assets/church-new.png";
// import userlogo from "../assets/user.png";
import "./Header.css";

export default function Header() {
  return (
    <div
      style={{
        height: '100px',
        backgroundColor: "#d87431",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      Church
    </div>
  );
}
