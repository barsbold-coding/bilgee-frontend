'use client'
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="px-4 py-4 flex justify-between bg-gray-100">
      <div>
        <Logo color="text-[#232C33]" />
      </div>
      <div>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button>{user?.name}</Button></DropdownMenuTrigger>
          <DropdownMenuContent className="z-100">
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
