"use client";
import { SectionHeader } from "@/components/ui/SectionHeader";
import React from "react";
import { WashWithPurposeFaq } from "@/types/faq";
import { otherFaqs } from "@/services/othersFaq.api";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function HowTheProgramWorks() {
  const [faqs, setFaqs] = React.useState<WashWithPurposeFaq[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const data = await otherFaqs();
        setFaqs(data);
        setError(null);
      } catch (err) {
        setError("Failed to load FAQs");
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fff8ee] dark:bg-[#1a1a1a] py-10 lg:py-20">
      <div className="max-w-330 mx-auto px-4 xl:px-0">
        <SectionHeader
          badgeIcon="car"
          badgeText="The Good-to-Know Stuff"
          forceDark
          heading={
            <p className="text-[#0B1220] dark:text-white">
              How the Program Works
            </p>
          }
          subheading={
            <p className="text-[#0B1220] dark:text-white/90">
              No surprises here — just the friendly fine print for your 90-Day
              Better Full-Service Membership.
            </p>
          }
        />
        {loading && (
          <div className="mt-8 text-center text-[#0B1220] dark:text-white/70">
            Loading FAQs...
          </div>
        )}
        {error && (
          <div className="mt-8 text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        {!loading && !error && faqs.length > 0 && (
          <div className="mt-8 space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className="bg-white dark:bg-[#2a2a2a] rounded-lg  overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer dark:hover:bg-[#333333] transition-colors duration-200"
                >
                  <h3 className="text-base xl:text-lg font-medium text-[#0B1220] dark:text-white pr-4">
                    {faq?.question || ""}
                  </h3>
                  <span className="shrink-0 text-[#0B1220] dark:text-white">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                    openIndex === index ? "pb-6 max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="text-[#0B1220]/80 dark:text-white/80">
                    {faq?.ans}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && faqs.length === 0 && (
          <div className="mt-8 text-center text-[#0B1220] dark:text-white/70">
            No FAQs available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
