import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";
import React from "react";

export default function ManageMembershipPage() {
  return (
    <div className="bg-[#f5f5f5] h-screen">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Manage Membership", href: "/manage-membership" },
        ]}
      />
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-4 mt-10 ">
        <div className="p-4 bg-[#092544] rounded-lg">
          <h1 className="text-white text-[2rem] text-center uppercase font-bebas">
            Manage Your Membership
          </h1>
          <p className="text-[#d5d5d5] text-base text-center lg:w-[45ch] mx-auto">
            Access your account, update payment information, and manage your car
            wash membership.
          </p>
        </div>
        <div className="w-full rounded-lg overflow-hidden mt-5">
          <iframe
            src="https://app.flexwash.com/sign-up-portal?organizationId=264"
            style={{ width: "100%", minHeight: "400px", border: "none" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
