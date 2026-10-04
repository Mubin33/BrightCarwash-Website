"use client";

import { BookingLockNotice } from "./BookingLockNotice";
import { useBooking } from "@/contexts/BookingContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useBookingLock } from "@/hooks/useBookingLock";
import { useCartSummary } from "@/hooks/useCartSummary";
import { useCheckout } from "@/hooks/useCheckout";
import { useCheckoutValidation } from "@/hooks/useCheckoutValidation";
import type { BookingValidationErrors, ContactValues } from "@/types/booking";
import { utcDateKey, formatUtcTime } from "@/lib/bookingTime";
import { hasBookingDetails } from "@/lib/bookingValidation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { AppointmentSummary } from "./AppointmentSummary";
import { CheckoutButtons } from "./CheckoutButtons";
import { CheckoutProcessingOverlay } from "./CheckoutProcessingOverlay";
import { ContactInfoForm } from "./ContactInfoForm";
import { CountdownTimer } from "./CountdownTimer";
import {
  SquarePaymentForm,
  type SquarePaymentFormHandle,
} from "./SquarePaymentForm";

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export function CheckoutStep({
  onBack,
  onSuccess,
}: Props) {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [displayErrors, setDisplayErrors] = useState<BookingValidationErrors>({});
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false);
  const [checkoutOutcomeUncertain, setCheckoutOutcomeUncertain] = useState(false);
  const checkoutSubmittingRef = useRef(false);
  const paymentFormRef = useRef<SquarePaymentFormHandle>(null);
  const [contactInfo, setContactInfo] = useState<ContactValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    note: "",
    make: "",
    model: "",
    year: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
  });
  const {
    selectedServices,
    selectedLocation,
    lockToken,
    clearServices,
    selection,
    setLastBookingDetails,
  } = useBooking();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { checkout, loading: checkoutLoading } = useCheckout();
  const { lock, release, loading: lockLoading } = useBookingLock();
  const { validate } = useCheckoutValidation(contactInfo, agreed);
  const { teamMemberId, startAt } = selection;
  const validBooking = hasBookingDetails({ startAt, teamMemberId, locationId: selectedLocation,
    serviceVariationIds: selectedServices.map(service => service.variationId) });

  const pricing = useCartSummary(selectedLocation, selectedServices.map(s => s.variationId));

  const handleCheckout = async () => {
    // Guard before card tokenization, including direct handler invocation.
    if (checkoutSubmittingRef.current || checkoutOutcomeUncertain
      || lockLoading || checkoutLoading || !pricing.summary || pricing.loading || pricing.error) return;
    if (!validBooking || !lockToken?.trim()) {
      toast.warning("Please select an available date and time again before payment.");
      onBack();
      return;
    }
    checkoutSubmittingRef.current = true;
    setCheckoutSubmitting(true);

    try {
      setSubmitted(true);

      const errors = validate();
      setDisplayErrors(errors);

      if (Object.keys(errors).length > 0) {
        const firstErrorField = Object.keys(errors)[0];
        const element =
          document.getElementById(`contact-${firstErrorField}`) ||
          (firstErrorField === "vehicleMake"
            ? document.getElementById("contact-make")
            : null) ||
          (firstErrorField === "vehicleModel"
            ? document.getElementById("contact-model")
            : null) ||
          (firstErrorField === "vehicleYear"
            ? document.getElementById("contact-year")
            : null) ||
          document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
        toast.warning("Please fill all required fields");
        return;
      }

      if (!paymentFormRef.current?.isReady()) {
        toast.warning("Payment system not ready. Please try again.");
        return;
      }
      const nonce = await paymentFormRef.current.tokenize();
      if (!nonce) return;

      const vehicle =
        [
          contactInfo.make || contactInfo.vehicleMake,
          contactInfo.model || contactInfo.vehicleModel,
          contactInfo.year || contactInfo.vehicleYear,
        ]
          .map((s) => s?.trim())
          .filter(Boolean)
          .join(" ") || "Not specified";

      const result = await checkout({
        locationId: selectedLocation,
        startAt,
        lockToken,
        cartItems: selectedServices.map((s) => ({
          serviceVariationId: s.variationId,
          teamMemberId,
        })),
        customerName: `${contactInfo.firstName} ${contactInfo.lastName}`.trim(),
        customerEmail: contactInfo.email,
        customerPhone: `+1${contactInfo.phone.replace(/\D/g, "")}`,
        customerNote: contactInfo.note,
        vehicle,
        nonce,
      });

      if (result === "success") {
        setLastBookingDetails({
          services: [...selectedServices],
          startAt,
          date: utcDateKey(startAt),
          time: formatUtcTime(startAt),
          total: pricing.summary.totalInCents / 100,
        });
        clearServices();
        onSuccess();
      } else if (result === "uncertain") {
        setCheckoutOutcomeUncertain(true);
      } else if (result === "failed") {
        if (lockToken) await release();
        await lock(
          selectedLocation,
          startAt,
          selectedServices.map((s) => s.variationId),
        );
      }
    } finally {
      checkoutSubmittingRef.current = false;
      setCheckoutSubmitting(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden flex flex-col w-full p-4 sm:p-6 items-start gap-6 rounded-lg border ${isDark ? "border-white/20 bg-white/[0.06]" : "border-[#DFE1E7] bg-[#F8FAFB]"}`}
    >
      <BookingLockNotice />
      <CheckoutProcessingOverlay isLoading={checkoutLoading || checkoutSubmitting} isDark={isDark} />
      {checkoutOutcomeUncertain && (
        <p role="alert" className="text-sm text-[#B23730]">
          Payment status is unconfirmed. Please contact us to verify your booking before trying again.
        </p>
      )}
      <div className="flex flex-col lg:flex-row items-start gap-4 self-stretch">
        <div className="flex flex-col justify-center items-start gap-4 flex-1">
          <ContactInfoForm
            values={contactInfo}
            onChange={setContactInfo}
            disabled={checkoutLoading || checkoutSubmitting || checkoutOutcomeUncertain}
            errors={submitted ? displayErrors : {}}
            submitted={submitted}
          />
          <SquarePaymentForm
            ref={paymentFormRef}
            locationId={selectedLocation}
            onNonceReady={() => {}}
            disabled={checkoutLoading || checkoutSubmitting || checkoutOutcomeUncertain}
            agreed={agreed}
            onAgreeChange={setAgreed}
            errors={submitted ? displayErrors : {}}
            submitted={submitted}
          />
        </div>
        <div className="flex flex-col items-start gap-4 flex-1 lg:max-w-[400px] self-stretch">
          <CountdownTimer
            onExpire={() => {
              if (lockToken) void release();
            }}
          />
          <AppointmentSummary
            pricing={pricing}
            overrideStartAt={startAt}
          />
          <CheckoutButtons
            onBack={onBack}
            lockToken={lockToken}
            pricingReady={Boolean(pricing.summary) && !pricing.loading && !pricing.error}
            checkoutLoading={checkoutLoading || checkoutSubmitting}
            checkoutBlocked={checkoutOutcomeUncertain}
            isDark={isDark}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
