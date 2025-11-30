import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <img
      src="/logo.svg"
      alt="ArkSphere Logo"
      className={`h-5 sm:h-6 md:h-7 w-auto dark:invert object-contain ${className}`}
    />
  );
};
