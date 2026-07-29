"use client";

import { usePageSlug } from "@/hooks/usePageSlug";
import Content from "../_components/Content";
import { useCreatorPageContext } from "../_components/CreatorLayoutWrapper";

const CreatorPage = () => {
    const slug = usePageSlug();
    const { onOpenJoinModal, onOpenLoginModal } = useCreatorPageContext();

    return (
        <Content 
            pageSlug={slug}
            onOpenJoinModal={onOpenJoinModal}
            onOpenLoginModal={onOpenLoginModal}
        />
    );
};

export default CreatorPage;
