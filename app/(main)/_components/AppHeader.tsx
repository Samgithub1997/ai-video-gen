"use client";

import { useAuthContext } from "@/app/components/Provider";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

function AppHeader() {
  const { user } = useAuthContext();

  return (
    <div className="flex p-4 justify-between items-center">
      <div>
        <SidebarTrigger />
      </div>
      <div>
        {user && (
          <Image
            src={user?.photoURL}
            alt={"User profile picture"}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
}

export default AppHeader;
