import React from "react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  actionLabel,
  actionHref,
  className = "",
}: SectionHeaderProps) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div>
        <h2 className="text-xl font-heading font-bold text-primary">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="text-sm font-semibold text-accent hover:underline underline-offset-2 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
