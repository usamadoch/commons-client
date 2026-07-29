








import Layout from "@/layout";
import { ExplorePage } from "./_template/ExplorePage";
import { cookies } from "next/headers";

export const metadata = {
    description: "Explore top creators, active channels, and popular posts on commons.",
};

export default async function Explore() {
    const cookieStore = await cookies();
    const hasToken = cookieStore.has('refreshToken') || cookieStore.has('accessToken');

    return (
        <Layout requireAuth={false} initialIsAuthenticated={hasToken}>
            <ExplorePage />
        </Layout>
    );
}
