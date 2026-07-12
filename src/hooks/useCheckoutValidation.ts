import { toast } from 'react-toastify';

interface ContactValues {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    note: string;
}

export function useCheckoutValidation(contactInfo: ContactValues, agreed: boolean) {
    const isFormValid: boolean = !!(
        contactInfo.firstName.trim() && contactInfo.lastName.trim() &&
        contactInfo.phone.trim() && contactInfo.email.trim() && agreed
    );

    const validateCheckout = (): boolean => {
        if (!isFormValid) {
            toast.warning('Please fill all required fields');
            return false;
        }

        const phoneDigits = contactInfo.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            toast.warning('Please enter a valid phone number');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactInfo.email)) {
            toast.warning('Please enter a valid email address');
            return false;
        }

        return true;
    };

    return { isFormValid, validateCheckout };
}