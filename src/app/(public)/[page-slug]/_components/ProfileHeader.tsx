"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";


import Image from "@/components/Image";
import ShareModal from "@/components/modals/ShareModal";
import ReadMore from "@/components/ReadMore";
import LiveBadge from "@/components/LiveBadge";

import { CreatorPage } from "@/types";

import { usePageImageUpload } from "@/hooks/usePageImageUpload";

import ProfileSocials from "./ProfileSocials";
import ProfileHeaderActions from "./ProfileHeaderActions";
import PageImageUploader from "./PageImageUploader";


type CreatorProfileHeaderProps = {
    page: CreatorPage;
    isOwner: boolean;
    isMember: boolean;
    onUpdate?: (type: 'avatar', url: string) => void;
    onJoinSuccess?: () => void;
    onOpenJoinModal?: () => void;
    onOpenLoginModal?: () => void;
};

const ProfileHeader = ({ page, isOwner, isMember, onUpdate, onJoinSuccess, onOpenJoinModal, onOpenLoginModal }: CreatorProfileHeaderProps) => {
    const [visible, setVisible] = useState(false);



    const handleSuccess = useCallback((type: 'banner' | 'avatar', url: string) => {
        if (type === 'avatar' && onUpdate) {
            onUpdate('avatar', url);
        }
    }, [onUpdate]);

    const {
        uploadImage,
        optimisticAvatar,
        uploadingType
    } = usePageImageUpload({
        onUploadSuccess: handleSuccess
    });

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isOwner) return;
        const file = e.target.files?.[0];
        if (file) await uploadImage(file, 'avatar');
    };

    const handleJoinClick = () => {
        onOpenJoinModal?.();
    };



    return (
        <div className="relative z-1 flex flex-col items-end h-full pb-10 px-16 2xl:px-8 lg:px-6 mobile:px-6 mobile:pb-8">
            <div className="flex items-start justify-between w-full pt-8">
                <div className="flex flex-1 items-start">
                    {/* Avatar Section */}
                    <div className="relative shrink-0 w-27.5 tablet:w-24 mobile:w-20 aspect-square">
                        {/* {(optimisticAvatar || page.avatarUrl) && (
                            <div className="absolute top-1 left-1 w-full aspect-square rounded-full bg-[#4ADBC8] border border-black"></div>
                        )} */}
                        <div className="relative w-full aspect-square rounded-full z-10">
                            {isOwner ? (
                                <PageImageUploader
                                    containerClassName="w-full aspect-square rounded-full"
                                    imageClassName="object-cover rounded-full"
                                    imageSrc={optimisticAvatar || page.avatarUrl}

                                    alt="Avatar"
                                    onFileChange={handleAvatarUpload}
                                    uploadIconWrapperClassName="w-8 h-8"
                                    iconClassName="w-4 h-4 fill-n-1"
                                    isLoading={uploadingType === 'avatar'}
                                    family="avatar"
                                    slot="profile"
                                />
                            ) : (
                                <div className="relative w-full aspect-square rounded-full bg-n-1">
                                    {page.activeLiveSessionId && <LiveBadge size="md" />}
                                    {page.activeLiveSessionId ? (
                                        <Link href={`/live-room/${page.activeLiveSessionId}`} className="block w-full h-full relative rounded-full overflow-hidden cursor-pointer border-2 border-red-500">
                                            <Image
                                                className="object-cover"
                                                family="avatar"
                                                slot="profile"
                                                src={page?.avatarUrl}
                                                fill
                                                alt="Avatar"
                                            />
                                        </Link>
                                    ) : (
                                        <div className="relative w-full aspect-square rounded-full overflow-hidden">
                                            <Image
                                                className="object-cover"
                                                family="avatar"
                                                slot="profile"
                                                src={page?.avatarUrl}
                                                fill
                                                alt="Avatar"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-n-1 dark:text-n-9 pl-4">
                        <div className="mb-4">
                            <h5 className="capitalize text-h5 leading-tight">{page.displayName}</h5>
                            <p className="text-base font-medium text-n-4 dark:text-n-8 mt-1">@{page.pageSlug}</p>
                        </div>
                        <div className="flex items-center font-medium text-n-3">
                            <span className="text-sm dark:text-n-7">{page.memberCount || 0} Members</span>
                            <span className="mx-2 text-n-3 dark:text-n-8">•</span>
                            <span className="text-sm dark:text-n-7">{page.postCount || 0} Posts</span>
                        </div>
                        <p className="mt-1 text-base text-n-3 dark:text-n-9">
                            <ReadMore words={18}>
                                {page.tagline || page.about || "No description available."}
                            </ReadMore>
                        </p>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-end self-end shrink-0 mobile:hidden">
                    <ProfileSocials youtube={page.youtube} />

                    <ProfileHeaderActions
                        isOwner={isOwner}
                        isMember={isMember}
                        onJoinClick={handleJoinClick}
                        onShareClick={() => setVisible(true)}
                    />
                </div>
            </div>


            <div className="hidden mobile:flex w-full pt-6 flex-col-reverse gap-4 items-center">
                <ProfileSocials youtube={page.youtube} />

                <ProfileHeaderActions
                    isOwner={isOwner}
                    isMember={isMember}
                    onJoinClick={handleJoinClick}
                    onShareClick={() => setVisible(true)}
                />
            </div>

            <ShareModal
                visible={visible}
                onClose={() => setVisible(false)}
                shareUrl={`/${page.pageSlug}`}
                bannerUrl={page.bannerUrl}
                avatarUrl={page.avatarUrl}
            />

        </div>
    );
};

export default ProfileHeader;
