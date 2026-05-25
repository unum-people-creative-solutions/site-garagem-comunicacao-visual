import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Hero } from "../components/Hero";
import React from "react";

// Mock LeadContext since Hero uses useLead
vi.mock("../context/LeadContext", () => ({
  useLead: () => ({
    openModal: vi.fn(),
  }),
  LeadProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe("Hero Component - Spotlight Effect", () => {
  it("should render two spotlight elements", () => {
    render(<Hero />);
    const spotlights = screen.getAllByTestId("hero-spotlight");
    expect(spotlights).toHaveLength(2);
  });
});
