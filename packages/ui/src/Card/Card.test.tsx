import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

const media = <img alt="" src="data:," />;

describe("Card", () => {
  it("renders the title and description", () => {
    render(<Card media={media} title="Card Header" description="This is a card description" />);
    expect(screen.getByText("Card Header")).toBeInTheDocument();
    expect(screen.getByText("This is a card description")).toBeInTheDocument();
  });

  it("defaults to a boxed card with the body at the bottom", () => {
    render(<Card media={media} title="Title" />);
    expect(screen.getByRole("article")).toHaveClass("boxed", "bottom");
  });

  it("applies the requested type and body position", () => {
    render(<Card media={media} title="Title" cardType="inside" body="top" />);
    expect(screen.getByRole("article")).toHaveClass("inside", "top");
  });

  it("renders the action, footer and trailing slots", () => {
    render(
      <Card
        media={media}
        title="Title"
        action={<button>More</button>}
        footer={<span>Rating</span>}
        trailing={<button>Go</button>}
      />
    );
    expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
  });

  it("does not render the trailing slot on an inside card", () => {
    render(<Card media={media} title="Title" cardType="inside" trailing={<button>Go</button>} />);
    expect(screen.queryByRole("button", { name: "Go" })).not.toBeInTheDocument();
  });

  it("passes extra props to the root element", () => {
    render(<Card media={media} title="Title" data-testid="card" />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });
});
