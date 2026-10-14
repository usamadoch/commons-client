"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
import { useAuth } from "@/store/auth";
import { useCreatorPage, useCreatorPosts } from "@/hooks/queries";
import PostCard from "@/components/PostCard";
import PostModal from "@/components/modals/PostModal";
import Loader from "@/components/Loader";
import LoginModal from "@/components/modals/LoginModal";
import JoinTierModal from "@/components/modals/JoinTierModal";

const PublicFeed = () => {
    const router = useRouter();
    const pageSlug = "commons";
    const { isAuthenticated } = useAuth();

    const { data: pageData, isLoading: pageLoading } = useCreatorPage(pageSlug);
    const { data: postsData, isLoading: postsLoading } = useCreatorPosts(pageSlug, {
        type: ['text', 'image', 'video']
    });

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    const { page, isOwner } = pageData || {};
    const posts = postsData || [];

    const activePost = posts.find((p) => p._id === selectedPostId) || null;

    const handlePostClick = (post: Post) => {
        if (!post.isLocked) {
            if (typeof window !== "undefined" && window.innerWidth <= 767) {
                router.push(`/posts/${post._id}`);
                return;
            }
            setSelectedPostId(post._id);
        } else {
            if (!isAuthenticated) {
                setShowLoginModal(true);
            } else {
                setShowJoinModal(true);
            }
        }
    };

    if (pageLoading || postsLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader text="Loading feed..." />
            </div>
        );
    }

    if (!page || posts.length === 0) {
        return null;
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-6 w-full mobile:gap-4">
                {posts.map((post: Post) => (
                    <div key={post._id} className="w-full">
                        <div className="relative">
                            <PostCard
                                post={post}
                                page={page}
                                isOwner={!!isOwner}
                                onCommentClick={() => handlePostClick(post)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <PostModal
                visible={!!activePost}
                post={activePost}
                page={page}
                onClose={() => setSelectedPostId(null)}
            />

            <LoginModal
                visible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />

            {page && (
                <JoinTierModal
                    visible={showJoinModal}
                    onClose={() => setShowJoinModal(false)}
                    page={page}
                />
            )}
        </>
    );
};

export default PublicFeed;