"use client";

import {
  useRef,
  useEffect,
  useState,
  memo,
  type FormEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { Send, Square, Paperclip, X } from "lucide-react";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent, files?: FileList) => void;
  isStreaming: boolean;
  onStop?: () => void;
  className?: string;
  placeholder?: string;
}

const ChatInput = memo(
  ({
    input,
    onInputChange,
    onSubmit,
    isStreaming,
    onStop,
    className = "",
    placeholder = "Ask anything about your next trip…",
  }: ChatInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    /* ── keyboard handler ─────────────────────────── */
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if ((input.trim() || selectedFiles.length > 0) && !isStreaming) {
          submitMessage(e as unknown as FormEvent);
        }
      }
    };

    /* ── file handling ────────────────────────────── */
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      setSelectedFiles((prev) => [...prev, ...files]);
      setPreviewUrls((prev) => [
        ...prev,
        ...files.map((f) => URL.createObjectURL(f)),
      ]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeFile = (index: number) => {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
      setPreviewUrls((prev) => {
        URL.revokeObjectURL(prev[index]);
        return prev.filter((_, i) => i !== index);
      });
    };

    /* ── paste images ─────────────────────────────── */
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length > 0) {
        setSelectedFiles((prev) => [...prev, ...files]);
        setPreviewUrls((prev) => [
          ...prev,
          ...files.map((f) => URL.createObjectURL(f)),
        ]);
      }
    };

    /* ── submit ───────────────────────────────────── */
    const submitMessage = (e: FormEvent) => {
      e.preventDefault();
      if (isStreaming || (!input.trim() && selectedFiles.length === 0)) return;

      const dt = new DataTransfer();
      selectedFiles.forEach((f) => dt.items.add(f));

      onSubmit(e, selectedFiles.length > 0 ? dt.files : undefined);

      setSelectedFiles([]);
      previewUrls.forEach(URL.revokeObjectURL);
      setPreviewUrls([]);

      if (textareaRef.current) textareaRef.current.style.height = "auto";
    };

    /* ── auto-resize textarea ─────────────────────── */
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current.scrollHeight,
          200
        )}px`;
      }
    }, [input]);

    const canSend = (input.trim() || selectedFiles.length > 0) && !isStreaming;

    return (
      <div className={`w-full max-w-3xl mx-auto px-4 ${className}`}>
        {/* Main container */}
        <div className="relative flex flex-col w-full bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:border-accent/50 focus-within:shadow-md transition-all duration-200 overflow-hidden">

          {/* Image previews */}
          {previewUrls.length > 0 && (
            <div className="flex gap-3 px-4 pt-4 overflow-x-auto no-scrollbar">
              {previewUrls.map((url, i) => (
                <div
                  key={i}
                  className="relative group shrink-0"
                >
                  <div className="h-20 w-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src={url}
                      alt="Attachment preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="flex items-end gap-2 p-2">
            {/* Attach button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors"
              title="Attach image"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={placeholder}
              rows={1}
              disabled={isStreaming}
              className="flex-1 resize-none bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 py-3 leading-relaxed min-h-[44px] max-h-[200px] disabled:opacity-60"
            />

            {/* Send / Stop */}
            {isStreaming ? (
              <button
                type="button"
                onClick={onStop}
                className="h-10 w-10 shrink-0 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm"
                title="Stop generating"
              >
                <Square className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submitMessage}
                disabled={!canSend}
                className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-all shadow-sm disabled:opacity-40 disabled:bg-slate-100 disabled:text-slate-400 bg-accent text-white hover:bg-teal-600 active:scale-95"
                title="Send (Enter)"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-1.5 mb-2">
          Shift+Enter for new line · Planova AI may make mistakes — verify important travel info
        </p>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";
export default ChatInput;
