import type { Metadata } from "next";
import Hero from "./_components/Hero";
import ProblemStatement from "./_components/ProblemStatement";
import CreatorToolkit from "./_components/CreatorToolkit";
import PlatformServices from "./_components/PlatformServices";
import CommunityFocus from "./_components/CommunityFocus";
import PlatformFreedom from "./_components/PlatformFreedom";
import LocalPricing from "./_components/LocalPricing";
import CallToAction from "./_components/CallToAction";
import AboutFooter from "./_components/AboutFooter";
import StickyHeader from "./_components/StickyHeader";

export const metadata: Metadata = {
    title: "About Commons — Turn Your Audience into Income",
    description:
        "Commons is Pakistan's creator membership platform. Monitize your audience with memberships, live streams, and private community chat in PKR via JazzCash, Easypaisa, and local cards.",
    openGraph: {
        title: "About Commons — Turn Your Audience into Income",
        description:
            "Commons is Pakistan's creator membership platform. Monitize your audience with memberships, live streams, and private community chat in PKR via JazzCash, Easypaisa, and local cards.",
    },
};

const About = () => {
    return (
        <div className="relative w-full overflow-x-clip bg-n-1 text-n-9">
            <StickyHeader heroId="hero-section" />
            <main>
                <Hero />
                <ProblemStatement />
                <CreatorToolkit />
                <PlatformServices />
                <CommunityFocus />
                <PlatformFreedom />
                <LocalPricing />
                <CallToAction />
            </main>
            <AboutFooter />
        </div>
    );
};

export default About;