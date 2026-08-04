"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ServicesHeader } from "./ServicesHeader";
import { ServiceCard } from "./ServiceCard";
import { LocationFilter } from "./LocationFilter";
import { useServices } from "@/hooks/useServices";
import { useTheme } from "@/contexts/ThemeContext";
import { useBooking } from "@/contexts/BookingContext";
import type { ServiceData } from "@/data/services";

export function ServicesSectionWrapper() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const router = useRouter();
  const { addService, removeService, selectedServices } = useBooking();
  const { selectedLocation } = useBooking();
  const { services, loading } = useServices(selectedLocation || undefined);
  const isInCart = useCallback(
    (id: string) => selectedServices.some((s) => s.id === id),
    [selectedServices],
  );
  const handleConfirmBooking = (service: ServiceData) => {
    addService(service);
    router.push("/booking");
  };
  const handleAddToCart = (service: ServiceData) => {
    addService(service);
  };
  const handleRemoveFromCart = (service: ServiceData) => {
    removeService(service.id);
  };

  // State to track screen size
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine how many services to show
  const servicesToShow = isTablet ? services.slice(0, 2) : services.slice(0, 3);

  if (loading) {
    return (
      <section
        className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? "bg-[#1A1A1A]" : "bg-[#fff8ee]"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl xl:max-w-330">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-125 bg-gray-100 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className={`flex py-5 px-4 md:px-6 lg:px-10 flex-col justify-center items-center self-stretch ${isDark ? "bg-[#1a1712]" : "bg-[#fff8ee]"}`}
    >
      <div className="pb-12">
        <ServicesHeader />
      </div>

      <div className="font-inter flex flex-col sm:flex-row gap-2 justify-between items-center pb-6 w-full max-w-7xl xl:max-w-330">
        <LocationFilter />
        <Link href="/services">
          <Button
            variant="secondary"
            className={`flex py-3.5 px-5 justify-center items-center gap-2 rounded-lg font-inter border border-[#DFE1E7] text-sm ${isDark ? "bg-white/12 text-white border-white/20 hover:bg-white/20" : ""}`}
          >
            View All Available Services
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl xl:max-w-330 cursor-pointer">
        {servicesToShow.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={isInCart(service.id)}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onConfirmBooking={handleConfirmBooking}
          />
        ))}
      </div>
    </section>
  );
}