import React from "react";

export default function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M28.0643 4.07073C25.1603 0.943311 3.31596 8.60443 3.334 11.4015C3.35445 14.5734 11.8648 15.5491 14.2236 16.211C15.6421 16.6088 16.022 17.0168 16.349 18.5043C17.8304 25.2408 18.5741 28.5915 20.2692 28.6663C22.971 28.7858 30.8984 7.12283 28.0643 4.07073Z"
        strokeWidth="2"
        stroke="currentColor"
      />
      <path
        d="M15.334 16.6667L20.0007 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
