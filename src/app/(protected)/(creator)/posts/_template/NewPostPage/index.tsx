"use client"

import { usePostForm } from "./usePostForm";
import PostForm from "./components/PostForm";

const NewPostPage = () => {
    const formState = usePostForm();

    return (
        <div className="w-full">
            <PostForm formState={formState} />
        </div>
    );
};

export default NewPostPage;
