import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import React from "react";

describe("BeforeAfterSlider Component - Performance", () => {
  beforeEach(() => {
    document.body.style.overflow = "auto";
    // Mock pointer capture methods for jsdom
    window.HTMLElement.prototype.setPointerCapture = function() {};
    window.HTMLElement.prototype.releasePointerCapture = function() {};
  });

  afterEach(() => {
    document.body.style.overflow = "auto";
  });

  it("should toggle is-dragging class when dragging starts and ends", () => {
    render(<BeforeAfterSlider />);
    const container = screen.getByTestId("slider-container");
    
    fireEvent.pointerDown(container, { clientX: 100 });
    expect(document.body.classList.contains('is-dragging')).toBe(true);
    
    fireEvent.pointerUp(container);
    expect(document.body.classList.contains('is-dragging')).toBe(false);
  });

  it("should have touch-action: none on the slider container", () => {
    render(<BeforeAfterSlider />);
    const container = screen.getByTestId("slider-container");
    expect(container).toHaveClass("touch-none");
  });
});
