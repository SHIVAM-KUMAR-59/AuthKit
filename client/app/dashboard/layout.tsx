"use client";
import { useSession } from "next-auth/react";
import "../globals.css";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const { error } = useToast();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setRedirecting(true);
      error("You are not logged in. Redirecting to login.");
      setTimeout(() => {
        router.replace("/auth/login");
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, router]);

  if (status === "loading" || redirecting) {
    return <Loader />;
  }

  return (
    <>
      {/* Background */}
      {/* Background */}
      <div className="fixed inset-0 -z-10" style={{ backgroundColor: "var(--background)" }}>
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-125 h-125 rounded-full blur-[140px] opacity-20"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute bottom-0 -right-48 w-100 h-100 rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>

      {/* Page */}
      <div className="min-h-screen flex flex-col px-4 py-6">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">{children}</main>
      </div>
    </>
  );
}
