import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Hero } from "../components/Hero";
import React from "react";
import * as performanceHook from "../hooks/usePerformanceTier";

// Mock LeadContext since Hero uses useLead
vi.mock("../context/LeadContext", () => ({
  useLead: () => ({
    openModal: vi.fn(),
  }),
  LeadProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

vi.mock("../hooks/usePerformanceTier", () => ({
  usePerformanceTier: vi.fn(),
}));

describe("Hero Component - Spotlight Effect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render spotlights in Tier 1 (Low End)", () => {
    vi.mocked(performanceHook.usePerformanceTier).mockReturnValue({ tier: 1, isLowEnd: true });
    render(<Hero />);
    const spotlights = screen.queryAllByTestId("hero-spotlight");
    expect(spotlights).toHaveLength(0);
  });

  it("should render static spotlights in Tier 2 (Mid Range) without infinite css animations", () => {
    vi.mocked(performanceHook.usePerformanceTier).mockReturnValue({ tier: 2, isLowEnd: false });
    render(<Hero />);
    const spotlights = screen.getAllByTestId("hero-spotlight");
    expect(spotlights).toHaveLength(2);
    // Deve renderizar, mas não deve possuir classes de animação contínua (animate-spotlight-left/right)
    expect(spotlights[0]).not.toHaveClass("animate-spotlight-left");
    expect(spotlights[1]).not.toHaveClass("animate-spotlight-right");
  });

  it("should render animated spotlights with GPU acceleration classes in Tier 3 (High End)", () => {
    vi.mocked(performanceHook.usePerformanceTier).mockReturnValue({ tier: 3, isLowEnd: false });
    render(<Hero />);
    const spotlights = screen.getAllByTestId("hero-spotlight");
    expect(spotlights).toHaveLength(2);
    
    // Deve possuir as classes CSS customizadas para animação via GPU em globals.css
    expect(spotlights[0]).toHaveClass("animate-spotlight-left");
    expect(spotlights[1]).toHaveClass("animate-spotlight-right");
  });
});

