"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  });
  return (
    <div>
      {/* <h1>fs</h1>
      <Button>subscrine</Button>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink> */}
    </div>
  );
}
