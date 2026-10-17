import React from "react";
import Link from "next/link";
import { BUSINESS } from "@/constants/business";

export interface PaymentReceiptProps {
  orderId?: string;
  customerEmail?: string;
  creatorName?: string;
  creatorUsername?: string;
  tierName?: string;
  amountPKR?: number;
  interval?: string;
  paymentDate?: string;
  renewalDate?: string;
  cardLast4?: string;
  showActions?: boolean;
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  orderId = "67d4a19b8e23a4001f39c8a1",
  customerEmail = "ahmed.raza@gmail.com",
  creatorName = "Ali Hassan",
  creatorUsername = "alihassan",
  tierName = "Community Insider Tier",
  amountPKR = 3000,
  interval = "Monthly",
  paymentDate = "March 14, 2026, 09:42 PM PKT",
  renewalDate = "April 14, 2026",
  cardLast4 = "4242",
  showActions = true,
}) => {
  return (
    <div className="w-full max-w-[580px] mx-auto bg-white border border-[#E5E7EB] rounded-lg shadow-sm overflow-hidden text-[#151515] font-sans">
      {/* Top Brand Header */}
      <div className="px-7 py-6 border-b border-[#F0F1F3] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Official Commons SVG Logo Icon */}
          <div className="w-7 h-7 shrink-0">
            <svg
              viewBox="80 85 640 640"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <mask id="receiptBubbleMask">
                <rect width="100%" height="100%" fill="white" />
                <circle cx="270" cy="400" r="45" fill="black" />
                <circle cx="400" cy="400" r="45" fill="black" />
                <circle cx="530" cy="400" r="45" fill="black" />
              </mask>
              <path
                d="M 250 200 L 550 200 A 150 150 0 0 1 700 350 L 700 450 A 150 150 0 0 1 550 600 L 330 600 L 210 740 L 250 600 A 150 150 0 0 1 100 450 L 100 350 A 150 150 0 0 1 250 200 Z"
                fill="#AE7AFF"
                mask="url(#receiptBubbleMask)"
              />
            </svg>
          </div>
          <span className="font-extrabold text-[20px] tracking-tight text-[#151515] leading-none">
            Commons
          </span>
        </div>
        <span className="text-[12px] font-bold text-[#71717A] tracking-wider uppercase">
          Payment Receipt
        </span>
      </div>

      {/* Hero Section */}
      <div className="px-7 py-7 border-b border-[#F0F1F3]">
        <div className="inline-flex items-center gap-1.5 bg-[#EAFBEE] border border-[#98E9AB] text-[#0F5132] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3.5">
          <span>&#10003;</span>
          <span>Payment Successful</span>
        </div>

        <h1 className="text-[22px] font-extrabold text-[#151515] leading-snug mb-1.5">
          Thank you for your payment
        </h1>
        <p className="text-[14px] text-[#555555] mb-5">
          Here is your receipt for your monthly membership to{" "}
          <strong className="text-[#151515]">{creatorName}</strong> on Commons.
        </p>

        {/* Amount Box */}
        <div className="bg-[#FAFAFB] border border-[#EEEEF0] rounded-md p-4">
          <div className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider mb-1">
            Total Amount Paid
          </div>
          <div className="text-[30px] font-extrabold text-[#151515] tracking-tight">
            PKR {amountPKR.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Receipt Body */}
      <div className="p-7">
        <h2 className="text-[12px] font-bold text-[#71717A] uppercase tracking-wider mb-3">
          Order Summary
        </h2>

        {/* Items Table */}
        <div className="border-b border-[#E5E7EB] pb-2 mb-4">
          <div className="flex justify-between items-center text-[12px] font-semibold text-[#71717A] pb-2 border-b border-[#E5E7EB]">
            <span>Description</span>
            <span className="w-20 text-center">Interval</span>
            <span className="w-24 text-right">Amount</span>
          </div>

          <div className="flex justify-between py-3.5 text-[14px]">
            <div>
              <div className="font-bold text-[#151515] mb-0.5">{tierName}</div>
              <div className="text-[13px] text-[#666666]">
                Creator:{" "}
                <strong className="text-[#151515]">{creatorName}</strong> (@{creatorUsername})
              </div>
              <div className="text-[12px] text-[#888888] mt-1">
                Billing Period: Mar 14, 2026 – Apr 14, 2026
              </div>
            </div>
            <div className="w-20 text-center text-[#555555] text-[13px] pt-0.5">
              {interval}
            </div>
            <div className="w-24 text-right font-bold text-[#151515] pt-0.5">
              PKR {amountPKR.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Summary Breakdown */}
        <div className="space-y-1.5 mb-6 text-[13px]">
          <div className="flex justify-between text-[#555555]">
            <span>Subtotal</span>
            <span>PKR {amountPKR.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#555555]">
            <span>Taxes &amp; Processing Fees</span>
            <span>PKR 0</span>
          </div>
          <div className="flex justify-between text-[15px] font-extrabold text-[#151515] pt-2 border-t border-[#E5E7EB]">
            <span>Total Paid</span>
            <span>PKR {amountPKR.toLocaleString()}</span>
          </div>
        </div>

        {/* Transaction Metadata */}
        <h2 className="text-[12px] font-bold text-[#71717A] uppercase tracking-wider mb-3">
          Payment Information
        </h2>

        <div className="bg-[#FAFAFB] border border-[#EEEEF0] rounded-md p-4 space-y-2.5 text-[13px] mb-6">
          <div className="flex justify-between items-center">
            <span className="text-[#71717A] font-medium">Order ID</span>
            <span className="font-mono text-[12px] text-[#2D2C2D] font-semibold">
              {orderId}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#71717A] font-medium">Billed To</span>
            <span className="font-semibold text-[#151515]">{customerEmail}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#71717A] font-medium">Payment Date</span>
            <span className="font-semibold text-[#151515]">{paymentDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#71717A] font-medium">Payment Method</span>
            <span className="font-semibold text-[#151515]">
              Card ending in {cardLast4}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#71717A] font-medium">Billing Frequency</span>
            <span className="font-semibold text-[#151515]">Monthly recurring</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#71717A] font-medium">Next Renewal Date</span>
            <span className="font-bold text-[#151515]">
              {renewalDate} (PKR {amountPKR.toLocaleString()})
            </span>
          </div>
        </div>

        {/* CTA */}
        {showActions && (
          <div className="text-center pt-1 pb-2">
            <Link
              href={`/${creatorUsername}`}
              className="inline-block bg-[#AE7AFF] hover:bg-[#AE7AFF]/90 text-[#151515] font-bold text-[14px] px-7 py-3 rounded border border-[#151515] shadow-sm transition-all"
            >
              Access Your Membership
            </Link>
            <p className="text-[12px] text-[#71717A] text-center mt-3">
              Need to change your payment method or cancel? You can manage your
              subscription anytime in your{" "}
              <Link
                href="/settings"
                className="text-[#151515] underline font-medium hover:text-black"
              >
                Account Settings
              </Link>
              .
            </p>
          </div>
        )}
      </div>

      {/* Legal & Business Footer */}
      <div className="bg-[#FAFAFB] px-7 py-5 border-t border-[#E5E7EB] text-[12px] text-[#71717A] leading-relaxed">
        <p className="font-bold text-[#151515] mb-1">{BUSINESS.legalName}</p>
        <p className="mb-2">{BUSINESS.registeredAddress}</p>
        <p className="mb-3">
          For support or billing inquiries, contact us at{" "}
          <a
            href={`mailto:${BUSINESS.supportEmail}`}
            className="text-[#151515] font-semibold underline"
          >
            {BUSINESS.supportEmail}
          </a>{" "}
          or call{" "}
          <a href={`tel:${BUSINESS.supportPhone}`} className="text-[#151515]">
            {BUSINESS.supportPhone}
          </a>
          .
        </p>

        <div className="flex items-center gap-3 pt-1 border-t border-[#EEEEF0] text-[11px]">
          <Link href="/terms" className="text-[#555555] underline hover:text-black">
            Terms of Service
          </Link>
          <span>&bull;</span>
          <Link href="/privacy" className="text-[#555555] underline hover:text-black">
            Privacy Policy
          </Link>
          <span>&bull;</span>
          <Link
            href="/cancellation-refund"
            className="text-[#555555] underline hover:text-black"
          >
            Refund Policy
          </Link>
        </div>

        <p className="mt-3 text-[11px] text-[#9A9EA5]">
          This email receipt was sent to {customerEmail} for your subscription to{" "}
          {creatorName} on Commons.pk.
        </p>
      </div>
    </div>
  );
};

export default PaymentReceipt;
