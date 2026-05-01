"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="p-12 text-center max-w-md">
        <div className="p-4 bg-red-50 rounded-full w-fit mx-auto mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Something went wrong
        </h2>
        <p className="text-slate-500 mb-8">
          We encountered an unexpected error while loading this page. Please try
          again or contact support if the problem persists.
        </p>
        <Button onClick={() => reset()} className="w-full">
          Try Again
        </Button>
      </Card>
    </div>
  );
}
