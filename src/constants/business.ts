/**
 * Verified legal / business details shown on the public policy pages
 * (/terms, /privacy, /cancellation-refund, /ownership-statement).
 *
 * IMPORTANT: Only enter values that have been verified (e.g. against the
 * SECP incorporation certificate). Any field left as `null` is simply not
 * rendered on the site — no placeholder text is ever shown publicly.
 *
 * Required by Safepay's website checklist and still pending confirmation:
 *  - registeredAddress
 *  - supportPhone
 *  - complaintResolutionBusinessDays
 *  - officeAddress (only if different from the registered address)
 */
export const BUSINESS = {
    legalName: "Commons Technologies (SMC-Private) Limited",
    brandName: "Commons",
    country: "Pakistan",
    websiteUrl: "https://www.commons.pk",
    websiteLabel: "https://www.commons.pk",
    supportEmail: "support@commons.pk",
    generalEmail: "hello@commons.pk",

    /** Registered office address as per SECP records, e.g. "Office 1, Street 2, City, Pakistan". */
    registeredAddress: null as string | null,
    /** Operating office address — only set if different from the registered address. */
    officeAddress: null as string | null,
    /** Customer-support phone number in international format, e.g. "+92 300 0000000". */
    supportPhone: null as string | null,

    /** Target time (hours) for a first response to support inquiries. Already published. */
    supportResponseHours: 48,
    /** Maximum business days to resolve a complaint / dispute after receipt of necessary information. */
    complaintResolutionBusinessDays: 10 as number | null,
    /** Expected processing window for approved refunds. Already published. */
    refundProcessingBusinessDays: "5–10",
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
