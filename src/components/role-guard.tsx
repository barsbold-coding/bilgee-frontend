"use client";

import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/api.types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !allowedRoles.includes(user.role))) {
      router.replace("/login");
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) return <p>Loading...</p>;

  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
