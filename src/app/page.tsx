




import Layout from "@/layout";
import { RootHomePage } from "./_template/RootHomePage";
import { cookies } from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();
    const hasToken = cookieStore.has('refreshToken') || cookieStore.has('accessToken');

    return (
        <Layout requireAuth={false} initialIsAuthenticated={hasToken}>
            <RootHomePage />
        </Layout>
    );
}
