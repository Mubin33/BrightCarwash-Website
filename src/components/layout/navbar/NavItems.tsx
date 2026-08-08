"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavLinkBasic {
  label: string;
  href: string;
  subItems?: undefined;
  target?: string;
}

interface NavLinkWithSubItems {
  label: string;
  subItems: NavSubItem[];
  href?: undefined;
}

type NavLink = NavLinkBasic | NavLinkWithSubItems;

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "News & Events", href: "/news" },
  {
    label: "Manages",
    subItems: [
      {
        label: "Manage My Membership",
        href: "/manage-membership",
      },
      {
        label: "Buy a Membership",
        href: "/buy-membership",
      },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    label: "Store",
    href: "https://brightsidecw.qbstores.com/",
    target: "_blank",
  },
];

interface NavItemsProps {
  onLinkClick?: () => void;
}

export function NavItems({ onLinkClick }: NavItemsProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    onLinkClick?.();
  };

  const toggleSubmenu = (label: string) => {
    if (isMobile) {
      setOpenSubmenu(openSubmenu === label ? null : label);
    }
  };

  return (
    <nav className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-8 w-full">
      {NAV_LINKS.map((link) => {
        const subItems = Array.isArray(link.subItems) ? link.subItems : null;
        const hasSubItems = subItems !== null && subItems.length > 0;
        const isActive =
          pathname === ("href" in link ? link.href : undefined) ||
          (hasSubItems && subItems!.some((item) => pathname === item.href));
        const isSubmenuOpen = openSubmenu === link.label;
        if (hasSubItems) {
          return (
            <div
              key={link.label}
              className="w-full lg:w-auto"
              onMouseEnter={() => !isMobile && setOpenSubmenu(link.label)}
              onMouseLeave={() => !isMobile && setOpenSubmenu(null)}
            >
              <button
                type="button"
                onClick={() => toggleSubmenu(link.label)}
                className={`flex items-center justify-between lg:justify-start gap-1 font-inter lg:text-xs xl:text-base font-normal leading-[100%] whitespace-nowrap transition-colors w-full lg:w-auto ${
                  isActive
                    ? `underline decoration-[#B23730] decoration-[11%] underline-offset-[25%] ${
                        isDark ? "text-white" : "lg:text-white text-[#092544]"
                      }`
                    : isDark
                      ? "text-[#E9E9EA]"
                      : "lg:text-white text-[#4A4C56]"
                }`}
              >
                <span>{link.label}</span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.8}
                  className={`transition-transform duration-200 ${
                    isSubmenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Submenu - Mobile (inline) */}
              <div
                className={`lg:hidden mt-2 space-y-2 ${
                  isSubmenuOpen ? "block" : "hidden"
                }`}
              >
                <div className="pl-4 border-l-2 border-[#B23730]/30 space-y-1">
                  {subItems!.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => {
                          handleClick();
                          setOpenSubmenu(null);
                        }}
                        className={`block py-2 font-inter text-sm transition-colors ${
                          isSubActive
                            ? `text-[#B23730] font-medium`
                            : isDark
                              ? "text-[#E9E9EA] hover:text-white"
                              : "text-[#4A4C56] hover:text-[#092544]"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Submenu - Desktop (dropdown) */}
              <div className="hidden lg:block relative">
                <div
                  className={`absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-xl border p-2 shadow-xl transition-all duration-200 ${
                    isSubmenuOpen
                      ? "visible opacity-100 translate-y-0"
                      : "invisible opacity-0 translate-y-2"
                  } ${
                    isDark
                      ? "border-white/10 bg-[#092544]"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {/* Small arrow */}
                  <div
                    className={`absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t ${
                      isDark
                        ? "border-white/10 bg-[#092544]"
                        : "border-gray-200 bg-white"
                    }`}
                  />

                  {subItems!.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => {
                          handleClick();
                          setOpenSubmenu(null);
                        }}
                        className={`relative z-10 block rounded-lg px-4 py-3 font-inter lg:text-xs xl:text-base transition-colors ${
                          isSubActive
                            ? isDark
                              ? "bg-white/10 text-white"
                              : "bg-[#092544]/5 text-[#092544]"
                            : isDark
                              ? "text-[#E9E9EA] hover:bg-white/10 hover:text-white"
                              : "text-[#4A4C56] hover:bg-[#092544]/5 hover:text-[#092544]"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        const basicLink = link as NavLinkBasic;
        return (
          <Link
            key={basicLink.href}
            href={basicLink.href}
            onClick={handleClick}
            target={basicLink.target}
            className={`font-inter lg:text-xs xl:text-base font-normal leading-[100%] whitespace-nowrap transition-colors w-full lg:w-auto ${
              isActive
                ? `underline decoration-[#B23730] decoration-[11%] underline-offset-[25%] ${
                    isDark ? "text-white" : "lg:text-white text-[#092544]"
                  }`
                : `no-underline ${
                    isDark ? "text-[#E9E9EA]" : "lg:text-white text-[#4A4C56]"
                  }`
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
