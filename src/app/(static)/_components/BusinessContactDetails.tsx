import { BUSINESS, telHref } from "@/constants/business";

const linkClass = "text-purple-1 hover:underline";

type BusinessContactDetailsProps = {
    /** Email shown for contact. Defaults to the support inbox. */
    email?: string;
};

/**
 * Legal entity + contact block reused across policy pages.
 * Address and phone rows only render once verified values are set in
 * `@/constants/business`, so no placeholder text is ever published.
 */
const BusinessContactDetails = ({ email = BUSINESS.supportEmail }: BusinessContactDetailsProps) => {
    const showOfficeAddress =
        BUSINESS.officeAddress && BUSINESS.officeAddress !== BUSINESS.registeredAddress;

    return (
        <div className="flex flex-col gap-1 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
            <p className="font-bold text-n-1 dark:text-n-9">{BUSINESS.legalName}</p>
            <p>Business Location: {BUSINESS.country}</p>
            {BUSINESS.registeredAddress && <p>Registered Address: {BUSINESS.registeredAddress}</p>}
            {showOfficeAddress && <p>Office Address: {BUSINESS.officeAddress}</p>}
            <p>
                Email:{" "}
                <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                </a>
            </p>
            {BUSINESS.supportPhone && (
                <p>
                    Phone:{" "}
                    <a href={telHref(BUSINESS.supportPhone)} className={linkClass}>
                        {BUSINESS.supportPhone}
                    </a>
                </p>
            )}
            <p>
                Website:{" "}
                <a href={BUSINESS.websiteUrl} className={linkClass}>
                    {BUSINESS.websiteLabel}
                </a>
            </p>
        </div>
    );
};

export default BusinessContactDetails;
