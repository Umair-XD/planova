"use client";

import React from "react";

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  variant?: "underline" | "pills";
  className?: string;
}

const TabBar = ({
  tabs,
  activeTab,
  onTabChange,
  variant = "underline",
  className = "",
}: TabBarProps) => {
  if (variant === "pills") {
    return (
      <div className={`flex gap-2 flex-wrap ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-primary text-white shadow-md"
                : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full ${
                  activeTab === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex gap-6 border-b border-slate-100 overflow-x-auto ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`inline-flex items-center gap-2 pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeTab === tab.key
              ? "text-primary"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full ${
                activeTab === tab.key
                  ? "bg-accent text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          )}
          {activeTab === tab.key && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
