import { render, screen, fireEvent } from "@testing-library/react";
import EmailList from "./EmailList";
import { Email } from "../AppTypes";

// Mock IntersectionObserver for this test file
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mocking the EmailListItem component since it's part of the `EmailList`
jest.mock("./EmailListItem", () => ({
  __esModule: true,
  default: ({
    email,
    onSelect,
  }: {
    email: Email;
    onSelect: (email: Email) => void;
  }) => (
    <div data-testid="email-item" onClick={() => onSelect(email)}>
      {email.subject}
    </div>
  ),
}));

describe("EmailList", () => {
  const mockOnSelect = jest.fn();
  const mockLoadMore = jest.fn();

  const emails: Email[] = [
    {
      id: "1",
      subject: "Email 1",
      sender: "Sender 1",
      date: "2025-04-22",
      email: "sender1@example.com",
      body: "Body 1",
      avatar: "",
    },
    {
      id: "2",
      subject: "Email 2",
      sender: "Sender 2",
      date: "2025-04-23",
      email: "sender2@example.com",
      body: "Body 2",
      avatar: "",
    },
  ];

  it("renders emails when provided", () => {
    render(
      <EmailList
        emails={emails}
        onSelect={mockOnSelect}
        hasMore={true}
        loadMore={mockLoadMore}
      />,
    );

    expect(screen.getByText("Email 1")).toBeInTheDocument();
    expect(screen.getByText("Email 2")).toBeInTheDocument();
  });

  it("displays 'Keine Daten' when no emails are provided", () => {
    render(
      <EmailList
        emails={[]}
        onSelect={mockOnSelect}
        hasMore={false}
        loadMore={mockLoadMore}
      />,
    );

    expect(screen.getByText("Keine Daten")).toBeInTheDocument();
  });

  it("renders 'Mehr laden...' when hasMore is true", () => {
    render(
      <EmailList
        emails={emails}
        onSelect={mockOnSelect}
        hasMore={true}
        loadMore={mockLoadMore}
      />,
    );

    expect(screen.getByText("Mehr laden...")).toBeInTheDocument();
  });

  it("does not call loadMore when hasMore is false", () => {
    render(
      <EmailList
        emails={emails}
        onSelect={mockOnSelect}
        hasMore={false}
        loadMore={mockLoadMore}
      />,
    );

    const sentinel = screen.queryByText("Mehr laden...");
    expect(sentinel).not.toBeInTheDocument();
    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  it("triggers onSelect when an email is clicked", () => {
    render(
      <EmailList
        emails={emails}
        onSelect={mockOnSelect}
        hasMore={true}
        loadMore={mockLoadMore}
      />,
    );

    fireEvent.click(screen.getByText("Email 1"));

    expect(mockOnSelect).toHaveBeenCalledWith(emails[0]);
  });
});
