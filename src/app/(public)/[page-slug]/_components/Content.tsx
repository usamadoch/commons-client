
import { useEffect, useState } from "react";

import { Post } from "@/types";
import { useAuth } from "@/store/auth";
import { useCreatorPage, useCreatorPosts } from "@/hooks/queries";
import { useQueryClient } from "@tanstack/react-query";
import PostModal from "@/components/modals/PostModal";
import Loader from "@/components/Loader";
import RecentVideos from "./RecentVideos";
import PostCard from "@/components/PostCard";
import Empty from "@/components/Empty";

type CreatorContentProps = {
    pageSlug: string;
    onOpenJoinModal?: () => void;
    onOpenLoginModal?: () => void;
};

const Content = ({ pageSlug, onOpenJoinModal, onOpenLoginModal }: CreatorContentProps) => {
    // Using cached queries
    const { data: pageData } = useCreatorPage(pageSlug);
    const { data: postsData, isLoading } = useCreatorPosts(pageSlug, { type: ['text', 'image', 'video'] });
    const { isAuthenticated, user } = useAuth();
    const queryClient = useQueryClient();

    const { page } = pageData || {};
    const posts = postsData || [];

    const isOwner = pageData?.isOwner;

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    const activePost = posts.find(p => p._id === selectedPostId) || null;

    const handlePostClick = (post: Post) => {
        if (!post.isLocked) {
            setSelectedPostId(post._id);
        } else {
            if (!isAuthenticated) {
                onOpenLoginModal?.();
            } else {
                onOpenJoinModal?.();
            }
        }
    };


    return (
        <div className="pb-20 px-16 2xl:px-8 lg:px-6 mobile:px-6">
            <div className="grid grid-cols-12 lg:grid-cols-1 gap-8">
                <div className="col-span-8 lg:col-span-1 pt-10 lg:pt-0">

                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loader text="Loading posts..." />
                        </div>
                    ) : (
                        posts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5">
                                {posts.map((post: Post) => (
                                    <PostCard
                                        key={post._id}
                                        post={post}
                                        page={page}
                                        isOwner={!!isOwner}
                                        onCommentClick={() => handlePostClick(post)}
                                    />
                                ))}
                            </div>
                        ) : page?.status === 'published' ? (
                            isOwner ? (
                                <div className="mt-8">
                                    <Empty
                                        title="No posts yet"
                                        content="Start creating your first post and share it with your audience."
                                        buttonText="Create Post"
                                        buttonUrl={`/posts/new`}
                                    />
                                </div>
                            ) : (
                                <div className="mt-8">
                                    <Empty
                                        title="No posts yet"
                                        content="This creator hasn't published any posts yet."
                                    />
                                </div>
                            )
                        ) : null
                    )}
                </div>

                {/* Right Sidebar - Top Videos */}
                <div className="col-span-4 lg:col-span-1 pt-10 lg:hidden">
                    <RecentVideos
                        pageSlug={pageSlug}
                    />
                </div>
            </div>
            <PostModal
                visible={!!activePost}
                post={activePost}
                page={page}
                onClose={() => setSelectedPostId(null)}
            />
        </div>
    );
};

export default Content;

