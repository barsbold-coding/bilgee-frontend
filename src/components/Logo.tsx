type LogoProps = {
  color?: string;
}

export function Logo({ color }: LogoProps) {
  return (
    <h1 className={`${color || 'text-white'} font-bold text-2xl`}>iNTERNSHIP</h1>
  );
}
