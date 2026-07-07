'use client';

import { useState } from 'react';
import { VehicleCard } from './VehicleCard';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';

const vehicles = [
    { name: 'Sedan', doors: '2-4 doors', image: '/images/Sedan.png' },
    { name: 'SUV', doors: '5+ doors', image: '/images/SUV.png' },
    { name: 'Truck', doors: 'For Work or Cargo', image: '/images/Truck.png' },
];

export function QuoteForm() {
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
        <div className="flex w-full flex-col items-center gap-4 sm:gap-6 rounded-xl bg-white p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col items-start gap-4 sm:gap-6 self-stretch">
                {/* Header */}
                <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 self-stretch rounded-lg bg-[#092544] p-4 sm:p-6">
                    <span className="font-bebas text-white text-2xl sm:text-[32px] leading-[100%] self-stretch text-start">
                        Get Your Free Quote
                    </span>
                    <span className="text-white/80 font-inter text-sm sm:text-base leading-[160%] self-stretch text-start">
                        Fill in your details and we&apos;ll get back to you with the best offer for your vehicle.
                    </span>
                </div>

                {/* Vehicle Selection */}
                <div className="flex flex-col items-start gap-3 sm:gap-4 self-stretch">
                    <div>
                        <h3 className="font-bebas text-[#4A4C56] text-lg sm:text-xl leading-[100%] self-stretch">
                            What vehicle do you drive?
                        </h3>
                        <p className="text-[#777980] font-inter text-xs sm:text-sm lg:text-base leading-[100%] mt-1.5 sm:mt-2">
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

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 self-stretch">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <label className="text-[#4A4C56] font-inter text-xs sm:text-sm font-medium">Full Name</label>
                        <input type="text" placeholder="Enter your name" className="px-3 sm:px-4 py-2.5 sm:py-3 border border-[#DFE1E7] rounded-lg text-xs sm:text-sm outline-none focus:border-[#0098E8]" />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <label className="text-[#4A4C56] font-inter text-xs sm:text-sm font-medium">Date</label>
                        <DatePicker value={date} onChange={setDate} placeholder="Select date" />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <label className="text-[#4A4C56] font-inter text-xs sm:text-sm font-medium">Phone Number</label>
                        <input type="tel" placeholder="+1 (555) 000-0000" className="px-3 sm:px-4 py-2.5 sm:py-3 border border-[#DFE1E7] rounded-lg text-xs sm:text-sm outline-none focus:border-[#0098E8]" />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <label className="text-[#4A4C56] font-inter text-xs sm:text-sm font-medium">Email Address</label>
                        <input type="email" placeholder="you@example.com" className="px-3 sm:px-4 py-2.5 sm:py-3 border border-[#DFE1E7] rounded-lg text-xs sm:text-sm outline-none focus:border-[#0098E8]" />
                    </div>
                </div>

                {/* Submit */}
                <Button className="w-full py-3 sm:py-4 px-6 rounded bg-[#B23730] text-white font-inter text-sm sm:text-base font-medium hover:bg-[#9A2E28] transition-colors">
                    Get my quote
                </Button>
            </div>
        </div>
    );
}