import { render, screen } from "@testing-library/react";
import EmailDetail from "./EmailDetail";
import { Email } from "../AppTypes";

describe("EmailDetail", () => {
  it("renders email details when email is provided", () => {
    const email: Email = {
      id: "1",
      avatar: "test avatar",
      subject: "Test Subject",
      sender: "Test Sender",
      date: "2025-04-22",
      email: "test@domain.com",
      body: "This is a test email body.",
    };

    render(<EmailDetail email={email} />);

    expect(screen.getByText("Test Subject")).toBeInTheDocument();
    expect(screen.getByText("Test Sender")).toBeInTheDocument();
    expect(screen.getByText(/test@domain.com/)).toBeInTheDocument();
    expect(screen.getByText("2025-04-22")).toBeInTheDocument();
    expect(screen.getByText("This is a test email body.")).toBeInTheDocument();
  });

  it("renders fallback message when no email is provided", () => {
    render(<EmailDetail email={null} />);

    expect(
      screen.getByText("Wähle eine E-Mail aus der Liste aus."),
    ).toBeInTheDocument();
  });

  it("renders fallback message when email is null", () => {
    render(<EmailDetail email={null} />);

    expect(
      screen.getByText("Wähle eine E-Mail aus der Liste aus."),
    ).toBeInTheDocument();
  });
});
