interface ContactValues {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    note: string;
}

interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    agreed?: string;
}

export function useCheckoutValidation(contactInfo: ContactValues, agreed: boolean) {
    const errors: ValidationErrors = {};

    if (!contactInfo.firstName.trim()) errors.firstName = 'First name is required';
    if (!contactInfo.lastName.trim()) errors.lastName = 'Last name is required';
    if (!contactInfo.phone.trim()) {
        errors.phone = 'Phone number is required';
    } else if (contactInfo.phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Please enter a valid phone number';
    }
    if (!contactInfo.email.trim()) {
        errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
        errors.email = 'Please enter a valid email address';
    }
    if (!agreed) errors.agreed = 'You must agree to the Privacy Policy';

    const isFormValid = Object.keys(errors).length === 0;

    return { isFormValid, errors };
}