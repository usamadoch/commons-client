import Layout from "@/layout";
import { cookies } from "next/headers";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const hasToken = cookieStore.has('refreshToken') || cookieStore.has('accessToken');

    return (
        <Layout initialIsAuthenticated={hasToken}>
            {children}
        </Layout>
    );
};

export default ProtectedLayout;