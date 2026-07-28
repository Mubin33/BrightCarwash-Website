"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Campaign } from "@/services/ai-chatbot.api";

interface CampaignImageGalleryProps {
  campaigns: Campaign[];
}

const MAX_VISIBLE_IMAGES = 4;

export default function CampaignImageGallery({
  campaigns,
}: CampaignImageGalleryProps) {
  const imageCampaigns = campaigns.filter(
    (campaign): campaign is Campaign & { image: string } =>
      Boolean(campaign.image),
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const remainingCount = Math.max(
    0,
    imageCampaigns.length - MAX_VISIBLE_IMAGES,
  );
  const visibleCampaigns = imageCampaigns.slice(0, MAX_VISIBLE_IMAGES);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedIndex(null);
    }

    if (selectedIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedIndex]);

  if (!imageCampaigns.length) return null;

  const selectedCampaign =
    selectedIndex === null ? null : imageCampaigns[selectedIndex];

  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="Campaign images">
        {visibleCampaigns.map((campaign, index) => {
          return (
            <button
              key={campaign.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="relative h-28 w-28 overflow-hidden rounded-lg border border-[#DCE7FF] bg-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#33ADED]"
              aria-label={`View campaign: ${campaign.title}`}
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
        {remainingCount > 0 ? (
          <button
            type="button"
            onClick={() => setSelectedIndex(MAX_VISIBLE_IMAGES)}
            className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#071F4D] text-sm font-bold text-white transition hover:bg-[#0B2A63] focus:outline-none focus:ring-2 focus:ring-[#33ADED]"
            aria-label={`View ${remainingCount} more campaign images`}
          >
            +{remainingCount}
          </button>
        ) : null}
      </div>

      {selectedCampaign ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Campaign image: ${selectedCampaign.title}`}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-white dark:bg-[#092544]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedCampaign.image}
              alt={selectedCampaign.title}
              className="max-h-[75vh] w-full object-contain bg-black"
            />
            <div className="flex items-center justify-between gap-3 p-3 text-[#0F172A] dark:text-white">
              <p className="truncate text-sm font-semibold">
                {selectedCampaign.title}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((current) =>
                      current === null
                        ? null
                        : (current - 1 + imageCampaigns.length) %
                          imageCampaigns.length,
                    )
                  }
                  className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/10"
                  aria-label="Previous campaign image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((current) =>
                      current === null
                        ? null
                        : (current + 1) % imageCampaigns.length,
                    )
                  }
                  className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/10"
                  aria-label="Next campaign image"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/10"
                  aria-label="Close image viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
