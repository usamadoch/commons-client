import LoginModal from "@/components/modals/LoginModal";
import LockedOverlay from "@/components/LockedOverlay";

interface LockedContentProps {
    type?: 'box' | 'overlay' | 'gradient';
    title?: string;
    text?: string;
    handleJoin?: () => void;
    isJoining?: boolean;
    user?: any;
    isLoginModalOpen?: boolean;
    setIsLoginModalOpen?: (open: boolean) => void;
}

const LockedContent = ({
    type = 'box',
    title = "Members Only",
    text,
    handleJoin,
    isJoining,
    user,
    isLoginModalOpen,
    setIsLoginModalOpen
}: LockedContentProps) => {

    return (
        <>
            <LockedOverlay 
                type={type} 
                title={title} 
                text={text} 
                buttonText={user ? "Join to unlock" : "Log in to unlock"}
                onClick={handleJoin}
                isLoading={isJoining}
            />
            {(isLoginModalOpen !== undefined && setIsLoginModalOpen) && (
                <LoginModal visible={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            )}
        </>
    );
};

export default LockedContent;
