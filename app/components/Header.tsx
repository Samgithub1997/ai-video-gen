"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Authentication from "./Authentication";
import { useAuthContext } from "./Provider";

const Header = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex items-center justify-between md:px-16 lg:px-20 sm:px-12 xl:px-24 pr-4">
      <div className="flex items-center gap-3 p-4">
        <Image src={"/treva.svg"} alt="logo" width={40} height={40} />
        <div className="text-2xl">Video Generator</div>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full"
              src={user?.photoURL}
              alt="user"
              width={40}
              height={40}
            />

            <div className="text-lg text-white">{user?.displayName}</div>
          </div>
        ) : (
          <Authentication>
            <Button>Get Started</Button>
          </Authentication>
        )}
      </div>
    </div>
  );
};

export default Header;
