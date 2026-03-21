import logo from "@/assets/discoverse-logo.png";

export function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={logo}
      alt="Discoverse"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}
