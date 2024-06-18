"use client";

import AuthProvider from "@/context/AuthProvider";
import ToastProvider from "@/context/ToastProvider";
import { AuthLayout } from "@/layout";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";

export default function App({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <h1>Loading...</h1>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <ToastProvider>
          <AuthProvider>
            <AuthLayout>{children}</AuthLayout>
          </AuthProvider>
        </ToastProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
