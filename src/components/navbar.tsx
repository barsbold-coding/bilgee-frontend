'use client'
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="px-4 py-4 flex justify-between">
      <div>
        <Logo color="text-[#232C33]" />
      </div>
      <div>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button>{user?.name}</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button className="w-full" variant="ghost">
                <Link href="/">Миний CV</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="w-full" variant="ghost">
                <Link href="/">Миний дадлага</Link>
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
