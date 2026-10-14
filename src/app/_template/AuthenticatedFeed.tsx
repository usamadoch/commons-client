"use client";

import Loader from "@/components/Loader";
import { useMyMemberships } from "@/hooks/queries";
import { useAuth } from "@/store/auth";
import EmptySubscriptions from "./_components/EmptySubscriptions";
import HomeFeedList from "./_components/HomeFeedList";

const AuthenticatedFeed = () => {
    const { user } = useAuth();
    const { data: membershipsData, isLoading: membershipsLoading } = useMyMemberships();

    if (!user) {
        return <EmptySubscriptions />;
    }

    if (membershipsLoading) {
        return (
            <div className="flex justify-center items-center pt-10">
                <Loader />
            </div>
        );
    }

    const members = (membershipsData || []).filter(m =>
        m.pageId && typeof m.pageId === 'object'
    );

    const hasSubscriptions = members.length > 0;

    return (
        <>
            {!hasSubscriptions ? (
                <EmptySubscriptions />
            ) : (
                <HomeFeedList />
            )}
        </>
    );
};

export default AuthenticatedFeed;