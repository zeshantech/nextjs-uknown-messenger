import React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "body" | "caption";

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  mb?: number;
  color?: string; // Add color property
}

const alignStyles: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-2xl font-bold",
  h2: "text-xl font-semibold",
  h3: "text-lg font-medium",
  body: "text-base",
  caption: "text-sm text-gray-500",
};

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  children,
  align = "left",
  className = "",
  mb = 0,
  color, // Destructure color prop
}) => {
  const Component = variant === "body" || variant === "caption" ? "p" : variant;
  return (
    <Component
      className={`${variantStyles[variant]} ${alignStyles[align]} ${className}`}
      style={{ marginBottom: mb, color }} // Apply color in style
    >
      {children}
    </Component>
  );
};

export default Typography;
