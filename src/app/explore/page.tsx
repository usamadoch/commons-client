








import Layout from "@/layout";
import { ExplorePage } from "./_template/ExplorePage";
import { pageService } from "@/services/page.service";
import { ExploreCreator } from "@/types";

export const revalidate = 120; // 2 minutes ISR for explore directory

export const metadata = {
    title: "Explore Creators — Commons",
    description: "Explore top creators, active channels, and popular posts on commons.",
};

export default async function Explore() {
    let initialCreators: ExploreCreator[] = [];
    try {
        const data = await pageService.getAll({
            next: { revalidate: 120, tags: ['explore-creators'] },
        });
        initialCreators = data?.pages || [];
    } catch (e) {
        console.error('[Explore] Failed to prefetch creators:', e);
    }

    return (
        <Layout requireAuth={false}>
            <ExplorePage initialCreators={initialCreators} />
        </Layout>
    );
}
