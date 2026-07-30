import { MediaFile } from "@/app/(protected)/(creator)/posts/_template/NewPostPage/hooks/useMediaUpload";
import { MediaAttachment } from "@/types";

export function areAttachmentsEqual(current: MediaFile[], original: MediaAttachment[]) {
    if (current.length !== original.length) return false;
    return current.every((c, i) => {
        if (c.isNew) return false;
        const originalUrl = original[i].url;
        return c.url === originalUrl;
    });
}

export function getPostTypeIcon(postType?: string, mediaItemType?: string, poll?: any, linkUrl?: string) {
    let postTypeIcon = (mediaItemType === 'video' || postType === 'video') ? 'video' 
                     : (mediaItemType === 'image' || postType === 'image') ? 'camera' : 'document';
    
    if (poll) {
        postTypeIcon = 'chart';
    } else if (linkUrl) {
        postTypeIcon = 'external-link';
    }

    return postTypeIcon;
}

export function getLinkMediaUrl(linkUrl: string): string | undefined {
    if (linkUrl.includes("youtube.com/watch?v=")) {
        const videoId = linkUrl.split("watch?v=")[1]?.split("&")[0];
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    } else if (linkUrl.includes("youtu.be/")) {
        const videoId = linkUrl.split("youtu.be/")[1]?.split("?")[0];
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    }
    return undefined;
}
