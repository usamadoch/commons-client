


"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Alert from "@/components/Alert";
import GoogleButton from "@/components/GoogleButton";
import AuthFields from "../../_components/AuthFields";
import DevAuthHelper from "../../_components/DevAuthHelper";
import Loader from "@/components/Loader";

import { ONBOARDING_STEPS } from "@/types";

import { useAuthForm } from "@/hooks/useAuthForm";

const LoginPage = () => {
    const router = useRouter();

    const {
        form,
        step, setStep, flow, setFlow, authLoading, isCheckingEmail,
        onSubmit
    } = useAuthForm({
        redirect: true,
        onSignupSuccess: () => router.push('/'),
    });

    const { register, handleSubmit, watch, clearErrors, formState: { errors, isSubmitted } } = form;
    const remember = watch("remember");

    // Clear stale root errors when the page mounts (e.g., user navigated away and came back)
    useEffect(() => {
        clearErrors("root");
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Listen to query parameters for automated dev filling across routes
    useEffect(() => {
        if (typeof window === "undefined") return;
        const searchParams = new URLSearchParams(window.location.search);
        const devFill = searchParams.get("devFill");
        const devEmail = searchParams.get("devEmail");

        if (devFill && devFill.startsWith("member_")) {
            const memberName = devFill.replace("_", " ").replace("member", "Member");
            form.setValue("email", `${devFill}@test.com`, { shouldValidate: true, shouldDirty: true });
            form.setValue("displayName", memberName, { shouldValidate: true, shouldDirty: true });
            form.setValue("password", "Password123!", { shouldValidate: true, shouldDirty: true });
            setFlow("signup");
            setStep(2);
        } else if (devEmail) {
            form.setValue("email", devEmail, { shouldValidate: true, shouldDirty: true });
            form.setValue("password", "password123", { shouldValidate: true, shouldDirty: true });
            setFlow("login");
            setStep(2);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Two-phase back: first trigger exit animations, then change step
    const [isGoingBack, setIsGoingBack] = useState(false);

    const handleBack = () => {
        clearErrors("root");
        setIsGoingBack(true);
    };

    const handleFieldsExitComplete = () => {
        if (isGoingBack) {
            setStep(1);
            setIsGoingBack(false);
        }
    };

    const handleFillRandomMember = (user: { email: string; displayName: string; password: string }) => {
        clearErrors();
        form.setValue("email", user.email, { shouldValidate: true, shouldDirty: true });
        form.setValue("displayName", user.displayName, { shouldValidate: true, shouldDirty: true });
        form.setValue("password", user.password, { shouldValidate: true, shouldDirty: true });
        setFlow("signup");
        setStep(2);
    };

    const handleFillRandomCreator = (user: {
        email: string;
        displayName: string;
        password: string;
        creatorName: string;
        pageSlug: string;
        category: string[];
    }) => {
        try {
            sessionStorage.setItem("commons_register_draft", JSON.stringify(user));
        } catch {
            // Ignore storage errors
        }
        router.push(`/register?devFill=${encodeURIComponent(user.email.split("@")[0])}`);
    };

    const handleFillExistingUser = (user: { email: string; password: string; role: "creator" | "member"; label: string }) => {
        clearErrors();
        form.setValue("email", user.email, { shouldValidate: true, shouldDirty: true });
        form.setValue("password", user.password, { shouldValidate: true, shouldDirty: true });
        setFlow("login");
        setStep(2);
    };

    return (
        <>
            <DevAuthHelper
                page="login"
                onFillRandomMember={handleFillRandomMember}
                onFillRandomCreator={handleFillRandomCreator}
                onFillExistingUser={handleFillExistingUser}
            />

            {step === 1 && (
                <>
                    <GoogleButton
                        onSuccess={(user) => {
                            const redirectPath = sessionStorage.getItem('redirectAfterLogin');
                            if (redirectPath) {
                                sessionStorage.removeItem('redirectAfterLogin');
                                router.push(redirectPath);
                                return;
                            }

                            if (user?.role === 'creator') {
                                if ((user?.onboardingStep ?? 0) < ONBOARDING_STEPS.COMPLETE) {
                                    router.push('/register');
                                } else {
                                    router.push('/dashboard');
                                }
                            } else {
                                router.push('/');
                            }
                        }}
                        onError={(err) => clearErrors("root")}
                    />
                    <div className="flex justify-center items-center py-6">
                        <span className="w-full max-w-33 h-0.25 bg-n-1 dark:bg-n-6"></span>
                        <span className="mx-4 text-sm font-medium dark:text-n-6">or</span>
                        <span className="w-full max-w-33 h-0.25 bg-n-1 dark:bg-n-6"></span>
                    </div>
                </>
            )}


            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {errors.root && (
                    <Alert
                        type="error"
                        message={errors.root.message}
                        onClose={() => clearErrors("root")}
                    />
                )}

                <AuthFields
                    register={register}
                    errors={errors}
                    showName={step === 2 && flow === 'signup' && !isGoingBack}
                    showEmail={!(step === 2 && flow === 'signup')}
                    showPassword={step === 2 && !isGoingBack}
                    emailReadOnly={step === 2}
                    nameAutoFocus={true}
                    passwordAutoFocus={flow === 'login'}
                    onExitComplete={handleFieldsExitComplete}
                    isSubmitted={isSubmitted}
                />

                {/* {step === 2 && flow === 'login' && (
                    <div className="flex justify-between items-center mb-6">
                        <Checkbox
                            label="Remember me"
                            {...register("remember")}
                            checked={remember}
                        />
                        <button
                            className="mt-0.5 text-xs font-bold transition-colors hover:text-purple-1"
                            // onClick={onRecover}
                            type="button"
                        >
                            Recover password
                        </button>
                    </div>
                )} */}

                <button
                    className="btn-purple btn-shadow w-full h-12"
                    type="submit"
                    disabled={authLoading || isCheckingEmail}
                >
                    {authLoading || isCheckingEmail ? (
                        <Loader className="w-6 h-6 text-white" />
                    ) : (
                        step === 1
                            ? "Continue"
                            : (flow === 'login' ? "Sign in" : "Create account")
                    )}
                </button>

                {step === 2 && !isGoingBack && (
                    <button
                        className="btn-stroke w-full h-12 mt-4"
                        type="button"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                )}


            </form>
        </>
    );
};

export default LoginPage;
