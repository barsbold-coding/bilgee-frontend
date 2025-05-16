'use client'
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { UserRole } from "@/types/api.types";
import { NotificationDrawer } from "./notification-drawer";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  
  const renderDropdownItems = () => {
    if (!user) return null;
    
    switch (user.role) {
      case UserRole.STUDENT:
        return (
          <>
            <DropdownMenuItem>
              <Button className="w-full z-100" variant="ghost">
                <Link href="/resume">Миний CV</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="z-100">
              <Button className="w-full z-100" variant="ghost">
                <Link href="/applications">Миний хүсэлтүүд</Link>
              </Button>
            </DropdownMenuItem>
          </>
        );
      
      case UserRole.ORGANISATION:
        return (
          <>
            <DropdownMenuItem>
              <Button className="w-full z-100" variant="ghost">
                <Link href="/organisation/applications">Хүсэлтүүд</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="z-100">
              <Button className="w-full z-100" variant="ghost">
                <Link href="/organisation/internships">Дадлагууд</Link>
              </Button>
            </DropdownMenuItem>
          </>
        );
      
      case UserRole.ADMIN:
        return (
          <>
            <DropdownMenuItem>
              <Button className="w-full z-100" variant="ghost">
                <Link href="/admin/users">Хэрэглэгчид</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="z-100">
              <Button className="w-full z-100" variant="ghost">
                <Link href="/admin/internships">Бүх дадлагууд</Link>
              </Button>
            </DropdownMenuItem>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-4 flex justify-between bg-gray-100">
      <div>
        <Logo color="text-[#232C33]" />
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <NotificationDrawer />
        )}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button>{user?.name}</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="z-100">
              {renderDropdownItems()}
              <DropdownMenuItem className="z-100">
                <Button className="w-full z-100" variant="ghost" onClick={() => logout()}>
                  Гарах
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="secondary">
            <Link href="/login">
              Нэвтрэх
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
