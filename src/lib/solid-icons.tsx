import React from "react";
import { LucideIcon, LucideProps } from "lucide-react";
import { twMerge } from "tailwind-merge";

function createSolidIcon(displayName: string, children: React.ReactNode): LucideIcon {
  const Component = React.forwardRef<SVGSVGElement, LucideProps>(
    ({ size = 20, color = "currentColor", className, ...props }, ref) => (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke="none"
        className={twMerge("inline-block shrink-0", className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </svg>
    )
  );
  Component.displayName = displayName;
  return Component as LucideIcon;
}

/** Bento dashboard icon with 4 solid weighted panels */
export const SolidDashboard = createSolidIcon(
  "SolidDashboard",
  <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h5A1.5 1.5 0 0 1 11 4.5v6A1.5 1.5 0 0 1 9.5 12h-5A1.5 1.5 0 0 1 3 10.5v-6zm10 0A1.5 1.5 0 0 1 14.5 3h5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 13 7.5v-3zm0 7A1.5 1.5 0 0 1 14.5 10h5a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-5a1.5 1.5 0 0 1-1.5-1.5v-8zm-10 3A1.5 1.5 0 0 1 4.5 13h5a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 9.5 21h-5A1.5 1.5 0 0 1 3 19.5v-5z" />
);

/** Solid peaked home silhouette with entrance cutout */
export const SolidHome = createSolidIcon(
  "SolidHome",
  <path d="M12 2.2L2.5 10.4a1.25 1.25 0 0 0 .82 2.1H5v7.5A1.75 1.75 0 0 0 6.75 22h3.5A1.25 1.25 0 0 0 11.5 20.75V15.5h1v5.25A1.25 1.25 0 0 0 13.75 22h3.5A1.75 1.75 0 0 0 19 20v-7.5h1.68a1.25 1.25 0 0 0 .82-2.1L12 2.2z" />
);

/** Solid document icon with folded top corner and content bars */
export const SolidPosts = createSolidIcon(
  "SolidPosts",
  <path fillRule="evenodd" clipRule="evenodd" d="M4 4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm9.5-.5V7a1 1 0 0 0 1 1h3.5L13.5 3.5zM7.5 11.5a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1zm1 3.5a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2h-7zm0 4.5a1 1 0 1 0 0 2h4.5a1 1 0 1 0 0-2H8.5z" />
);

/** Solid community icon with primary creator & member silhouettes */
export const SolidMembers = createSolidIcon(
  "SolidMembers",
  <path d="M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm7 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7 8.5c-3.5 0-6.5 2.5-6.5 5.75V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-1.25c0-3.25-3-5.75-6.5-5.75zm7 1.25c-.4 0-.78.05-1.15.13.73 1.15 1.15 2.53 1.15 4.02v1.1h4.5a1 1 0 0 0 1-1v-.5c0-2.62-2.46-4.75-5.5-4.75z" />
);

/** Solid credit card / earnings icon with magnetic stripe & chip */
export const SolidEarnings = createSolidIcon(
  "SolidEarnings",
  <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2.5 2.5 0 0 1 2.5-2.5h15A2.5 2.5 0 0 1 22 6v12a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18V6zm2.5-.5h15c.28 0 .5.22.5.5v1.5H4V6c0-.28.22-.5.5-.5zM4 11.5v6.5c0 .28.22.5.5.5h15c.28 0 .5-.22.5-.5v-6.5H4zm2.5 2.5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-4z" />
);

/** Solid search / explore magnifying glass with sturdy 45deg stem */
export const SolidExplore = createSolidIcon(
  "SolidExplore",
  <path fillRule="evenodd" clipRule="evenodd" d="M10.5 2a8.5 8.5 0 0 1 6.7 13.73l3.78 3.78a1.5 1.5 0 0 1-2.12 2.12l-3.78-3.78A8.5 8.5 0 1 1 10.5 2zm0 3.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
);

/** Solid notification bell with contoured shoulder and clapper */
export const SolidBell = createSolidIcon(
  "SolidBell",
  <path d="M12 2a2 2 0 0 0-2 2c0 .24.04.47.12.69C6.98 5.7 4.5 8.84 4.5 12.6v4.15L2.8 18.3A1 1 0 0 0 3.5 20h17a1 1 0 0 0 .7-1.7l-1.7-1.55V12.6c0-3.76-2.48-6.9-5.62-7.91.08-.22.12-.45.12-.69a2 2 0 0 0-2-2zm-2.5 19a2.5 2.5 0 0 0 5 0h-5z" />
);

/** Solid speech bubble with conversational ellipsis cutout */
export const SolidMessages = createSolidIcon(
  "SolidMessages",
  <path fillRule="evenodd" clipRule="evenodd" d="M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8.2l-4.5 3.6a.75.75 0 0 1-1.2-.6V4zm5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
);

/** Solid ascending analytics bars with baseline */
export const SolidAnalytics = createSolidIcon(
  "SolidAnalytics",
  <path d="M3 20.5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zM5 12a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 9 12v5.5H5V12zm5.5-7A1.5 1.5 0 0 1 12 3.5h1A1.5 1.5 0 0 1 14.5 5v12.5h-4V5zm5.5 4A1.5 1.5 0 0 1 17.5 7.5h1a1.5 1.5 0 0 1 1.5 1.5v8.5h-4V9z" />
);

/** Solid gear / settings cog with circular center cutout */
export const SolidSettings = createSolidIcon(
  "SolidSettings",
  <path fillRule="evenodd" clipRule="evenodd" d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm2.6 7.42l1.88.75a1 1 0 0 0 1.25-.43l1.1-1.9a1 1 0 0 0-.25-1.3l-1.63-1.22c.03-.22.05-.44.05-.67s-.02-.45-.05-.67l1.63-1.22a1 1 0 0 0 .25-1.3l-1.1-1.9a1 1 0 0 0-1.25-.43l-1.88.75c-.38-.34-.81-.61-1.28-.8l-.3-2A1 1 0 0 0 13.36 2h-2.72a1 1 0 0 0-.99.85l-.3 2c-.47.19-.9.46-1.28.8l-1.88-.75a1 1 0 0 0-1.25.43l-1.1 1.9a1 1 0 0 0 .25 1.3l1.63 1.22c-.03.22-.05.44-.05.67s.02.45.05.67l-1.63 1.22a1 1 0 0 0-.25 1.3l1.1 1.9a1 1 0 0 0 1.25.43l1.88-.75c.38.34.81.61 1.28.8l.3 2a1 1 0 0 0 .99.85h2.72a1 1 0 0 0 .99-.85l.3-2c.47-.19.9-.46 1.28-.8z" />
);

/** Solid user profile avatar */
export const SolidUser = createSolidIcon(
  "SolidUser",
  <path fillRule="evenodd" clipRule="evenodd" d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-7 18.25C5 16.5 8.13 14 12 14s7 2.5 7 6.25a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
);

/** Chunky solid plus icon for actions */
export const SolidPlus = createSolidIcon(
  "SolidPlus",
  <path d="M13.25 4a1.25 1.25 0 0 0-2.5 0v6.75H4a1.25 1.25 0 0 0 0 2.5h6.75V20a1.25 1.25 0 0 0 2.5 0v-6.75H20a1.25 1.25 0 0 0 0-2.5h-6.75V4z" />
);

/** Solid broadcasting radio waves icon */
export const SolidRadio = createSolidIcon(
  "SolidRadio",
  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-8-2.6a9.5 9.5 0 0 0 0 13.2 1.25 1.25 0 0 0 1.77-1.77 7 7 0 0 1 0-9.66 1.25 1.25 0 0 0-1.77-1.77zm16 0a1.25 1.25 0 0 0-1.77 1.77 7 7 0 0 1 0 9.66 1.25 1.25 0 0 0 1.77 1.77 9.5 9.5 0 0 0 0-13.2z" />
);

/** Solid exit / logout icon */
export const SolidLogOut = createSolidIcon(
  "SolidLogOut",
  <path fillRule="evenodd" clipRule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a1.25 1.25 0 0 0 0-2.5H5.5V5.5H11a1.25 1.25 0 0 0 0-2.5H5zm11.12 4.62a1 1 0 0 0-1.41 1.42l1.66 1.71H9.25a1.25 1.25 0 0 0 0 2.5h7.12l-1.66 1.71a1 1 0 1 0 1.41 1.42l3.75-3.88a1 1 0 0 0 0-1.42l-3.75-3.88z" />
);
