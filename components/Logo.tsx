import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/icon.svg"
        alt="ArkSphere Logo"
        className="h-5 sm:h-6 md:h-7 w-auto dark:invert object-contain"
      />
      <span className="font-bold text-lg sm:text-xl tracking-wide text-foreground">
        ARKSPHERE
      </span>
    </div>
  );
};
