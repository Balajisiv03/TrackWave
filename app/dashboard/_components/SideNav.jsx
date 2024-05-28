"use client";
import React from "react";
import Image from "next/image";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

function SideNav() {
  const { user } = useKindeBrowserClient();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendence",
      icon: Hand,
      path: "/dashboard/attendence",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  return (
    <div className="border shadow-md h-screen mt-2">
      <Image src={"/logo.svg"} width={180} height={50} alt="logo" />
      <hr className="my-5"></hr>
      {menuList.map((menu, index) => (
        <Link href={menu.path}>
          <h2 className="flex items-center gap-3 text-md p-6 text-slate-500 hover:bg-primary hover:text-white my-2 cursor-pointer rounded-lg">
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}
      <div className="flex gap-2 items-center bottom-10 fixed p-4">
        <Image
          src={user?.picture}
          width={35}
          height={35}
          alt="user"
          className="rounded-full"
        />
        <div>
          <h2 className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-xs text-slate-400">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
