"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default  function ProtectedRoute({ children }: any) {
  const { data: session } = useSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return <div>{children}</div>;
}
 

 