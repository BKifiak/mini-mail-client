import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  let mockSetQuery: jest.Mock;
  let query: string;

  beforeEach(() => {
    mockSetQuery = jest.fn();
    query = ""; // Initialize query with an empty string
  });

  it("renders correctly with initial query", () => {
    render(<SearchBar query={query} setQuery={mockSetQuery} />);

    expect(
      screen.getByPlaceholderText("Suche nach Betreff oder Absender..."),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(query)).toBeInTheDocument();
  });

  it("calls setQuery when typing in the input field", () => {
    render(<SearchBar query={query} setQuery={mockSetQuery} />);

    fireEvent.change(
      screen.getByPlaceholderText("Suche nach Betreff oder Absender..."),
      {
        target: { value: "Test query" },
      },
    );

    expect(mockSetQuery).toHaveBeenCalledTimes(1);
    expect(mockSetQuery).toHaveBeenCalledWith("Test query");
  });

  it("displays the correct placeholder", () => {
    render(<SearchBar query={query} setQuery={mockSetQuery} />);

    expect(
      screen.getByPlaceholderText("Suche nach Betreff oder Absender..."),
    ).toBeInTheDocument();
  });
});
