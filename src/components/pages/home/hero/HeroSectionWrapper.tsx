"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { HeroStats } from "./HeroStats";
import { QuoteForm } from "./QuoteForm";
import { usePublicHero } from "@/hooks/usePublicHero";
import Link from "next/link";
import Image from "next/image";
import { HeroBanner } from "../../website-cms/hero/HeroBanner";
import { useState } from "react";

const alignmentClasses: Record<string, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "";

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_IMAGEURL ||
    "https://bridge-decent-operational-power.trycloudflare.com";

  // Remove /public/ from the path
  let cleanPath = imagePath;
  if (cleanPath.startsWith("/public/")) {
    cleanPath = cleanPath.replace("/public/", "/");
  }

  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const path = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  return `${cleanBase}${path}`;
};

export function HeroSectionWrapper() {
  const { data, loading } = usePublicHero();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (loading) {
    return (
      <section className="flex pt-10 pb-10 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-2.5 self-stretch bg-[#0B1220]">
        <div className="w-full max-w-7xl h-100 bg-gray-800 animate-pulse rounded-xl" />
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const alignment =
    alignmentClasses[data.text_alignment] || alignmentClasses.right;

  const showForm = data.status === "form";
  const showBanner = data.status === "banner";
  const isHidden = data.status === "hidden";
  const showRightColumn = showForm || showBanner;

  const backgroundImageUrl = data.backgroundImageUrl
    ? getFullImageUrl(data.backgroundImageUrl)
    : "";
  const bannerImageUrl = data.bannerImageUrl
    ? getFullImageUrl(data.bannerImageUrl)
    : "";

  return (
    <section
      id="hero"
      className="relative flex pt-10 pb-10 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-2.5 self-stretch overflow-hidden min-h-125"
    >
      {/* Background Image – always visible */}
      <div className="absolute inset-0 z-0">
        {backgroundImageUrl ? (
          <>
            <Image
              src={backgroundImageUrl}
              alt="Hero background"
              fill
              className={`object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              priority
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              sizes="100vw"
              quality={90}
              unoptimized={true}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
          </>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-image.png')" }}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl xl:max-w-330 2xl:max-w-[1600px]">
        <div
          className={`flex flex-col ${showRightColumn ? "lg:flex-row" : ""} items-center gap-8 md:gap-10 lg:gap-12 xl:gap-14 w-full ${showRightColumn ? "" : alignment}`}
        >
          <div
            className={`flex flex-col gap-6 sm:gap-8 lg:gap-12 ${showRightColumn ? "flex-1" : "w-full"}`}
          >
            <div className={`flex flex-col gap-3 sm:gap-4`}>
              <div className="w-fit flex flex-wrap py-1.5 px-3 items-center gap-2 sm:gap-3 rounded-lg border text-white border-[#DCA3A0] bg-[#B23730]">
                <Icon
                  name="car"
                  width={20}
                  height={20}
                  color="#fff"
                  className="sm:w-4 sm:h-4"
                />
                <span className="w-fit font-inter text-[10px] xs:text-xs sm:text-sm font-normal leading-[112%] uppercase">
                  {data.eyebrow_text}
                </span>
              </div>

              <h1 className="font-bebas w-full text-5xl sm:text-6xl md:text-7xl lg:text-[56px] xl:text-[64px] 2xl:text-[90px] font-normal leading-[110%] sm:leading-[120%] tracking-[1px] sm:tracking-[2px]">
                <span className="text-white">
                  {data.main_headline.split("\n")[0] || ""}
                </span>
                {data.main_headline.includes("\n") && (
                  <>
                    <br />
                    <span className="text-[#0098E8]">
                      {data.main_headline.split("\n")[1] || ""}
                    </span>
                  </>
                )}
              </h1>

              <p
                className={`${showRightColumn ? "w-full lg:w-113.25" : "w-full"} text-white/80 font-inter text-sm sm:text-base lg:text-md xl:text-lg font-normal leading-[140%] sm:leading-[150%]`}
              >
                {data.subtext}
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 ${showRightColumn ? "w-full sm:w-auto" : "w-full"}`}
            >
              <Link
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto flex py-3.5 px-5 justify-center items-center gap-2 rounded bg-[#FEC300] text-black font-inter text-sm lg:text-base uppercase font-medium hover:bg-[#ECA300]">
                  Book my wash
                  <Icon name="book" width={20} height={20} color="black" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex py-3.5 px-5 justify-center items-center gap-2 rounded border border-white/30 text-white font-inter text-sm font-medium hover:bg-white/10"
                >
                  See our services
                </Button>
              </Link>
            </div>

            <HeroStats
              starRating={data.star_rating}
              carsWashed={data.cars_washed}
              avgTime={data.avg_time}
            />
          </div>

          {showRightColumn && (
            <div className="w-full lg:max-w-125 xl:max-w-162">
              {showForm && <QuoteForm />}
              {showBanner && bannerImageUrl && (
                <HeroBanner bannerImageUrl={bannerImageUrl} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
