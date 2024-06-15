"use client";

import AuthProvider from "@/context/AuthProvider";
import ToastProvider from "@/context/ToastProvider";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

export default function App({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <NextUIProvider> */}
      <ToastProvider>
        <AuthProvider>
          <body>{children}</body>
        </AuthProvider>
      </ToastProvider>
      {/* </NextUIProvider> */}
    </QueryClientProvider>
  );
}
