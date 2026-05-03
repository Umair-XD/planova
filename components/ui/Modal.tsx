"use client";

import { useEffect, useRef } from "react";
import { X, AlertTriangle } from "lucide-react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  variant?: "danger" | "default";
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "default",
  isLoading,
  children,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          {variant === "danger" && (
            <div className="p-2.5 bg-red-100 rounded-xl shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-primary">{title}</h3>
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
        </div>

        {children && <div className="mb-6">{children}</div>}

        {onConfirm && (
          <div className="flex gap-3 justify-end mt-6">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button
              size="sm"
              isLoading={isLoading}
              onClick={onConfirm}
              className={
                variant === "danger"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : ""
              }
            >
              {confirmLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
