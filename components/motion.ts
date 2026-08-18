"use client";

import { useReducedMotion, type Variants } from "framer-motion";
import { useSyncExternalStore } from "react";

const subscribeHydration = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useHydratedReducedMotion() {
    const preferred = useReducedMotion();
    const hydrated = useSyncExternalStore(subscribeHydration, getClientSnapshot, getServerSnapshot);

    return hydrated ? Boolean(preferred) : false;
}

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const slabLeft: Variants = {
    hidden: { x: "-12vw", opacity: 1 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 150, damping: 18, mass: 0.8 },
    },
};

export const slabRight: Variants = {
    hidden: { x: "12vw", opacity: 1 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 150, damping: 18, mass: 0.8 },
    },
};

export const stampIn: Variants = {
    hidden: { scale: 1.16, y: 24, opacity: 0 },
    visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: { duration: 0.28, ease: motionEase },
    },
    exit: { scale: 0.94, y: -12, opacity: 0, transition: { duration: 0.14 } },
};

export const shutterTransition = { duration: 0.42, ease: motionEase };
