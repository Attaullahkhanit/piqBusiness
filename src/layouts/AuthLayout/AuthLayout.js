import React from "react";
import "./styles.scss";
import BaseNavbar from "../../components/Navbar/BaseNavbar";
export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <BaseNavbar />
      <div className="content-area">{children}</div>
    </div>
  );
}
