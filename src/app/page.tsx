'use client'

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
// import { useDimension } from "@/hooks/dimensions";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // const dimension = useDimension();
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="/home-background.png" 
        alt="background" 
        fill
        className="object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="w-full absolute top-0 left-0 flex px-12 py-12 justify-between">
          <Logo />
        </div>
        <h1 className="text-white text-4xl md:text-6xl lg:text-6xl font-bold text-center px-4 drop-shadow-lg w-[55%] py-12">
          Дадлага бол мөрөөдлөө бодит болгох эхний алхам
        </h1>
        <Button className="bg-[#5C9DFF]">
          <Link href="/internships">
            Бүх зар харах
          </Link>
        </Button>
      </div>
    </div>
  );
}
