import React from "react";

import { Navbar } from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
    </>
  )
}