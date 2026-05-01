import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      <div className="flex-grow max-w-5xl mx-auto w-full p-8 space-y-8">
        <div className="flex justify-start">
          <Skeleton className="h-20 w-2/3 rounded-2xl rounded-tl-sm" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-16 w-1/2 rounded-2xl rounded-tr-sm bg-accent/10" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-32 w-3/4 rounded-2xl rounded-tl-sm" />
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
