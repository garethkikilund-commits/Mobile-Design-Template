import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a button with its label and safe defaults", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("large", "fill");
  });

  it("applies the requested size and variant", () => {
    render(
      <Button size="small" variant="outline">
        Save
      </Button>
    );
    expect(screen.getByRole("button")).toHaveClass("small", "outline");
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  describe("loading", () => {
    it("is marked busy, keeps its accessible name and ignores clicks", async () => {
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Save
        </Button>
      );
      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toHaveAttribute("aria-disabled", "true");
      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it("hides the icons while loading", () => {
      render(
        <Button loading iconLeft={<svg data-testid="left" />} iconRight={<svg data-testid="right" />}>
          Save
        </Button>
      );
      expect(screen.queryByTestId("left")).not.toBeInTheDocument();
      expect(screen.queryByTestId("right")).not.toBeInTheDocument();
    });
  });

  it("renders left and right icons", () => {
    render(
      <Button iconLeft={<svg data-testid="left" />} iconRight={<svg data-testid="right" />}>
        Save
      </Button>
    );
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("forwards the ref, merges className and passes other props through", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} className="custom" data-testid="btn" type="submit">
        Save
      </Button>
    );
    const button = screen.getByTestId("btn");
    expect(ref.current).toBe(button);
    expect(button).toHaveClass("custom", "button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
