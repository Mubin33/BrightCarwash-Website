import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative">
        <h1 className="font-bold text-[#FEC300] text-9xl">404</h1>
        <p className="text-red-500 font-bold text-xs absolute right-4 bottom-8.5"> Not Found</p>
      </div>
      <p className="text-sm">The page you are looking for does not exist.</p>
    </div>
  );
}
