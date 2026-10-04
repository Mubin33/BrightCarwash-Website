import type { BookingValidationErrors, ContactValues } from "@/types/booking";

export function useCheckoutValidation(
  contactInfo: ContactValues,
  agreed: boolean,
) {
  const validate = (): BookingValidationErrors => {
    const errors: BookingValidationErrors = {};
    const emailRegex = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const firstName = contactInfo.firstName.trim();
    if (!firstName) {
      errors.firstName = "First name is required";
    } else if (firstName.length > 100) {
      errors.firstName = "First name must be 100 characters or fewer";
    }

    const lastName = contactInfo.lastName.trim();
    if (!lastName) {
      errors.lastName = "Last name is required";
    } else if (lastName.length > 100) {
      errors.lastName = "Last name must be 100 characters or fewer";
    }

    const phoneDigits = contactInfo.phone.replace(/\D/g, "");
    if (!contactInfo.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (phoneDigits.length !== 10) {
      errors.phone = "Please enter a valid phone number";
    }

    const email = contactInfo.email.trim();
    if (!email) {
      errors.email = "Email address is required";
    } else if (email.length > 254 || !emailRegex.test(email)) {
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

    if (contactInfo.note.length > 500) {
      errors.note = "Appointment note must be 500 characters or fewer";
    }

    if (!agreed) errors.agreed = "You must agree to the Privacy Policy";

    return errors;
  };

  return {
    validate,
    hasErrors: () => Object.keys(validate()).length > 0,
  };
}
