jest.mock('axios');
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../component/Signup";
import "@testing-library/jest-dom";

describe("Signup Component Tests", () => {

  test("renders signup fields", () => {
    render(<Signup />);

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("allows input", () => {
    render(<Signup />);

    const username = screen.getByPlaceholderText(/username/i);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);

    fireEvent.change(username, { target: { value: "teacher1" } });
    fireEvent.change(email, { target: { value: "teacher@gmail.com" } });
    fireEvent.change(password, { target: { value: "123456" } });

    expect(username.value).toBe("teacher1");
    expect(email.value).toBe("teacher@gmail.com");
    expect(password.value).toBe("123456");
  });

});
