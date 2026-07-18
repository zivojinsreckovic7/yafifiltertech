import Link from "next/link";

export function MagneticLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`magnetic btn ${className}`}
    >
      {children}
    </Link>
  );
}

export function MagneticButton({
  onClick,
  className = "",
  children,
  type = "button",
}: {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`magnetic btn ${className}`}
    >
      {children}
    </button>
  );
}
