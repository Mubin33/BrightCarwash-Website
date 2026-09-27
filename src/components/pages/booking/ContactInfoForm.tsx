"use client";

import { useTheme } from "@/contexts/ThemeContext";
import type { BookingValidationErrors, ContactValues } from "@/types/booking";
import { toast } from "react-toastify";

interface Props {
  values: ContactValues;
  onChange: (values: ContactValues) => void;
  disabled?: boolean;
  errors?: BookingValidationErrors;
  submitted?: boolean;
}

export function ContactInfoForm({
  values,
  onChange,
  disabled,
  errors = {},
  submitted = false,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass = `flex py-4 px-4 justify-between items-center self-stretch rounded-lg border font-inter text-sm outline-none focus:border-[#0098E8] placeholder-[#A5A5AB] transition-colors ${
    isDark
      ? "border-white/20 bg-white/[0.08] text-white placeholder:text-white/30"
      : "border-[#DFE1E7] bg-[#F8FAFB] text-[#1D1F2C]"
  }`;
  const labelClass =
    "text-[#777980] dark:text-white/60 font-inter text-base font-normal leading-[130%]";
  const errorClass = "text-[#FF4345] font-inter text-xs mt-1";

  const update = (field: keyof ContactValues, value: string) => {
    const updated: ContactValues = { ...values, [field]: value };
    if (field === "make") updated.vehicleMake = value;
    if (field === "vehicleMake") updated.make = value;
    if (field === "model") updated.vehicleModel = value;
    if (field === "vehicleModel") updated.model = value;
    if (field === "year") updated.vehicleYear = value;
    if (field === "vehicleYear") updated.year = value;
    onChange(updated);
  };

  const handleNameChange = (field: "firstName" | "lastName", value: string) => {
    const cleaned = value.replace(/[0-9]/g, "");
    update(field, cleaned);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/[0-9]/.test(e.key)) {
      e.preventDefault();
      toast.warning("Numbers are not allowed in name fields");
    }
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length > 3)
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length > 6)
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    update("phone", formatted);
  };

  const handleYearChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    update("year", digits);
  };

  const hasError = (field: keyof ContactValues): boolean => {
    if (!submitted) return false;
    const errKey = field as keyof BookingValidationErrors;
    if (errors[errKey]) return true;
    if (field === "make" && errors.vehicleMake) return true;
    if (field === "vehicleMake" && errors.make) return true;
    if (field === "model" && errors.vehicleModel) return true;
    if (field === "vehicleModel" && errors.model) return true;
    if (field === "year" && errors.vehicleYear) return true;
    if (field === "vehicleYear" && errors.year) return true;
    return false;
  };

  const getError = (field: keyof ContactValues): string | undefined => {
    if (!submitted) return undefined;
    const errKey = field as keyof BookingValidationErrors;
    return (
      errors[errKey] ||
      (field === "make" ? errors.vehicleMake : undefined) ||
      (field === "vehicleMake" ? errors.make : undefined) ||
      (field === "model" ? errors.vehicleModel : undefined) ||
      (field === "vehicleModel" ? errors.model : undefined) ||
      (field === "year" ? errors.vehicleYear : undefined) ||
      (field === "vehicleYear" ? errors.year : undefined)
    );
  };

  return (
    <div
      className={`flex p-4 sm:p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${isDark ? "border-white/20 bg-white/[0.04]" : "border-[#DFE1E7] bg-white"}`}
    >
      <div className="flex flex-col items-start gap-6 self-stretch">
        <h3
          className={`font-inter text-xl font-bold leading-normal ${isDark ? "text-white" : "text-[#1D1F2C]"}`}
        >
          Contact Info
        </h3>
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
            <div className="w-full flex flex-col items-start gap-2 flex-1">
              <label className={labelClass} htmlFor="contact-firstName">
                First Name
              </label>
              <input
                id="contact-firstName"
                type="text"
                placeholder="John"
                className={`${inputClass} ${hasError("firstName") ? "border-[#FF4345]" : ""}`}
                value={values.firstName}
                onChange={(e) => handleNameChange("firstName", e.target.value)}
                onKeyDown={handleNameKeyDown}
                disabled={disabled}
              />
              {getError("firstName") && (
                <span className={errorClass}>{getError("firstName")}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2 flex-1">
              <label className={labelClass} htmlFor="contact-lastName">
                Last Name
              </label>
              <input
                id="contact-lastName"
                type="text"
                placeholder="Doe"
                className={`${inputClass} ${hasError("lastName") ? "border-[#FF4345]" : ""}`}
                value={values.lastName}
                onChange={(e) => handleNameChange("lastName", e.target.value)}
                onKeyDown={handleNameKeyDown}
                disabled={disabled}
              />
              {getError("lastName") && (
                <span className={errorClass}>{getError("lastName")}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
            <div className="w-full flex flex-col items-start gap-2 flex-1">
              <label className={labelClass} htmlFor="contact-phone">
                Phone Number
              </label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="(555) 000-0000"
                className={`${inputClass} ${hasError("phone") ? "border-[#FF4345]" : ""}`}
                value={values.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={14}
                disabled={disabled}
              />
              {getError("phone") && (
                <span className={errorClass}>{getError("phone")}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2 flex-1">
              <label className={labelClass} htmlFor="contact-email">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="john@example.com"
                className={`${inputClass} ${hasError("email") ? "border-[#FF4345]" : ""}`}
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={(e) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (e.target.value && !emailRegex.test(e.target.value)) {
                    toast.warning("Please enter a valid email address");
                  }
                }}
                disabled={disabled}
              />
              {getError("email") && (
                <span className={errorClass}>{getError("email")}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
            <div className="w-full flex flex-col items-start gap-2 flex-1">
              <label className={labelClass} htmlFor="contact-make">
                Make
              </label>
              <input
                id="contact-make"
                name="make"
                type="text"
                placeholder="Toyota"
                className={`${inputClass} ${hasError("make") ? "border-[#FF4345]" : ""}`}
                value={values.make || values.vehicleMake || ""}
                onChange={(e) => update("make", e.target.value)}
                disabled={disabled}
              />
              {getError("make") && (
                <span className={errorClass}>{getError("make")}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2 flex-1">
              <label className={labelClass} htmlFor="contact-model">
                Model
              </label>
              <input
                id="contact-model"
                name="model"
                type="text"
                placeholder="Camry"
                className={`${inputClass} ${hasError("model") ? "border-[#FF4345]" : ""}`}
                value={values.model || values.vehicleModel || ""}
                onChange={(e) => update("model", e.target.value)}
                disabled={disabled}
              />
              {getError("model") && (
                <span className={errorClass}>{getError("model")}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2 flex-1">
              <label className={labelClass} htmlFor="contact-year">
                Year
              </label>
              <input
                id="contact-year"
                name="year"
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="2024"
                className={`${inputClass} ${hasError("year") ? "border-[#FF4345]" : ""}`}
                value={values.year || values.vehicleYear || ""}
                onChange={(e) => handleYearChange(e.target.value)}
                disabled={disabled}
              />
              {getError("year") && (
                <span className={errorClass}>{getError("year")}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className={labelClass} htmlFor="contact-note">
              Appointment note (optional)
            </label>
            <textarea
              id="contact-note"
              placeholder="Add any special requests..."
              className={`${inputClass} h-[127px] items-start resize-none`}
              value={values.note}
              onChange={(e) => update("note", e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
