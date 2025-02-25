import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useRef } from "react";

export function useLastMessageVisible() {
    const lastMessageRef = useRef<HTMLDivElement>(null)

    const [entry] = useIntersectionObserver({
        root: lastMessageRef.current,
        threshold: 0.1
    })


    return { lastMessageRef, entry };
}