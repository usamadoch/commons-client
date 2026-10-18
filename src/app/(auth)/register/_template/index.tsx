"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Step1Account from "./steps/Step1Account";
import Step2CreatorDetails from "./steps/Step2CreatorDetails";
import Step3Category from "./steps/Step3Category";
import Step4Socials from "./steps/Step4Socials";
import DevAuthHelper from "../../_components/DevAuthHelper";
import Loader from "@/components/Loader";

import { SignUpFormValues, SignUpSchema } from "../../_validations";
import { useAuthStore } from "@/store/auth";
import { ONBOARDING_STEPS } from "@/types";

const STEPS = {
    ACCOUNT: 1,
    DETAILS: 2,
    CATEGORY: 3,
    SOCIALS: 4,
};

const DRAFT_STORAGE_KEY = "commons_register_draft";

// Map server onboardingStep to which wizard step to show next
function getInitialStep(onboardingStep?: number): number {
    switch (onboardingStep) {
        case 1: return STEPS.DETAILS;   // Account created → show details
        case 2: return STEPS.CATEGORY;  // Details done → show category
        case 3: return STEPS.SOCIALS;   // Category done → show socials
        default: return STEPS.ACCOUNT;  // Not started or undefined
    }
}

const RegistrationPage = () => {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const isAuthLoading = useAuthStore((s) => s.isLoading);
    const [step, setStep] = useState<number>(STEPS.ACCOUNT);
    const [ready, setReady] = useState(false);

    const methods = useForm<SignUpFormValues>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            displayName: "",
            password: "",
            creatorName: "",
            pageSlug: "",
            category: [],
        },
        mode: "onSubmit"
    });

    // Wait for auth to finish loading, then set the correct step and restore draft
    useEffect(() => {
        if (!isAuthLoading && !ready) {
            if (user?.onboardingStep && user.onboardingStep > 0 && user.onboardingStep < ONBOARDING_STEPS.COMPLETE) {
                setStep(getInitialStep(user.onboardingStep));
            }

            try {
                const savedDraft = sessionStorage.getItem(DRAFT_STORAGE_KEY);
                if (savedDraft) {
                    const parsed = JSON.parse(savedDraft);
                    Object.entries(parsed).forEach(([key, val]) => {
                        if (val !== undefined && val !== null && val !== "") {
                            methods.setValue(key as any, val);
                        }
                    });
                }
            } catch (e) {
                console.error("Failed to restore registration draft", e);
            }

            if (user) {
                if (user.email && !methods.getValues("email")) methods.setValue("email", user.email);
                if (user.displayName) {
                    if (!methods.getValues("displayName")) methods.setValue("displayName", user.displayName);
                    if (!methods.getValues("creatorName")) methods.setValue("creatorName", user.displayName);
                }
            }

            setReady(true);
        }
    }, [isAuthLoading, user, ready, methods]);

    // Persist form state changes to sessionStorage
    useEffect(() => {
        const subscription = methods.watch((value) => {
            try {
                sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(value));
            } catch (e) {
                // Ignore storage errors
            }
        });
        return () => subscription.unsubscribe();
    }, [methods]);

    // Handle dev auto-fill from query param
    useEffect(() => {
        if (typeof window === "undefined") return;
        const searchParams = new URLSearchParams(window.location.search);
        const devFill = searchParams.get("devFill");
        if (devFill && devFill.startsWith("creator_")) {
            const num = devFill.replace("creator_", "");
            methods.setValue("email", `${devFill}@test.com`, { shouldValidate: true, shouldDirty: true });
            methods.setValue("displayName", `Creator ${num}`, { shouldValidate: true, shouldDirty: true });
            methods.setValue("password", "Password123!", { shouldValidate: true, shouldDirty: true });
            methods.setValue("creatorName", `Studio ${num}`, { shouldValidate: true, shouldDirty: true });
            methods.setValue("pageSlug", `studio-${num}`, { shouldValidate: true, shouldDirty: true });
            methods.setValue("category", ["Technology", "Design"], { shouldValidate: true, shouldDirty: true });
            try {
                sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(methods.getValues()));
            } catch {
                // Ignore storage errors
            }
        }
    }, [methods]);

    const handleFillRandomCreator = (creator: {
        email: string;
        displayName: string;
        password: string;
        creatorName: string;
        pageSlug: string;
        category: string[];
    }) => {
        methods.setValue("email", creator.email, { shouldValidate: true, shouldDirty: true });
        methods.setValue("displayName", creator.displayName, { shouldValidate: true, shouldDirty: true });
        methods.setValue("password", creator.password, { shouldValidate: true, shouldDirty: true });
        methods.setValue("creatorName", creator.creatorName, { shouldValidate: true, shouldDirty: true });
        methods.setValue("pageSlug", creator.pageSlug, { shouldValidate: true, shouldDirty: true });
        methods.setValue("category", creator.category, { shouldValidate: true, shouldDirty: true });
        try {
            sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(methods.getValues()));
        } catch {
            // Ignore storage errors
        }
        methods.clearErrors();
    };

    const handleFillRandomMember = () => {
        const randId = Math.floor(1000 + Math.random() * 9000);
        router.push(`/login?devFill=member_${randId}`);
    };

    const handleFillExistingUser = (user: { email: string }) => {
        router.push(`/login?devEmail=${encodeURIComponent(user.email)}`);
    };

    const onNext = () => setStep((prev) => Math.min(prev + 1, STEPS.SOCIALS));
    const onBack = () => setStep((prev) => Math.max(prev - 1, STEPS.ACCOUNT));

    // Don't render the form until we know which step to show
    if (!ready) {
        return (
            <div className="w-full max-w-120 mx-auto flex justify-center items-center min-h-[50vh]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full max-w-120 mx-auto">
            <DevAuthHelper
                page="register"
                onFillRandomCreator={handleFillRandomCreator}
                onFillRandomMember={handleFillRandomMember}
                onFillExistingUser={handleFillExistingUser}
            />
            <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={step === STEPS.ACCOUNT ? "block" : "hidden"}>
                        <Step1Account onNext={onNext} />
                    </div>
                    <div className={step === STEPS.DETAILS ? "block" : "hidden"}>
                        <Step2CreatorDetails onNext={onNext} onBack={onBack} />
                    </div>
                    <div className={step === STEPS.CATEGORY ? "block" : "hidden"}>
                        <Step3Category onNext={onNext} onBack={onBack} />
                    </div>
                    <div className={step === STEPS.SOCIALS ? "block" : "hidden"}>
                        <Step4Socials onBack={onBack} />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default RegistrationPage;
