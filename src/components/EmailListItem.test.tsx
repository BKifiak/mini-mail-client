// src/components/EmailListItem.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import EmailListItem from "./EmailListItem";
import { Email } from "../AppTypes";

describe("EmailListItem", () => {
  const mockOnSelect = jest.fn();

  const email: Email = {
    id: "1",
    avatar: "https://example.com/avatar.jpg",
    subject: "Test Email Subject",
    sender: "test@domain.com",
    date: "2025-04-22",
    body: "This is a test email body.",
    email: "test@domain.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders email subject, sender, and date", () => {
    render(<EmailListItem email={email} onSelect={mockOnSelect} />);

    expect(screen.getByText("Test Email Subject")).toBeInTheDocument();
    expect(screen.getByText("test@domain.com")).toBeInTheDocument();
    expect(screen.getByText("2025-04-22")).toBeInTheDocument();
  });

  it("renders the avatar image", () => {
    render(<EmailListItem email={email} onSelect={mockOnSelect} />);

    const avatarImage = screen.getByAltText("");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg",
    );
  });

  it("calls onSelect when the email item is clicked", () => {
    render(<EmailListItem email={email} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText("Test Email Subject"));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(email);
  });
});
