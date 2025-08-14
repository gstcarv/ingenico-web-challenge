import { useEffect, RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    callback: () => void,
    enabled: boolean = true,
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        if (enabled) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback, enabled]);
}
