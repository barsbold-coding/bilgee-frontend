import Link from "next/link";

type ButtonProps = {
  label: string,
  href: string,
};

export function Button({ href, label }: ButtonProps) {
  return (
    <Link href={href}>
      <div className="px-2 py-2">
        {label}
      </div>
    </Link>
  )
}
