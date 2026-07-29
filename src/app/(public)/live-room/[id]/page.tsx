import LiveRoomDetailPage from "./_template/LiveRoomDetailPage";

export async function generateMetadata() {
    return {
        title: `Live Room`,
        description: `Join exclusive live stream room on commons.`,
    };
}

import CreatorHeader from "@/layout/CreatorHeader";

const LiveRoomDetail = () => {
    return (
        <>
            <CreatorHeader />
            <LiveRoomDetailPage />
        </>
    );
};

export default LiveRoomDetail;