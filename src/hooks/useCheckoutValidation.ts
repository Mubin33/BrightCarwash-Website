import type { BookingValidationErrors, ContactValues } from "@/types/booking";

export function useCheckoutValidation(
  contactInfo: ContactValues,
  agreed: boolean,
) {
  const validate = (): BookingValidationErrors => {
    const errors: BookingValidationErrors = {};

    if (!contactInfo.firstName.trim())
      errors.firstName = "First name is required";
    if (!contactInfo.lastName.trim()) errors.lastName = "Last name is required";
    if (!contactInfo.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (contactInfo.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!contactInfo.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      errors.email = "Please enter a valid email address";
    }

    const make = (contactInfo.make || contactInfo.vehicleMake || "").trim();
    if (!make) {
      errors.make = "Make is required";
      errors.vehicleMake = "Make is required";
    }

    const model = (contactInfo.model || contactInfo.vehicleModel || "").trim();
    if (!model) {
      errors.model = "Model is required";
      errors.vehicleModel = "Model is required";
    }

    const year = (contactInfo.year || contactInfo.vehicleYear || "").trim();
    if (!year) {
      errors.year = "Year is required";
      errors.vehicleYear = "Year is required";
    } else if (!/^\d{4}$/.test(year)) {
      errors.year = "Please enter a valid 4-digit year";
      errors.vehicleYear = "Please enter a valid 4-digit year";
    }

    if (!agreed) errors.agreed = "You must agree to the Privacy Policy";

    return errors;
  };

  return {
    isFormValid: true,
    errors: {},
    validate,
    hasErrors: () => Object.keys(validate()).length > 0,
  };
}
