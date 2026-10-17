"use client";

import { usePageSlug } from "@/hooks/usePageSlug";
import Content from "../_components/Content";
import { useCreatorPageContext } from "../_components/CreatorLayoutWrapper";

import { Post } from "@/types";

const CreatorPage = ({ initialPosts }: { initialPosts?: Post[] }) => {
    const slug = usePageSlug();
    const { onOpenJoinModal, onOpenLoginModal } = useCreatorPageContext();

    return (
        <Content 
            pageSlug={slug}
            initialPosts={initialPosts}
            onOpenJoinModal={onOpenJoinModal}
            onOpenLoginModal={onOpenLoginModal}
        />
    );
};

export default CreatorPage;
