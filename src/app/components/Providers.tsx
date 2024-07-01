"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
function Providers({ children }: Props) {
  console.log("Providers");
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
