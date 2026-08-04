'use client';

import { useState } from "react";
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { useQuote } from "@/hooks/useQuote";
import { toast } from "react-toastify";

const vehicles = [
  { name: "Sedan", doors: "2-4 doors", image: "/images/Sedan.png" },
  { name: "SUV", doors: "5+ doors", image: "/images/SUV.png" },
  { name: "Truck/Van", doors: "For Work or Cargo", image: "/images/Truck.png" },
];

export function QuoteForm() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { sendQuote, loading } = useQuote();

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length > 3)
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length > 6)
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    setPhone(formatted);
  };

  const validate = (): string | null => {
    if (!name.trim()) return "Please enter your full name";
    if (!email.trim()) return "Please enter your email address";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address";
    if (!phone.trim()) return "Please enter your phone number";
    if (phone.replace(/\D/g, "").length < 10)
      return "Please enter a valid phone number";
    if (!selectedVehicle) return "Please select a vehicle type";
    if (!date) return "Please select a date";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      toast.warning(error);
      return;
    }

    // ✅ Convert Date to ISO string (YYYY-MM-DD)
    const formattedDate = date ? date.toISOString().split('T')[0] : undefined;

    const success = await sendQuote({
      full_name: name,
      email,
      phone: `+1${phone.replace(/\D/g, "")}`,
      vehicle_type: selectedVehicle!,
      date: formattedDate, // ✅ Send as ISO string
    });
    if (success) {
      setName("");
      setEmail("");
      setPhone("");
      setSelectedVehicle(null);
      setDate(undefined);
    }
  };

  return (
    <div className="flex w-full p-4 sm:p-5 flex-col items-center gap-6 rounded-xl bg-white">
      <div className="flex flex-col items-start gap-6 self-stretch">
        <div className="flex flex-col justify-center items-center gap-3 self-stretch rounded-lg bg-[#b23730] p-4 sm:p-4">
          <span className="font-bebas text-white font-bebas-neue text-2xl sm:text-[32px] lg:text-[24px] xl:text-[32px] leading-[100%] self-stretch text-start">
            Get Your Free Quote
          </span>
          <span className="font-inter! text-white/80 text-md sm:text-base lg:text-xs xl:text-base leading-[160%] self-stretch text-start">
            Fill in your details and we&apos;ll get back to you with the best
            offer for your vehicle.
          </span>
        </div>

        <div className="flex flex-col items-start gap-4 self-stretch">
          <div>
            <h3 className="font-bebas text-[#4A4C56] text-lg sm:text-xl leading-[100%] self-stretch">
              What vehicle do you drive?
            </h3>
            <p className="text-[#777980] font-inter text-sm sm:text-base leading-[100%] mt-2">
              Pricing varies based on vehicle category.
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 self-stretch">
            {vehicles.map((v) => (
              <VehicleCard
                key={v.name}
                image={v.image}
                name={v.name}
                doors={v.doors}
                selected={selectedVehicle === v.name}
                onClick={() => setSelectedVehicle(v.name)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 self-stretch">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#4A4C56] font-inter text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="px-4 py-3 border border-[#DFE1E7] rounded-lg text-sm outline-none focus:border-[#0098E8]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[#4A4C56] font-inter text-sm font-medium">
              Date
            </label>
            <DatePicker
              value={date}
              onChange={setDate}
              placeholder="Select date"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[#4A4C56] font-inter text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="(555) 000-0000"
              className="px-4 py-3 border border-[#DFE1E7] rounded-lg text-sm outline-none focus:border-[#0098E8]"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              maxLength={14}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[#4A4C56] font-inter text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="px-4 py-3 border border-[#DFE1E7] rounded-lg text-sm outline-none focus:border-[#0098E8]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Submitting..."
          className="w-full py-4 px-6 rounded bg-[#0B1220] text-white font-inter text-base font-medium hover:bg-[#0B1220]/90 transition-colors uppercase"
        >
          Get my quote
        </Button>
      </div>
    </div>
  );
}