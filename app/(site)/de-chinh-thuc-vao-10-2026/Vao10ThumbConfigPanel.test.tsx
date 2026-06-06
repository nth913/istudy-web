import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Vao10ThumbConfigPanel } from "./Vao10ThumbConfigPanel";
import { DEFAULT_THUMB_CONFIG } from "@/lib/vao10/thumbConfig";

const DEF = DEFAULT_THUMB_CONFIG;

describe("Vao10ThumbConfigPanel", () => {
  it("renders 6 labeled sliders", () => {
    render(<Vao10ThumbConfigPanel config={DEF} onChange={() => {}} onClose={() => {}} />);
    expect(screen.getByLabelText(/saturate/i)).toBeTruthy();
    expect(screen.getByLabelText(/contrast/i)).toBeTruthy();
    expect(screen.getByLabelText(/brightness/i)).toBeTruthy();
    expect(screen.getByLabelText(/scrim/i)).toBeTruthy();
    expect(screen.getByLabelText(/tint/i)).toBeTruthy();
    expect(screen.getByLabelText(/photo veil/i)).toBeTruthy();
  });

  it("onChange called with updated field when slider changes", () => {
    const onChange = vi.fn();
    render(<Vao10ThumbConfigPanel config={DEF} onChange={onChange} onClose={() => {}} />);
    const slider = screen.getByLabelText(/saturate/i);
    fireEvent.change(slider, { target: { value: "1.30" } });
    expect(onChange).toHaveBeenCalledWith({ ...DEF, saturate: 1.3 });
  });

  it("Reset button calls onChange with DEFAULT_THUMB_CONFIG", () => {
    const onChange = vi.fn();
    const modified = { ...DEF, saturate: 1.4, contrast: 1.1 };
    render(<Vao10ThumbConfigPanel config={modified} onChange={onChange} onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /reset/i }));
    expect(onChange).toHaveBeenCalledWith(DEF);
  });

  it("close button calls onClose", () => {
    const onClose = vi.fn();
    render(<Vao10ThumbConfigPanel config={DEF} onChange={() => {}} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /đóng/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("shows current value for each slider", () => {
    render(<Vao10ThumbConfigPanel config={DEF} onChange={() => {}} onClose={() => {}} />);
    expect(screen.getByText("1.18")).toBeTruthy();
    expect(screen.getByText("1.05")).toBeTruthy();
    expect(screen.getByText("1.03")).toBeTruthy();
  });
});
