import React from "react";

interface WrapperProps {
  children?: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return <div className="relative container mx-auto px-8">{children}</div>;
};
