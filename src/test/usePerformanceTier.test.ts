import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { usePerformanceTier } from "../hooks/usePerformanceTier";

describe("usePerformanceTier Hook", () => {
  let originalMatchMedia: any;
  let originalNavigator: any;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    originalNavigator = global.navigator;

    // Define mock getters
    Object.defineProperty(global, 'navigator', {
      value: { ...originalNavigator },
      writable: true,
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    global.navigator = originalNavigator;
    vi.restoreAllMocks();
  });

  it("should return tier 1 if prefers-reduced-motion is true", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    const { result } = renderHook(() => usePerformanceTier());
    
    expect(result.current.tier).toBe(1);
    expect(result.current.isLowEnd).toBe(true);
  });

  it("should return tier 1 for low hardware concurrency (< 4)", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(global.navigator, 'hardwareConcurrency', { value: 2, configurable: true });
    
    const { result } = renderHook(() => usePerformanceTier());
    
    expect(result.current.tier).toBe(1);
    expect(result.current.isLowEnd).toBe(true);
  });

  it("should return tier 2 for mid-range connection (2g)", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(global.navigator, 'hardwareConcurrency', { value: 8, configurable: true });
    Object.defineProperty(global.navigator, 'deviceMemory', { value: 8, configurable: true });
    Object.defineProperty(global.navigator, 'connection', { 
      value: { effectiveType: "2g", saveData: false }, 
      configurable: true 
    });
    
    const { result } = renderHook(() => usePerformanceTier());
    
    expect(result.current.tier).toBe(2);
    expect(result.current.isLowEnd).toBe(false);
  });

  it("should return tier 3 for high-end devices", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(global.navigator, 'hardwareConcurrency', { value: 8, configurable: true });
    Object.defineProperty(global.navigator, 'deviceMemory', { value: 8, configurable: true });
    Object.defineProperty(global.navigator, 'connection', { 
      value: { effectiveType: "4g", saveData: false }, 
      configurable: true 
    });
    
    const { result } = renderHook(() => usePerformanceTier());
    
    expect(result.current.tier).toBe(3);
    expect(result.current.isLowEnd).toBe(false);
  });
});
