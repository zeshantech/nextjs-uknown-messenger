import React, { ReactNode } from "react";

interface StackProps {
  direction?: "row" | "column";
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  alignItems?: "stretch" | "start" | "center" | "end";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "nowrap" | "wrap";
  margin?: number; // Margin in pixels
  padding?: number; // Padding in pixels
  gap?: number; // Gap in pixels
  height?: string; // Height in CSS units
  screenHeight?: boolean; // Full screen height
  width?: string; // Width in CSS units
  fullWidth?: boolean; // Full screen width
  children: ReactNode;
}

const Stack: React.FC<StackProps> = ({
  direction = "column",
  spacing = 0,
  alignItems = "stretch",
  justifyContent = "flex-start",
  wrap = "nowrap",
  margin = 0, // Default margin
  padding = 0, // Default padding
  gap = 0, // Default gap
  height, // Height in CSS units
  screenHeight = false, // Default to not full screen height
  width, // Width in CSS units
  fullWidth = false, // Default to not full screen width
  children,
}) => {
  const directionClass = direction === "column" ? "flex-col" : "flex-row";
  const wrapClass = wrap === "wrap" ? "flex-wrap" : "flex-nowrap";

  const spacingClasses = () => {
    if (direction === "column") {
      return `space-y-${spacing}`;
    } else {
      return `space-x-${spacing}`;
    }
  };

  const alignItemsClass = () => {
    switch (alignItems) {
      case "start":
        return "items-start";
      case "center":
        return "items-center";
      case "end":
        return "items-end";
      case "stretch":
      default:
        return "items-stretch";
    }
  };

  const justifyContentClass = () => {
    switch (justifyContent) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "end":
        return "justify-end";
      case "between":
        return "justify-between";
      case "around":
        return "justify-around";
      case "evenly":
        return "justify-evenly";
      case "flex-start":
      default:
        return "justify-start";
    }
  };

  return (
    <div
      className={`flex ${directionClass} ${wrapClass} ${spacingClasses()} ${alignItemsClass()} ${justifyContentClass()}`}
      style={{
        margin: `${margin}px`,
        padding: `${padding}px`,
        gap: `${gap}px`,
        height: screenHeight ? "100vh" : height,
        width: fullWidth ? "100vw" : width,
      }}
    >
      {children}
    </div>
  );
};

export default Stack;
