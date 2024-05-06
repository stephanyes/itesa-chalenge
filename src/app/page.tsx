'use client'
import { useAuthContext } from "@/context/AuthContext";
import { useRouter, redirect } from 'next/navigation';

export default function Home() {
  const { user } = useAuthContext() as { user: any };
  if (!user) {
    return redirect("/signin");
  }
  redirect("/dashboard");
}
