"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Authentication from "./Authentication";
import { useAuthContext } from "./Provider";
import Link from "next/link";

function MainContent() {
  const { user } = useAuthContext();
  return (
    <div>
      <div className="p-10 flex items-center flex-col justify-center md:px-32 lg:px-40 sm:px-24 xl:px-48">
        <div className="text-6xl text-center">
          Welcome to AI Video Generator
        </div>
        <div className="text-2xl text-center mt-4 text-gray-500">
          Create videos with AI generated scripts, images, and voiceover in
          seconds. Create, edit, and publish engaging videos for your audience
          with ease.
        </div>
        <div className="flex gap-6 md:gap-6 lg:gap-8 xl:gap-10 mt-16">
          <Button size="lg" variant={"secondary"}>
            Explore
          </Button>
          {user ? (
            <div>
              <Link href="/dashboard">
                <Button size={"lg"}>Dashboard</Button>
              </Link>
            </div>
          ) : (
            <Authentication>
              <Button size={"lg"}>Get Started</Button>
            </Authentication>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
