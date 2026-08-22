"use client";
import { fetchHours } from "@/services/hours.api";
import type { Content } from "@/types/hours";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";

const formatTime = (start: string, end: string) => {
  const formatTimeValue = (time: string) => {
    return format(parse(time, "HH:mm", new Date()), "h:mm a");
  };

  return `${formatTimeValue(start)} - ${formatTimeValue(end)}`;
};

const transformHours = (content: Content): { days: string; time: string }[] => {
  return [
    {
      days: "Monday - Thursday",
      time: formatTime(
        content?.mondayThursday?.start_time || "",
        content?.mondayThursday?.end_time || "",
      ),
    },
    {
      days: "Friday - Saturday",
      time: formatTime(
        content?.fridaySaturday?.start_time || "",
        content?.fridaySaturday?.end_time || "",
      ),
    },
    {
      days: "Sunday",
      time: formatTime(
        content?.sunday?.start_time || "",
        content?.sunday?.end_time || "",
      ),
    },
  ];
};

export function LocationHours() {
  const [hours, setHours] = useState<{ days: string; time: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchHours()
      .then((data) => {
        setHours(transformHours(data?.content || {}));
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Failed to load hours");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex p-6 sm:p-6 items-center gap-6 self-stretch rounded-lg bg-[#092544]">
      <div className="flex flex-wrap justify-around items-center gap-4 sm:gap-6 flex-1">
        {loading && (
          <span className="font-inter text-sm sm:text-sm text-white">
            Loading hours...
          </span>
        )}
        {error && (
          <span className="font-inter text-sm sm:text-sm text-white">
            Unable to load business hours
          </span>
        )}
        {!loading &&
          !error &&
          hours?.map((h) => (
            <div
              key={h?.days || ""}
              className="flex flex-col items-center gap-1 sm:gap-2"
            >
              <span className="font-inter text-sm sm:text-base lg:text-xl font-medium text-[#FEC300]">
                {h?.days || ""}
              </span>
              <span className="font-inter text-xs sm:text-sm text-white">
                {h?.time || ""}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
