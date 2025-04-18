import Link from "next/link";

type NavButtonProps = {
  label: string,
  href: string,
};

export function NavButton({ label, href }: NavButtonProps) {
  return (
    <Link href={href} className="text-white font-bold text-xl">
      {label}
    </Link>
  );
}
