"use client";

import AuthProvider from "@/context/AuthProvider";
import ToastProvider from "@/context/ToastProvider";
import { AuthLayout } from "@/layout";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import Feedback from "feeder-react-feedback"; // import Feedback component

const feederId = process.env.FEEDER_PROJECT_ID!;

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
            <AuthLayout>
              <div className="text-black">
                <Feedback email projectId={feederId} />
              </div>
              {children}
            </AuthLayout>
          </AuthProvider>
        </ToastProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
