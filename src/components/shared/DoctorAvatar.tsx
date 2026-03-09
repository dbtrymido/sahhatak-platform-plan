interface DoctorAvatarProps {
  initials: string;
  color: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function DoctorAvatar({ initials, color, size = "md" }: DoctorAvatarProps) {
  const sizeClasses = {
    xs: "w-8 h-8 text-xs",
    sm: "w-12 h-12 text-sm",
    md: "w-16 h-16 text-base",
    lg: "w-20 h-20 text-xl",
    xl: "w-24 h-24 text-2xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center font-bold text-primary-foreground shrink-0 transition-transform duration-200 hover:scale-105`}
      style={{ backgroundColor: color }}
      aria-label={`صورة الطبيب ${initials}`}
    >
      {initials}
    </div>
  );
}
