jest.mock('axios');
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../component/Login";
import "@testing-library/jest-dom";

describe("Login Component Tests", () => {

  test("renders username and password inputs", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("accepts user input", () => {
    render(<Login />);

    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);

    fireEvent.change(username, { target: { value: "pranshu" } });
    fireEvent.change(password, { target: { value: "123456" } });

    expect(username.value).toBe("pranshu");
    expect(password.value).toBe("123456");
  });

});
