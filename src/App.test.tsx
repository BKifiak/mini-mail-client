import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { Email } from "./AppTypes";

// Mock components
jest.mock("./components/ErrorBoundary", () => ({
  __esModule: true,
  default: ({
    fallback,
    children,
  }: {
    fallback: React.ReactNode;
    children: React.ReactNode;
  }) => <div>{children}</div>,
}));

jest.mock("./components/EmailListContainer", () => ({
  __esModule: true,
  default: ({ query, pageNumber, onSelect, loadMore }: any) => {
    return (
      <div>
        <div
          data-testid="email"
          onClick={() =>
            onSelect({
              id: "1",
              subject: "Test Email",
              sender: "test@domain.com",
              date: "2025-04-22",
              avatar: "",
              email: "test@domain.com",
              body: "This is a test email",
            })
          }
        >
          Email 1
        </div>
      </div>
    );
  },
}));

jest.mock("./components/EmailDetail", () => ({
  __esModule: true,
  default: ({ email }: { email: Email | null }) => (
    <div data-testid="email-detail-container">
      {email ? email.subject : "Wähle eine E-Mail aus der Liste aus."}
    </div>
  ),
}));

jest.mock("./components/SearchBar", () => ({
  __esModule: true,
  default: ({
    query,
    setQuery,
  }: {
    query: string;
    setQuery: (value: string) => void;
  }) => (
    <input
      data-testid="search-input"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  ),
}));

describe("App", () => {
  it("renders correctly with initial state", () => {
    render(<App />);

    expect(screen.getByTestId("email-detail-container")).toHaveTextContent(
      "Wähle eine E-Mail aus der Liste aus.",
    );
    expect(screen.getByTestId("email")).toHaveTextContent("Email 1");
  });

  it("updates the query value on search input change", () => {
    render(<App />);
    const searchInput = screen.getByTestId("search-input");

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: "new search query" } });

    // Expect the value to change
    expect(searchInput).toHaveValue("new search query");
  });

  it("displays selected email details when an email is clicked", async () => {
    render(<App />);

    // Simulate selecting an email
    fireEvent.click(screen.getByTestId("email"));

    // Expect email detail to update with the selected email subject
    expect(screen.getByTestId("email-detail-container")).toHaveTextContent(
      "Test Email",
    );
  });
});
