import Link from "next/link";
import { BUSINESS, telHref } from "@/constants/business";

const linkClass = "text-purple-1 hover:underline";
const strongClass = "font-bold text-n-1 dark:text-n-9";

type ComplaintsProcessProps = {
    /** Show a link to the full Cancellation & Refund Policy (used on the Terms page). */
    linkToRefundPolicy?: boolean;
};

/**
 * Complaints-handling mechanism shared by /terms and /cancellation-refund so
 * both pages always describe the same process and timeframes.
 */
const ComplaintsProcess = ({ linkToRefundPolicy = false }: ComplaintsProcessProps) => {
    const resolutionDays = BUSINESS.complaintResolutionBusinessDays;

    return (
        <>
            <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                <p>
                    <strong className={strongClass}>1. Submit your complaint:</strong> Email{" "}
                    <a href={`mailto:${BUSINESS.supportEmail}`} className={linkClass}>
                        {BUSINESS.supportEmail}
                    </a>
                    {BUSINESS.supportPhone && (
                        <>
                            {" "}or call{" "}
                            <a href={telHref(BUSINESS.supportPhone)} className={linkClass}>
                                {BUSINESS.supportPhone}
                            </a>
                        </>
                    )}
                    . Include your registered email address, the transaction date and amount, the creator or membership concerned, your transaction reference (if available), and a short description of the issue.
                </p>
                <p>
                    <strong className={strongClass}>2. Acknowledgement:</strong> Our support team aims to respond to every complaint within {BUSINESS.supportResponseHours} hours.
                </p>
                <p>
                    <strong className={strongClass}>3. Review:</strong> We review the transaction records, account activity, and any information you provide. We may contact you or the relevant creator for additional details.
                </p>
                <p>
                    <strong className={strongClass}>4. Resolution:</strong>{" "}
                    {resolutionDays
                        ? `We aim to resolve complaints and disputes within ${resolutionDays} business days of receiving all required information. `
                        : ""}
                    We will inform you of the outcome by email. If a refund is approved, it is generally processed within {BUSINESS.refundProcessingBusinessDays} business days, although the time for funds to appear may vary depending on your bank or payment provider.
                </p>
                <p>
                    <strong className={strongClass}>5. Further review:</strong> If you are not satisfied with the outcome, reply to the same email thread to request a further review of your complaint.
                </p>
            </div>
            <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                Please contact us before filing a dispute or chargeback with your bank or card issuer so we can try to resolve the issue directly. You retain any rights available to you under applicable law and the rules of your payment provider.
                {linkToRefundPolicy && (
                    <>
                        {" "}Refund eligibility is described in our{" "}
                        <Link href="/cancellation-refund" className={linkClass}>
                            Cancellation &amp; Refund Policy
                        </Link>
                        .
                    </>
                )}
            </p>
        </>
    );
};

export default ComplaintsProcess;
