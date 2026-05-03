import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
  className?: string;
}

const PageHeader = ({
  title,
  subtitle,
  backHref,
  backLabel = "Back",
  action,
  className = "",
}: PageHeaderProps) => {
  return (
    <div className={`mb-10 ${className}`}>
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-accent font-medium text-sm mb-4 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {backLabel}
        </Link>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-500 mt-1.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
