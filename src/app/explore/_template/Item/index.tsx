import Link from "next/link";
import Image from "@/components/Image";
import LiveBadge from "@/components/LiveBadge";
import { ExploreCreator } from "@/types";
import { usePrefetch } from "@/hooks/usePrefetch";

type ItemProps = {
    item: ExploreCreator;
};

const Item = ({ item }: ItemProps) => {
    const { prefetch } = usePrefetch();

    return (
        <div
            className="flex w-full min-w-0"
            onPointerEnter={() => prefetch(`/${item.pageSlug}`)}
        >
            <div className="flex items-center w-full min-w-0">
                <div className="relative w-18 h-18 mobile:w-16 mobile:h-16 shrink-0 rounded-3xl">
                    {item.activeLiveSessionId && <LiveBadge />}
                    {item.activeLiveSessionId ? (
                        <Link
                            href={`/live-room/${item.activeLiveSessionId}`}
                            className="block w-full h-full relative rounded-3xl overflow-hidden border-2 border-yellow-1"
                            onPointerEnter={() => prefetch(`/live-room/${item.activeLiveSessionId}`)}
                            onFocus={() => prefetch(`/live-room/${item.activeLiveSessionId}`)}
                        >
                            <Image
                                className="object-cover"
                                family="avatar"
                                slot="profile"
                                src={item.avatarUrl}
                                fill
                                alt={item.displayName}
                            />
                        </Link>
                    ) : (
                        <div className="w-full h-full relative rounded-3xl overflow-hidden">
                            <Image
                                className="object-cover"
                                family="avatar"
                                slot="profile"
                                src={item.avatarUrl}
                                fill
                                alt={item.displayName}
                            />
                        </div>
                    )}
                </div>

                <div className="ml-4 min-w-0 flex-1">
                    <div className="text-base font-bold capitalize truncate">{item.displayName}</div>
                    <div className="text-xs font-medium text-n-3 dark:text-n-8 line-clamp-2">
                        {item.tagline}
                    </div>
                    <Link
                        href={`/${item.pageSlug}`}
                        className="btn-stroke btn-small h-6 mt-2"
                        onPointerEnter={() => prefetch(`/${item.pageSlug}`)}
                        onFocus={() => prefetch(`/${item.pageSlug}`)}
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Item;
