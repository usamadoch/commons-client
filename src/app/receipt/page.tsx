import React from "react";
import type { Metadata } from "next";
import PaymentReceipt from "@/components/receipt/PaymentReceipt";

export const metadata: Metadata = {
  title: "Payment Receipt — Commons",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReceiptPage() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] py-10 px-4 flex flex-col items-center justify-center">
      <PaymentReceipt
        orderId="67d4a19b8e23a4001f39c8a1"
        customerEmail="ahmed.raza@gmail.com"
        creatorName="Ali Hassan"
        creatorUsername="alihassan"
        tierName="Community Insider Tier"
        amountPKR={3000}
        interval="Monthly"
        paymentDate="March 14, 2026, 09:42 PM PKT"
        renewalDate="April 14, 2026"
        cardLast4="4242"
        showActions={true}
      />
    </div>
  );
}
