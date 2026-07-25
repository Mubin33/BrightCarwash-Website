"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import type { ServiceData } from "@/data/services";
import CheckIcon from "../../../../../public/icons/custom/CheckIcon";

interface Props {
  service: ServiceData;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onConfirmBooking?: (service: ServiceData) => void;
  onAddToCart?: (service: ServiceData) => void;
  onRemoveFromCart?: (service: ServiceData) => void;
}

export function ServiceCard({
  service,
  selected,
  onSelect,
  onConfirmBooking,
  onAddToCart,
  onRemoveFromCart,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleConfirmBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onConfirmBooking) onConfirmBooking(service);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(service);
  };

  const handleRemoveFromCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveFromCart) onRemoveFromCart(service);
  };

  return (
    <div
      onClick={() => onSelect?.(service.id)}
      className={`flex w-full p-4 sm:p-6 flex-col items-start gap-6 sm:gap-8 rounded-lg border transition-all cursor-pointer ${selected
          ? "border-3 border-[#FEC300] bg-[#092544]"
          : isDark
            ? "border-white/20 bg-white/6 hover:bg-white/12 hover:border-[#0098E8]/30"
            : "border-[#DFE1E7] bg-white hover:bg-[#F0F8FF] hover:border-[#0098E8]/30"
        }`}
    >
      {/* Image */}
      <div className="flex h-52 sm:h-64 lg:h-69 p-4 flex-col justify-end items-center gap-2.5 self-stretch rounded-lg relative overflow-hidden">
        <Image
          src={service.image || "/images/service.png"}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 380px, 424px"
          unoptimized={service.image?.startsWith("https")}
        />
        {selected && (
          <span className="absolute top-3 right-3 bg-[#006F1F] text-white text-xs px-2 py-1 rounded-full font-inter z-10">
            Selected
          </span>
        )}
      </div>

      {/* Name */}
      <h3
        className={`font-bebas self-stretch text-[32px] font-normal leading-[100%] truncate ${selected ? "text-white" : isDark ? "text-white" : "text-[#1D1F2C]"
          }`}
      >
        {service.name.split(" ").slice(0, 5).join(" ")}
      </h3>

      {/* Price & Duration */}
      <div className="font-inter flex justify-between items-center self-stretch flex-wrap gap-2">
        <span className="font-inter text-[#FEC300] text-[42px] font-bold leading-[100%]">
          ${service.price}
        </span>
        <div
          className={`flex py-1.5 px-2 items-center gap-2 rounded-lg border ${isDark && !selected ? "border-white/20" : "border-[#DFE1E7]"
            }`}
        >
          <Icon
            name="clock"
            width={20}
            height={20}
            color={selected ? "#FFFFFF" : isDark ? "#FFFFFF" : "#4A4C56"}
          />
          <span
            className={`font-inter text-md ${selected
                ? "text-white/80"
                : isDark
                  ? "text-white/60"
                  : "text-[#777980]"
              }`}
          >
            {service.duration}
          </span>
        </div>
      </div>

      {/* Description */}
      <div
        className={`flex w-full py-3 px-4 flex-col items-start gap-4 rounded-md border-3 ${isDark && !selected
            ? "border-white/20 bg-white/4"
            : "border-gray-400/20 bg-gray-400/4 "
          }`}
      >
        <div
          className={`font-inter text-start text-sm leading-[150%] ${!selected
              ? "text-gray-700 dark:text-gray-300"
              : isDark
                ? "text-gray-300"
                : "text-white"
            }`}
          dangerouslySetInnerHTML={{ __html: service.descriptionHtml }}
        />
      </div>

      {/* Button */}
      <div className="w-full mt-auto flex flex-col gap-2">
        {selected ? (
          <>
            <Button
              onClick={handleConfirmBooking}
              className="w-full py-3.5 px-5 justify-center items-center gap-2 rounded-lg bg-[#FEC300] text-black font-inter text-sm uppercase"
            >
              <CheckIcon />
              Confirm booking - pay deposit
            </Button>
            <Button
              variant="outline"
              onClick={handleRemoveFromCartClick}
              className="w-full py-3.5 px-5 justify-center items-center gap-2 rounded-lg font-inter text-sm border-[#FF4345] text-[#FF4345] hover:bg-[#FFE6E6]"
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={handleAddToCartClick}
            className={`w-full py-3.5 px-5 justify-center items-center gap-2 rounded-lg font-inter text-sm ${isDark
                ? "border-white/20 bg-white/8 text-white hover:bg-white/16"
                : "bg-white hover:bg-[#F8FAFB]"
              }`}
          >
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
