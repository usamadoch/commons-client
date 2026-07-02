




const featuresData = [
    {
        id: 1,
        stepTitle: "1. Built to Convert",
        title: "One link. They pick a plan. They pay in rupees.",
        description: "JazzCash, Easypaisa, and local cards — all there by default. Your audience pays the way they already pay for everything else.",
        imageSrc: "/about images/membership_checkout_y1.PNG",
    },
    {
        id: 2,
        stepTitle: "2. Publish and Earn",
        title: "The same feed you'd post to anyway.",
        description: "Write a post, share a video, upload a file. Decide who sees it: everyone, or only the people paying you. One toggle — paid or free.",
        imageSrc: "/about images/create post.PNG",
    },
    {
        id: 3,
        stepTitle: "3. A Private Space for Your Community",
        title: "Talk to them where they're already paying you.",
        description: "Direct messages for the one-on-one conversations. Group chat for the community you're building. Both built in, both included, neither bolted on as an afterthought.",
        imageSrc: "/about images/messaging_full.PNG",
    },
    {
        id: 4,
        stepTitle: "4. Go live. Get paid.",
        title: "The Super Chat YouTube never gave them.",
        description: "Keep streaming on YouTube. Commons sits next to it. Your audience sends a paid message — it shows up highlighted in your chat.",
        imageSrc: "/about images/live session control room.PNG",
    },
];

const CreatorToolkit = () => {
    return (
        <section className="max-w-420 mx-auto px-16 2xl:px-8 lg:px-6 mobile:px-6 py-24 lg:py-16">
            <div className="grid grid-cols-[1fr_1.5fr] lg:grid-cols-1 gap-16 items-start">

                {/* Sticky Sidebar */}
                <div className="sticky top-32 self-start lg:static lg:self-auto lg:mb-12">
                    <h2 className="text-5xl md:text-3xl font-normal tracking-tighter leading-[0.85] dark:text-n-9 mb-6">The Creator<br />Toolkit.</h2>
                    <p className="text-xl md:text-lg dark:text-n-8 mb-10 max-w-md">
                        Everything you need to monetize a local audience, without the friction of foreign platforms.
                    </p>

                    <div className="flex flex-col gap-4 border-l-4 dark:border-n-6 pl-6">
                        <div className="text-lg font-bold dark:text-n-9">1. Built to Convert</div>
                        <div className="text-lg font-bold dark:text-n-8">2. Publish and Earn</div>
                        <div className="text-lg font-bold dark:text-n-8">3. Go Live. Get Paid.</div>
                        <div className="text-lg font-bold dark:text-n-8">4. Private Community</div>
                    </div>
                </div>

                {/* Scrolling Mockups */}
                <div className="space-y-24">
                    {featuresData.map((feature) => (
                        <div key={feature.id}>
                            <span className="text-[11px] font-bold tracking-widest uppercase text-purple-1 mb-4 block">
                                {feature.stepTitle}
                            </span>
                            <h3 className="text-4xl md:text-2xl font-normal tracking-tight dark:text-n-9 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-xl md:text-lg dark:text-n-8 leading-relaxed mb-10">
                                {feature.description}
                            </p>

                            <div className="bg-surface rounded-xl border border-n-4 dark:border-n-6 overflow-hidden w-full flex items-center justify-center dark:bg-n-2/50 bg-n-7">
                                <img
                                    src={feature.imageSrc}
                                    alt={feature.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CreatorToolkit;