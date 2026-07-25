"use client";

import { Icon } from "@/components/ui/Icon";
import { useTheme } from "@/contexts/ThemeContext";

interface Props {
  badgeIcon: string;
  badgeText: string;
  heading: React.ReactNode;
  subheading: React.ReactNode;
  forceDark?: boolean;
  className?: string;
  align?: "center" | "start";
}

export function SectionHeader({
  badgeIcon,
  badgeText,
  heading,
  subheading,
  forceDark,
  align = "center",
  className,
}: Props) {
  const { theme } = useTheme();
  const isDark = forceDark ?? theme === "dark";

  return (
    <div
      className={`flex min-h-[auto] lg:h-56 flex-col justify-end ${align === "center" ? "items-center" : "items-start"} gap-3 self-stretch`}
    >
      <div
        className={`flex py-[6px] px-3 items-center gap-3 rounded-lg border border-[#E7C1BF] bg-[#B23730]`}
      >
        <Icon
          name={badgeIcon}
          width={16}
          height={16}
          color={isDark ? "#FFF" : "#FFF"}
        />
        <span
          className={`font-inter text-sm font-normal leading-[112%] ${
            isDark ? "text-white" : "text-white"
          }`}
        >
          {badgeText}
        </span>
      </div>

      <h2
        className={`font-bebas text-3xl sm:text-4xl lg:text-5xl font-normal leading-[116%] ${
          align === "center"
            ? "text-center w-full sm:w-[380px] lg:w-[540px]"
            : "text-left w-full"
        } ${isDark ? "text-white" : "text-[#1D1F2C]"}`}
      >
        {heading}
      </h2>

      {subheading && (
        <p
          className={`font-inter text-sm sm:text-base font-normal leading-[160%] ${
            align === "center"
              ? "text-center w-full sm:w-[500px] lg:w-[638px]"
              : "text-left w-full"
          } ${isDark ? "text-white/80" : "text-[#4A4C56]"}`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
