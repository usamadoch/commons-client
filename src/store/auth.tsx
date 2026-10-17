'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { create } from 'zustand';

import { AuthState, LoginPayload, SignupPayload, ONBOARDING_STEPS } from '@/types';
import { ApiClientError } from '@/services/api.client';
import { authService as authApi } from '@/services/auth.service';
import { useQueryClient } from '@tanstack/react-query';

// ====================
// AUTH STORE TYPES
// ====================

interface AuthStore extends AuthState {
    login: (payload: LoginPayload, options?: { redirect?: boolean }) => Promise<void>;
    signup: (payload: SignupPayload, options?: { redirect?: boolean }) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    refreshUser: () => Promise<void>;
    init: () => Promise<void>;
}

// ====================
// ZUSTAND STORE
// ====================

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,

    init: async () => {
        try {
            console.log('[Auth] Checking session...');
            const { user } = await authApi.getMe();
            console.log('[Auth] Session found:', user.email);
            set({
                user,
                isLoading: false,
                isAuthenticated: true,
                error: null,
            });
        } catch (err) {
            console.log('[Auth] No session found (this is normal for guests)');
            set({
                user: null,
                isLoading: false,
                isAuthenticated: false,
                error: null,
            });
        }
    },

    login: async (payload: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
            const { user } = await authApi.login(payload);
            set({
                user,
                isLoading: false,
                isAuthenticated: true,
                error: null,
            });
        } catch (err) {
            const message = err instanceof ApiClientError ? err.message : 'Login failed';
            set({
                isLoading: false,
                error: message,
            });
            throw err;
        }
    },

    signup: async (payload: SignupPayload) => {
        set({ isLoading: true, error: null });
        try {
            const { user } = await authApi.signup(payload);
            set({
                user,
                isLoading: false,
                isAuthenticated: true,
                error: null,
            });
        } catch (err) {
            const message = err instanceof ApiClientError ? err.message : 'Signup failed';
            set({
                isLoading: false,
                error: message,
            });
            throw err;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await authApi.logout();
        } catch {
            // Ignore logout errors
        }
        set({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
        });
    },

    clearError: () => {
        set({ error: null });
    },

    refreshUser: async () => {
        try {
            const { user } = await authApi.getMe();

            set({ user });
        } catch {
            // Silently fail
        }
    },
}));

// ====================
// HELPER HOOK
// ====================

export function useAuth() {
    const store = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();

    const loginWithRedirect = async (payload: LoginPayload, options?: { redirect?: boolean }) => {
        await store.login(payload);
        queryClient.clear();
        if (options?.redirect === false) return;

        const user = useAuthStore.getState().user; // Get fresh state

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
    };

    const signupWithRedirect = async (payload: SignupPayload, options?: { redirect?: boolean }) => {
        await store.signup(payload);
        queryClient.clear();
        if (options?.redirect === false) return;

        const user = useAuthStore.getState().user;

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
    };

    const logoutWithRedirect = async () => {
        await store.logout();
        queryClient.clear();
        router.push('/');
    };

    return {
        ...store,
        login: loginWithRedirect,
        signup: signupWithRedirect,
        logout: logoutWithRedirect,
    };
}

// ====================
// AUTH PROVIDER COMPONENT
// ====================

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const init = useAuthStore((state) => state.init);

    useEffect(() => {
        init();
    }, [init]);

    return <>{children}</>;
}

// ====================
// AUTH GUARD COMPONENTS
// ====================

interface RouteGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function RequireAuth({ children, fallback }: RouteGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            sessionStorage.setItem('redirectAfterLogin', pathname);
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router, pathname]);

    if (isLoading) return fallback || null;
    if (!isAuthenticated) return fallback || null;

    return <>{children}</>;
}

export function RequireCreator({ children, fallback }: RouteGuardProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (user?.role !== 'creator') {
                router.push('/');
            }
        }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) return fallback || null;
    if (!isAuthenticated || user?.role !== 'creator') return fallback || null;

    return <>{children}</>;
}

export function RequireMember({ children, fallback }: RouteGuardProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (user?.role === 'creator') {
                router.push('/dashboard');
            }
        }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) return fallback || null;
    if (!isAuthenticated || user?.role !== 'member') return fallback || null;

    return <>{children}</>;
}

export function RedirectIfAuthenticated({ children, fallback }: RouteGuardProps) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isOnboarding = isAuthenticated && user?.role === 'creator' && (user?.onboardingStep ?? 0) < ONBOARDING_STEPS.COMPLETE;
    const isOnRegisterPage = pathname === '/register';

    const hasCheckedInitialAuth = React.useRef(false);

    useEffect(() => {
        if (isLoading) return;

        if (!hasCheckedInitialAuth.current) {
            hasCheckedInitialAuth.current = true;
            
            if (isAuthenticated) {
                if (isOnboarding && isOnRegisterPage) return;

                const redirectPath = sessionStorage.getItem('redirectAfterLogin');
                sessionStorage.removeItem('redirectAfterLogin');

                if (redirectPath) {
                    router.push(redirectPath);
                } else if (user?.role === 'creator') {
                    if ((user?.onboardingStep ?? 0) < ONBOARDING_STEPS.COMPLETE) {
                        router.push('/register');
                    } else {
                        router.push('/dashboard');
                    }
                } else {
                    router.push('/');
                }
            }
        }
    }, [isLoading, isAuthenticated, user, router, isOnboarding, isOnRegisterPage]);

    if (!isLoading && isAuthenticated) {
        if (isOnboarding && isOnRegisterPage) {
            return <>{children}</>;
        }
        return fallback || null;
    }

    return <>{children}</>;
}
