import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text";
}

export const Skeleton = ({ className = "", variant = "rect" }: SkeletonProps) => {
  const base = "animate-pulse bg-slate-200";
  const variants = {
    rect: "rounded-xl",
    circle: "rounded-full",
    text: "rounded-md",
  };
  return <div className={`${base} ${variants[variant]} ${className}`} />;
};

export const TripCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
    <Skeleton className="h-40 w-full rounded-none" />
    <div className="p-6 space-y-3">
      <Skeleton variant="text" className="h-5 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
      <div className="pt-4 space-y-3">
        <div className="flex justify-between">
          <Skeleton variant="text" className="h-4 w-1/3" />
          <Skeleton variant="text" className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </div>
);

export const TripRowSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
    <div className="flex items-center gap-6">
      <Skeleton variant="rect" className="w-16 h-16 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="h-5 w-1/3" />
        <Skeleton variant="text" className="h-4 w-1/4" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton variant="text" className="h-4 w-24 hidden sm:block" />
        <Skeleton variant="text" className="h-4 w-16 hidden sm:block" />
        <Skeleton variant="rect" className="h-6 w-20 rounded-full" />
        <Skeleton variant="rect" className="h-9 w-24" />
      </div>
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-slate-100 shadow-sm">
    <Skeleton variant="rect" className="w-12 h-12 shrink-0" />
    <div className="space-y-2">
      <Skeleton variant="text" className="h-7 w-16" />
      <Skeleton variant="text" className="h-3 w-24" />
    </div>
  </div>
);

export const ChatMessageSkeleton = () => (
  <div className="flex items-start gap-3">
    <Skeleton variant="circle" className="w-8 h-8 shrink-0 mt-1" />
    <div className="space-y-2 flex-1 max-w-[60%]">
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-4/5" />
      <Skeleton variant="text" className="h-4 w-3/5" />
    </div>
  </div>
);

export default Skeleton;
