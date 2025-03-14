"use client";

import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useAuthContext } from "../components/Provider";
import { useRouter } from "next/navigation";

export default function DashboardProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuthContext();
  const route = useRouter();

  const checkIfUserIsLoggedIn = () => {
    if (!user) {
      route.replace("/");
    }
  };

  useEffect(() => {
    user && checkIfUserIsLoggedIn();
  }, [user]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <AppHeader />
        <div className="p-7">{children}</div>
      </div>
    </SidebarProvider>
  );
}
