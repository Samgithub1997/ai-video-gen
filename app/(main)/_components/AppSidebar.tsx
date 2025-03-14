"use client";

import { useAuthContext } from "@/app/components/Provider";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Gem,
  HomeIcon,
  SearchIcon,
  VideoIcon,
  Wallet2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
  const { user } = useAuthContext();
  const router = useRouter();
  console.log("User ", user);
  const path = usePathname();
  const menuItems: any = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Create New Video",
      url: "/create-new-video",
      icon: VideoIcon,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: SearchIcon,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: Wallet2Icon,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-4 m-4 w-full justify-center">
          <Image src={"/treva.svg"} alt={"Logo"} width={60} height={60} />
          <h2 className="font-bold text-2xl">AI Video Generator</h2>
        </div>
        <h2 className="text-gray-500 text-lg justify-center mx-4 text-center">
          Product by Sharmaa Strategy Consulting
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-4 p-4 justify-center m-4">
              <Button
                className="p-2 w-full"
                onClick={() => router.replace("/create-new-video")}
              >
                + Create New Video
              </Button>
            </div>
            <SidebarMenu>
              {menuItems.map((item: any, index: number) => (
                <SidebarMenuItem key={index} className="w-full">
                  <SidebarMenuButton
                    isActive={path === item.url}
                    className="w-full p-6"
                  >
                    <Link href={item.url}>
                      <div className="flex items-center m-2 gap-4 p-2 w-full mt-2">
                        {item.icon && <item.icon size={24} />}
                        <h2>{item.title}</h2>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="bg-gray-700 m-2 p-4 rounded-lg my-8">
          <div className="flex items-center gap-2 mb-6 mx-2">
            <Gem size={24} />
            <h2 className="text-center">{user?.credits} credits left</h2>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <Button className="p-2 w-full">Buy more credits</Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
