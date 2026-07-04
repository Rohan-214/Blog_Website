import React from "react";

function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-[#2F5E64]/20 shadow-xl bg-white">
        <div className="w-16 h-16 border-4 border-[#2F5E64] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-2xl font-semibold text-[#2F5E64]">Loading...</div>
      </div>
    </div>
  );
}

export default PageLoader;
