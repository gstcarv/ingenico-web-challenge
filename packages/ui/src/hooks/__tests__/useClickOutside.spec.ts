import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useClickOutside } from "../useClickOutside";

// Mock document methods
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

Object.defineProperty(document, "addEventListener", {
    value: mockAddEventListener,
    writable: true,
});

Object.defineProperty(document, "removeEventListener", {
    value: mockRemoveEventListener,
    writable: true,
});

describe("useClickOutside", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("adds event listener when enabled", () => {
        const callback = vi.fn();
        const ref = { current: document.createElement("div") };

        renderHook(() => useClickOutside(ref, callback, true));

        expect(mockAddEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function));
    });

    it("does not add event listener when disabled", () => {
        const callback = vi.fn();
        const ref = { current: document.createElement("div") };

        renderHook(() => useClickOutside(ref, callback, false));

        expect(mockAddEventListener).not.toHaveBeenCalled();
    });

    it("removes event listener on cleanup", () => {
        const callback = vi.fn();
        const ref = { current: document.createElement("div") };

        const { unmount } = renderHook(() => useClickOutside(ref, callback, true));

        unmount();

        expect(mockRemoveEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function));
    });

    it("calls callback when clicking outside", () => {
        const callback = vi.fn();
        const ref = { current: document.createElement("div") };

        renderHook(() => useClickOutside(ref, callback, true));

        // Get the event handler that was registered
        const eventHandler = mockAddEventListener.mock.calls[0][1];

        // Simulate click outside
        const outsideElement = document.createElement("div");
        const mockEvent = {
            target: outsideElement,
        } as unknown as MouseEvent;

        eventHandler(mockEvent);

        expect(callback).toHaveBeenCalled();
    });

    it("does not call callback when clicking inside", () => {
        const callback = vi.fn();
        const ref = { current: document.createElement("div") };

        renderHook(() => useClickOutside(ref, callback, true));

        // Get the event handler that was registered
        const eventHandler = mockAddEventListener.mock.calls[0][1];

        // Simulate click inside
        const mockEvent = {
            target: ref.current,
        } as unknown as MouseEvent;

        eventHandler(mockEvent);

        expect(callback).not.toHaveBeenCalled();
    });

    it("does not call callback when ref is null", () => {
        const callback = vi.fn();
        const ref = { current: null };

        renderHook(() => useClickOutside(ref, callback, true));

        // Get the event handler that was registered
        const eventHandler = mockAddEventListener.mock.calls[0][1];

        // Simulate click outside
        const outsideElement = document.createElement("div");
        const mockEvent = {
            target: outsideElement,
        } as unknown as MouseEvent;

        eventHandler(mockEvent);

        expect(callback).not.toHaveBeenCalled();
    });

    it("handles ref with contains method", () => {
        const callback = vi.fn();
        const ref = {
            current: {
                contains: vi.fn().mockReturnValue(false),
            } as unknown as HTMLElement,
        };

        renderHook(() => useClickOutside(ref, callback, true));

        // Get the event handler that was registered
        const eventHandler = mockAddEventListener.mock.calls[0][1];

        // Simulate click outside
        const outsideElement = document.createElement("div");
        const mockEvent = {
            target: outsideElement,
        } as unknown as MouseEvent;

        eventHandler(mockEvent);

        expect(ref.current.contains).toHaveBeenCalledWith(outsideElement);
        expect(callback).toHaveBeenCalled();
    });
});
