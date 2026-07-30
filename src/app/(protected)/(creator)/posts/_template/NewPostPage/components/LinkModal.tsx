import { useState } from "react";
import Modal from "@/components/Modal";
import Field from "@/components/Field";

type LinkModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddLink: (url: string) => void;
};

const LinkModal = ({ isOpen, onClose, onAddLink }: LinkModalProps) => {
    const [url, setUrl] = useState("");

    const handleSubmit = () => {
        if (url.trim()) {
            onAddLink(url.trim());
            setUrl("");
            onClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Modal
            visible={isOpen}
            onClose={onClose}
            showCloseIcon={false}
            title="Add Link"
            classWrap="max-w-md"
        >
            <div className="flex flex-col gap-4">
                <Field
                    className="w-full"
                    classInput="h-12"
                    placeholder="Paste link here"
                    icon="link"
                    value={url}
                    onChange={(e: any) => setUrl(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
                <button
                    className="btn-purple btn w-full h-12 rounded-sm"
                    onClick={handleSubmit}
                    disabled={!url.trim()}
                >
                    Add Link
                </button>
            </div>
        </Modal>
    );
};

export default LinkModal;
