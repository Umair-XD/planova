import React from "react";
import { LucideIcon } from "lucide-react";
import Button from "./Button";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className = "",
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-8 text-center bg-white rounded-2xl border-2 border-dashed border-slate-100 ${className}`}
    >
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
        <Icon className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-8 max-w-xs leading-relaxed">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
