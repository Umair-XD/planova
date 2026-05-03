import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "flat" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = ({
  children,
  className = "",
  variant = "default",
  padding = "none",
}: CardProps) => {
  const variants = {
    default:
      "bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 overflow-hidden",
    flat:
      "bg-white rounded-2xl border border-slate-100 overflow-hidden",
    interactive:
      "bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div className={`${variants[variant]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
