import LiveRoomDetailPage from "./_template/LiveRoomDetailPage";

export async function generateMetadata() {
    return {
        title: `Live Room`,
        description: `Join exclusive live stream room on commons.`,
    };
}

import CreatorHeader from "@/layout/CreatorHeader";

import { liveApi } from "@/services/live.service";
import { getInitialPageData } from "@/lib/ssr-helpers";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const LiveRoomDetail = async ({ params }: Props) => {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    let initialPageData = null;
    let initialSessionData = null;
    let pageSlug = "";

    try {
        initialSessionData = await liveApi.getPublicSession(id);
        pageSlug = initialSessionData?.creatorId?.pageSlug || "";
        initialPageData = await getInitialPageData(pageSlug);
    } catch (e) {
        console.error("Error fetching data for live room detail:", e);
    }

    return (
        <>
            <CreatorHeader pageSlug={pageSlug || undefined} initialPageData={initialPageData} />
            <LiveRoomDetailPage initialSessionData={initialSessionData} />
        </>
    );
};

export default LiveRoomDetail;