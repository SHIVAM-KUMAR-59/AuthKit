"use client";
import { useToast } from "@/context/ToastContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const { error, success } = useToast();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut({ redirect: false });
      success("Logged out successfully.");
      setTimeout(() => {
        router.replace("/auth/login");
      }, 1500);
    } catch {
      error("Error signing out, try again.");
      setSigningOut(false);
    }
  };

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div
      className="page-transition min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full max-w-sm">

        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--canvas)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Header band */}
          <div
            className="h-24 relative"
            style={{ backgroundColor: "var(--hover)" }}
          >
            {/* Primary colour accent stripe at very top */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ backgroundColor: "var(--primary)" }}
            />
            {/* Soft radial tint */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 40% 60%, var(--primary) 0%, transparent 65%)",
              }}
            />
          </div>

          {/* Avatar — overlaps header */}
          <div className="flex justify-center -mt-10 relative z-10 mb-4">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center text-white text-xl font-semibold tracking-wide"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                  outline: "4px solid var(--canvas)",
                }}
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "Profile"}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              {/* Online dot */}
              <span
                className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full"
                style={{
                  backgroundColor: "var(--success)",
                  outline: "2px solid var(--canvas)",
                }}
              />
            </div>
          </div>

          {/* User info */}
          <div className="px-6 pb-6 text-center">
            <h2
              className="text-lg font-semibold tracking-tight leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {session?.user?.name ?? "Guest"}
            </h2>

            {session?.user?.email && (
              <p
                className="text-sm mt-1 truncate"
                style={{ color: "var(--text-secondary)" }}
              >
                {session.user.email}
              </p>
            )}

            {/* Active session badge */}
            <div className="flex justify-center mt-3">
              <span
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: "var(--hover)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--success)" }}
                />
                Active session
              </span>
            </div>

            {/* Divider */}
            <div
              className="my-5"
              style={{ borderTop: "1px solid var(--border)" }}
            />

            {/* Sign out button */}
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "transparent",
                color: signingOut ? "var(--text-secondary)" : "var(--error)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                if (!signingOut) {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = "var(--hover)";
                  btn.style.borderColor = "var(--error)";
                }
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.backgroundColor = "transparent";
                btn.style.borderColor = "var(--border)";
              }}
            >
              {signingOut ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    style={{ color: "var(--text-secondary)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  <span style={{ color: "var(--text-secondary)" }}>
                    Signing out…
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Sign out
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs mt-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Signed in via{" "}
          {session?.user?.email?.split("@")[1] ?? "provider"}
        </p>
      </div>
    </div>
  );
};

export default Page;