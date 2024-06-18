import React, { Fragment, ReactNode } from "react";
import Appbar from "./Appbar";
import { useSession } from "next-auth/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { data } = useSession();

  if (data) return children;

  return (
    <Fragment>
      <Appbar />

      {children}
    </Fragment>
  );
}
