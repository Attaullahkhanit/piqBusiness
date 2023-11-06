import React from "react";
import { useLocation } from "react-router-dom";
import { authRoutes } from "../../routes/Routes";
import BusinessLayout from "../businessLayout/BusinessLayout";
import AuthLayout from "../AuthLayout/AuthLayout";
import { useSelector } from "react-redux";

export default function LayoutAlternator({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="layout-alternator">
      {isLoggedIn ? (
        <BusinessLayout>{children}</BusinessLayout>
      ) : (
        <AuthLayout>{children}</AuthLayout>
      )}
    </div>
  );
}
