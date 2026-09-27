"use client";

import { useBooking } from "@/contexts/BookingContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useBookingLock } from "@/hooks/useBookingLock";
import { useCheckout } from "@/hooks/useCheckout";
import { useCheckoutLock } from "@/hooks/useCheckoutLock";
import { useCheckoutValidation } from "@/hooks/useCheckoutValidation";
import type { ContactValues } from "@/types/booking";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
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
  bookingStartAt: string;
  bookingTime: string;
}

export function CheckoutStep({
  onBack,
  onSuccess,
  bookingStartAt,
  bookingTime,
}: Props) {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [displayErrors, setDisplayErrors] = useState({});
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
  const searchParams = useSearchParams();
  const {
    selectedServices,
    selectedLocation,
    lockToken,
    clearServices,
    setLockToken,
    setLastBookingDetails,
  } = useBooking();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { checkout, loading: checkoutLoading } = useCheckout();
  const { lock, release } = useBookingLock();
  const { validate } = useCheckoutValidation(contactInfo, agreed);
  const teamMemberId = searchParams.get("teamMemberId") || "";
  const startAt = bookingStartAt || searchParams.get("startAt") || "";
  useCheckoutLock({
    startAt,
    selectedServices,
    lockToken,
    locationId: selectedLocation,
    lock,
    release,
  });

  const handleCheckout = async () => {
    setSubmitted(true);

    // ✅ Run validation
    const errors = validate();
    setDisplayErrors(errors);

    // ✅ If errors exist, stop and scroll to first error
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
      return; // ❌ DO NOT proceed to payment
    }

    // ✅ No errors → proceed with payment
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

    const success = await checkout({
      locationId: selectedLocation,
      startAt,
      lockToken: lockToken || "",
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
    if (success) {
      setLastBookingDetails({
        services: [...selectedServices],
        locationId: selectedLocation,
        startAt,
        date:
          searchParams.get("date") ||
          (startAt ? format(new Date(startAt), "yyyy-MM-dd") : ""),
        time:
          bookingTime ||
          searchParams.get("time") ||
          (startAt ? format(new Date(startAt), "hh:mm a") : ""),
        customerName: `${contactInfo.firstName} ${contactInfo.lastName}`.trim(),
        customerEmail: contactInfo.email,
        total: selectedServices.reduce((sum, s) => sum + s.price, 0),
        vehicle,
      });
      clearServices();
      onSuccess();
    } else {
      if (lockToken) await release(selectedLocation, startAt);
      await lock(
        selectedLocation,
        startAt,
        selectedServices.map((s) => s.variationId),
      );
    }
  };

  return (
    <div
      className={`relative overflow-hidden flex flex-col w-full p-4 sm:p-6 items-start gap-6 rounded-lg border ${isDark ? "border-white/20 bg-white/[0.06]" : "border-[#DFE1E7] bg-[#F8FAFB]"}`}
    >
      <CheckoutProcessingOverlay isLoading={checkoutLoading} isDark={isDark} />
      <div className="flex flex-col lg:flex-row items-start gap-4 self-stretch">
        <div className="flex flex-col justify-center items-start gap-4 flex-1">
          <ContactInfoForm
            values={contactInfo}
            onChange={setContactInfo}
            disabled={checkoutLoading}
            errors={submitted ? displayErrors : {}}
            submitted={submitted}
          />
          <SquarePaymentForm
            ref={paymentFormRef}
            locationId={selectedLocation}
            onNonceReady={() => {}}
            disabled={checkoutLoading}
            agreed={agreed}
            onAgreeChange={setAgreed}
            errors={submitted ? displayErrors : {}}
            submitted={submitted}
          />
        </div>
        <div className="flex flex-col items-start gap-4 flex-1 lg:max-w-[400px] self-stretch">
          <CountdownTimer
            onExpire={() => {
              if (lockToken) release(selectedLocation, startAt);
              setLockToken(null);
              localStorage.removeItem("bookingLockToken");
              localStorage.removeItem("bookingLockTimestamp");
            }}
          />
          <AppointmentSummary
            overrideStartAt={startAt}
            overrideTime={bookingTime}
          />
          <CheckoutButtons
            onBack={onBack}
            isFormValid={true}
            lockToken={lockToken}
            checkoutLoading={checkoutLoading}
            isDark={isDark}
            onCheckout={handleCheckout}
            release={release}
            locationId={selectedLocation}
            startAt={startAt}
          />
        </div>
      </div>
    </div>
  );
}
