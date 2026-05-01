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
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-100">
      <div className="p-4 bg-slate-50 rounded-full mb-4">
        <Icon className="w-12 h-12 text-slate-400" />
      </div>
      <h3 className="text-xl font-heading text-primary mb-2">{title}</h3>
      <p className="text-slate-500 mb-8 max-w-sm">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
